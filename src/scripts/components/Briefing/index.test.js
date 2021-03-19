import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Briefing from './index';
import {
  LeaderboardContext,
  LeaderboardProvider,
} from '../../common/LeaderboardContext';
import { EventProvider } from '../../common/EventContext';
import { ChallengesProvider } from '../../common/ChallengesContext';
import { WSProvider } from '../../common/WSContext';

const setLastChallengeVisited = jest.fn();

const defaultProps = {
  dataURL: '/api/event/12345/challenges',
  challengeId: '12345',
  setLastChallengeVisited,
};

const mockData = {
  title: 'Title',
  points: 100,
  details: 'Test Details',
  eventStatus: 2,
  challengeComplete: false,
  challengeLocked: false,
  files: [],
  flagMetadata: [],
  hints: { totalHints: 0, penalty: 0, viewedHints: [] },
  groupIntro: '',
};

const renderBriefing = ({
  wsDefaults,
  eventDefaults,
  challengesDefault,
  leaderboardDefaults,
}) =>
  render(
    <WSProvider defaultOverrides={wsDefaults}>
      <EventProvider defaultOverrides={eventDefaults}>
        <ChallengesProvider defaultOverrides={challengesDefault}>
          <LeaderboardProvider defaultOverrides={leaderboardDefaults}>
            <Briefing {...defaultProps} />
          </LeaderboardProvider>
        </ChallengesProvider>
      </EventProvider>
    </WSProvider>
  );

