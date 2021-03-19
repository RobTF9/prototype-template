import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Leaderboard from './index';
import { LeaderboardProvider } from '../../common/LeaderboardContext';
import { EventProvider } from '../../common/EventContext';
import data from '../../../../system/data/leaders.json';

const defaultProps = {
  size: 'mini',
  bigScreen: false,
};

describe('Leaderboard component', () => {
  const renderLeaderboard = (eventOverrides, leaderboardOverrides, props) =>
    render(
      <EventProvider
        defaultOverrides={eventOverrides}
        hashedUserId="currentUser"
      >
        <LeaderboardProvider defaultOverrides={leaderboardOverrides}>
          <Leaderboard {...props} />
        </LeaderboardProvider>
      </EventProvider>
    );

  test('it renders the leaderboard in the initial loading state', async () => {
    renderLeaderboard(
      { id: '12345', isTeamEvent: false, isScored: true },
      {
        data: [],
        loading: true,
        error: false,
      },
      defaultProps
    );

    const loadingEls = document.querySelector('.loading-wrapper');
    expect(loadingEls).toBeInTheDocument(); // 8 loading Leaders (each with 4 skeleton divs)
  });

  test('it renders a not scored message is isScored is false', async () => {
    const { getByText } = renderLeaderboard(
      { id: '12345', isTeamEvent: false, isScored: false },
      {
        data: [],
        loading: false,
        error: false,
      },
      { ...defaultProps, isScored: false }
    );

    expect(getByText('This event is not scored')).toBeInTheDocument();
  });

  test('it renders an error message if there has been an error and there is no data to show', async () => {
    const { getByText } = renderLeaderboard(
      { id: '12345', isTeamEvent: false, isScored: true },
      {
        data: null,
        loading: false,
        error: true,
      },
      defaultProps
    );

    expect(
      getByText(
        'There was an error fetching the leaderboard. Please try again.'
      )
    ).toBeInTheDocument();
  });

  test('it renders the leaderboard with data', async () => {
    const { getByText } = renderLeaderboard(
      { id: '12345', isTeamEvent: false, isScored: true },
      {
        data,
        loading: false,
        error: false,
      },
      defaultProps
    );

    expect(getByText('Jane Jones')).toBeInTheDocument();
  });

  test("it renders the no players yet message if it's an empty player event", async () => {
    const { getByText } = renderLeaderboard(
      { id: '12345', isTeamEvent: false, isScored: true },
      {
        data: [],
        loading: false,
        error: false,
      },
      defaultProps
    );

    expect(getByText('No players yet')).toBeInTheDocument();
  });

  test("it renders the no teams yet message if it's an empty team event", async () => {
    const { getByText } = renderLeaderboard(
      { id: '12345', isTeamEvent: true, isScored: true },
      {
        data: [],
        loading: false,
        error: false,
      },
      defaultProps
    );

    expect(getByText('No teams yet')).toBeInTheDocument();
  });
});
