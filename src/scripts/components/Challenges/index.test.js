import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Challenges from './index';
import { EventProvider } from '../../common/EventContext';
import { ChallengesProvider } from '../../common/ChallengesContext';
import { basic, multipleGroups } from './ChallengeList.fixture';

const defaultProps = {
  challengeRefs: { current: [] },
  lastChallengeVisited: '',
};

describe('Challenges component', () => {
  const renderChallenges = ({ eventDefaults, challengesDefault, props }) =>
    render(
      <EventProvider defaultOverrides={eventDefaults}>
        <ChallengesProvider defaultOverrides={challengesDefault}>
          <Challenges {...props} />
        </ChallengesProvider>
      </EventProvider>
    );

  test('it renders and fetches challenge data to display', async () => {
    const { getByText } = renderChallenges({
      eventDefaults: { players: 10 },
      challengesDefault: { data: basic, loading: false },
      props: defaultProps,
    });

    // Wait until we can see 'Group 1', i.e when fetch is done
    await wait(() => getByText('Group 1'));

    expect(getByText('Group 1')).toBeInTheDocument();
    expect(getByText('Challenge 1')).toBeInTheDocument();
  });

  test('it renders the paused signal if paused prop is true', async () => {
    const { getByText } = renderChallenges({
      eventDefaults: { status: 3, players: 10 },
      challengesDefault: { data: basic, loading: false },
      props: defaultProps,
    });

    // Wait until we can see 'Group 1', i.e when fetch is done
    await wait(() => getByText('Group 1'));

    expect(getByText('This event is currently paused')).toBeInTheDocument();
  });

  test('it shows challenges by group/difficulty views correctly', async () => {
    const { getByText } = renderChallenges({
      eventDefaults: { isScored: true, players: 10 },
      challengesDefault: { data: multipleGroups, loading: false },
      props: defaultProps,
    });

    // Wait until we can see 'Group 1', i.e when fetch is done
    await wait(() => getByText('Group 1'));

    // Initially expect to see group names
    expect(getByText('Group 1')).toBeInTheDocument();
    expect(getByText('Group 2')).toBeInTheDocument();

    // Click difficulty view
    fireEvent.click(getByText('Difficulty'));
    // Expect to see Easy, Medium, Hard and Extreme group headings
    expect(getByText('Easy')).toBeInTheDocument();
    expect(getByText('Medium')).toBeInTheDocument();
    expect(getByText('Hard')).toBeInTheDocument();
    expect(getByText('Extreme')).toBeInTheDocument();

    // Click back to group view
    fireEvent.click(getByText('Group'));
    // Expect to see group views again
    expect(getByText('Group 1')).toBeInTheDocument();
    expect(getByText('Group 2')).toBeInTheDocument();
  });

  test('it shows challenges by list/grid views correctly', async () => {
    const { getByText, getByTestId } = renderChallenges({
      eventDefaults: { players: 10 },
      challengesDefault: { data: basic, loading: false },
      props: defaultProps,
    });

    // Wait until we can see 'Group 1', i.e when fetch is done
    await wait(() => getByText('Group 1'));

    // Initially expect to have list class
    expect(getByTestId('group-view')).toHaveClass('group--list');

    // Click grid view
    fireEvent.click(getByText('Grid'));
    // Expect to have list class
    expect(getByTestId('group-view')).toHaveClass('group--grid');

    // Click back to list view
    fireEvent.click(getByText('List'));
    // Expect to have list class
    expect(getByTestId('group-view')).toHaveClass('group--list');
  });
});