describe('Briefing component', () => {
  test('it renders and fetches briefing data to display', async () => {
    window.fetch.mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(mockData), status: 200 })
    );
    window.scrollTo = () => {};

    const { getByText } = renderBriefing({
      eventDefaults: { isScored: true, numberOfPlayers: 10 },
      challengesDefault: { total: 10 },
      leaderboardDefaults: { leaderboardDispatch() {} },
    });

    // Wait until we can see 'Briefing', i.e when fetch is done
    await wait(() => getByText('Briefing'));

    expect(fetch.mock.calls.length).toBe(1);
    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Test Details')).toBeInTheDocument();
    expect(getByText('100pts')).toBeInTheDocument();
  });

  test('it renders and shows already complete signal and disabled input and button when challengeComplete is true', async () => {
    window.fetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ...mockData, challengeComplete: true }),
        status: 200,
      })
    );
    window.scrollTo = () => {};

    const { getByText, getByLabelText } = renderBriefing({
      eventDefaults: { isScored: true, numberOfPlayers: 10 },
      challengesDefault: { total: 10 },
      leaderboardDefaults: { leaderboardDispatch() {} },
    });

    // Wait until we can see 'Briefing', i.e when fetch is done
    await wait(() => getByText('Briefing'));

    expect(getByLabelText('Enter flag')).toHaveAttribute('disabled');
    expect(getByText('Try flag')).toHaveAttribute('disabled');
    expect(getByText('Challenge already completed')).toBeInTheDocument();
  });

  test('it shows flag correct signal and dispatched call to refresh leaderboard when correct flag submitted (when falling back to polling)', async () => {
    window.fetch
      .mockImplementationOnce(() =>
        Promise.resolve({ json: () => Promise.resolve(mockData), status: 200 })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          headers: { get() {} },
          json: () => Promise.resolve('correct'),
        })
      );
    window.scrollTo = () => {};
    const dispatchMock = jest.fn();

    const { getByText, getByLabelText } = render(
      <WSProvider defaultOverrides={{ fallback: true }}>
        <EventProvider
          defaultOverrides={{ isScored: true, numberOfPlayers: 10 }}
        >
          <ChallengesProvider defaultOverrides={{ total: 10 }}>
            <LeaderboardContext.Provider
              value={{ leaderboardDispatch: dispatchMock }}
            >
              <Briefing {...defaultProps} />
            </LeaderboardContext.Provider>
          </ChallengesProvider>
        </EventProvider>
      </WSProvider>
    );

    // Wait until we can see 'Briefing', i.e when fetch is done
    await wait(() => getByText('Briefing'));

    expect(fetch.mock.calls.length).toBe(1);

    // fill out and submit the form
    fireEvent.change(getByLabelText('Enter flag'), {
      target: { value: 'correct' },
    });
    fireEvent.click(getByText('Try flag'));

    await wait(() => getByText('Flag correct!'));
    expect(getByLabelText('Enter flag')).toHaveAttribute('disabled');
    expect(getByText('Try flag')).toHaveAttribute('disabled');
    expect(getByText('Flag correct!')).toBeInTheDocument();
    expect(dispatchMock).toHaveBeenCalledWith({ type: 'REFRESH_LEADERBOARD' });
  });

  test('it shows flag incorrect signal and incorrect flag submitted', async () => {
    window.fetch
      .mockImplementationOnce(() =>
        Promise.resolve({ json: () => Promise.resolve(mockData), status: 200 })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          headers: { get() {} },
          json: () => Promise.resolve('incorrect'),
        })
      );
    window.scrollTo = () => {};

    const { getByText, getByLabelText } = renderBriefing({
      eventDefaults: { isScored: true, numberOfPlayers: 10 },
      challengesDefault: { total: 10 },
      leaderboardDefaults: { leaderboardDispatch() {} },
    });

    // Wait until we can see 'Briefing', i.e when fetch is done
    await wait(() => getByText('Briefing'));

    // fill out and submit the form
    fireEvent.change(getByLabelText('Enter flag'), {
      target: { value: 'incorrect' },
    });
    fireEvent.click(getByText('Try flag'));

    await wait(() => getByText('Flag incorrect!'));
    expect(getByText('Flag incorrect!')).toBeInTheDocument();
  });

  test('it shows rate limit message when the rate limit header is returned', async () => {
    window.fetch
      .mockImplementationOnce(() =>
        Promise.resolve({ json: () => Promise.resolve(mockData), status: 200 })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          headers: {
            get() {
              return 300;
            },
          },
          json: () => Promise.resolve('rate_limited'),
        })
      );
    window.scrollTo = () => {};

    const { getByText, getByLabelText } = renderBriefing({
      eventDefaults: { isScored: true, numberOfPlayers: 10 },
      challengesDefault: { total: 10 },
      leaderboardDefaults: { leaderboardDispatch() {} },
    });

    // Wait until we can see 'Briefing', i.e when fetch is done
    await wait(() => getByText('Briefing'));

    // fill out and submit the form
    fireEvent.change(getByLabelText('Enter flag'), {
      target: { value: '1' },
    });
    fireEvent.click(getByText('Try flag'));

    await wait(() =>
      getByText(
        'You have reached the rate limit for submissions. You can try again in 5 minutes'
      )
    );
    expect(
      getByText(
        'You have reached the rate limit for submissions. You can try again in 5 minutes'
      )
    ).toBeInTheDocument();
  });

  test('it shows the error signal when it receives and unexpected response', async () => {
    window.fetch
      .mockImplementationOnce(() =>
        Promise.resolve({ json: () => Promise.resolve(mockData), status: 200 })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          headers: { get() {} },
          json: () => Promise.resolve('unexpected'),
        })
      );
    window.scrollTo = () => {};

    const { getByText, getByLabelText } = renderBriefing({
      eventDefaults: { isScored: true, numberOfPlayers: 10 },
      challengesDefault: { total: 10 },
      leaderboardDefaults: { leaderboardDispatch() {} },
    });

    // Wait until we can see 'Briefing', i.e when fetch is done
    await wait(() => getByText('Briefing'));

    // fill out and submit the form
    fireEvent.change(getByLabelText('Enter flag'), {
      target: { value: '1' },
    });
    fireEvent.click(getByText('Try flag'));

    await wait(() => getByText('An unexpected error occurred'));
    expect(getByText('An unexpected error occurred')).toBeInTheDocument();
  });

  test('it shows the error signal when an error occurs', async () => {
    window.fetch
      .mockImplementationOnce(() =>
        Promise.resolve({ json: () => Promise.resolve(mockData), status: 200 })
      )
      .mockImplementationOnce(() => Promise.reject());
    window.scrollTo = () => {};

    const { getByText, getByLabelText } = renderBriefing({
      eventDefaults: { isScored: true, numberOfPlayers: 10 },
      challengesDefault: { total: 10 },
      leaderboardDefaults: { leaderboardDispatch() {} },
    });

    // Wait until we can see 'Briefing', i.e when fetch is done
    await wait(() => getByText('Briefing'));

    // fill out and submit the form
    fireEvent.change(getByLabelText('Enter flag'), {
      target: { value: '1' },
    });
    fireEvent.click(getByText('Try flag'));

    await wait(() => getByText('An unexpected error occurred'));
    expect(getByText('An unexpected error occurred')).toBeInTheDocument();
  });

  test('it removes HTML tags found in the markdown details', async () => {
    window.fetch.mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            ...mockData,
            details: `
              <a id='exampleLink' href='jaVasCript:document.querySelector("form[action=\\'/sign-out\\'] button").click()'></a>
              <style>
                #exampleLink{display:block;position:fixed;left:0;top:0;width:100vw;height:100vh;z-index:1000}
              </style>
            `,
          }),
        status: 200,
      })
    );
    window.scrollTo = () => {};

    const { getByText } = renderBriefing({
      eventDefaults: { isScored: true, numberOfPlayers: 10 },
      challengesDefault: { total: 10 },
      leaderboardDefaults: { leaderboardDispatch() {} },
    });

    // Wait until we can see 'Briefing', i.e when fetch is done
    await wait(() => getByText('Briefing'));

    // Expect not to find an element with
    expect(document.getElementById('exampleLink')).toBeNull();
  });
});
