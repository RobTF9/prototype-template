import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { EventProvider } from '../../common/EventContext';
import Leader from './Leader';

const defaultProps = {
  id: '12345',
  name: 'James',
  position: 1,
  running_position: 1,
  points: 100,
  percent: 25,
  team: [],
  you: true,
  size: 'mini',
  bigScreen: false,
  lastPosition: 1,
};

describe('Leaderboard component', () => {
  const renderLeader = props =>
    render(
      <EventProvider hashedUserId="currentUser">
        <Leader {...props} />
      </EventProvider>
    );

  test('it renders the Leader component', async () => {
    const { getByText } = renderLeader(defaultProps);

    expect(getByText('1st')).toBeInTheDocument();
    expect(getByText('James')).toBeInTheDocument();
    expect(getByText('25%')).toBeInTheDocument();
    expect(getByText('100pts')).toBeInTheDocument();
  });

  test('it renders the Leader component with a team', async () => {
    const props = {
      ...defaultProps,
      name: 'H4ckers',
      team: [
        { id: '23456', name: 'Foobaa', points: 100 },
        { id: '34567', name: 'Hashbang', points: 100 },
      ],
    };
    const { getByText } = renderLeader(props);

    expect(getByText('H4ckers')).toBeInTheDocument();
    expect(getByText('Foobaa')).toBeInTheDocument();
    expect(getByText('Hashbang')).toBeInTheDocument();
  });

  test('shows the team (by increasing the height) when clicking the team name', async () => {
    const props = {
      ...defaultProps,
      name: 'H4ckers',
      team: [
        { id: '23456', name: 'Foobaa', points: 100 },
        { id: '34567', name: 'Hashbang', points: 100 },
      ],
    };

    const { getByText } = renderLeader(props);

    const button = getByText('H4ckers');
    fireEvent.click(button);

    await wait(() =>
      // Expect height to be mocked 100px + 5px buffer included in Leader.js
      expect(document.querySelector('.team')).toHaveStyle('height: auto')
    );
  });
});
