import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Update from './Update';
import { EventProvider } from '../common/EventContext';

describe('Update component', () => {
  test('it renders a badgeAwarded update for current user', async () => {
    const props = {
      update: {
        type: 'badgeAwarded',
        user: {
          id: 'currentUser',
        },
      },
    };
    const { container } = render(
      <EventProvider {...{ hashedUserId: 'currentUser' }}>
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'You were awarded a badge – good job!'
    );
  });

  test('it renders a badgeAwarded update for current user with badge information', async () => {
    const props = {
      update: {
        type: 'badgeAwarded',
        badge: {
          name: 'First Foray',
        },
        user: {
          id: 'currentUser',
        },
      },
    };

    const { container } = render(
      <EventProvider {...{ hashedUserId: 'currentUser' }}>
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'You were awarded the First Foray badge – good job!'
    );
  });

  test('it renders a badgeAwarded update for teammate', async () => {
    const props = {
      update: {
        type: 'badgeAwarded',
        user: {
          id: '12345',
          displayName: 'Foo',
        },
        team: {
          id: 'currentTeam',
          name: 'My Team',
        },
      },
    };

    const { container } = render(
      <EventProvider {...{ hashedTeamId: 'currentTeam' }}>
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'Your teammate Foo was awarded a badge'
    );
  });

  test('it renders a badgeAwarded update for teammate with badge info', async () => {
    const props = {
      update: {
        type: 'badgeAwarded',
        user: {
          id: '12345',
          displayName: 'Foo',
        },
        badge: {
          name: 'First Foray',
        },
        team: {
          id: 'currentTeam',
          name: 'My Team',
        },
      },
    };

    const { container } = render(
      <EventProvider {...{ hashedTeamId: 'currentTeam' }}>
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'Your teammate Foo was awarded the First Foray badge'
    );
  });

  test('it renders a challengeCompleted update for current user', async () => {
    const props = {
      update: {
        type: 'challengeCompleted',
        user: {
          id: 'currentUser',
          displayName: 'Foo',
        },
      },
    };

    const { container } = render(
      <EventProvider {...{ hashedUserId: 'currentUser' }}>
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'You completed a challenge – well done!'
    );
  });

  test('it renders a challengeCompleted update for current user with challenge info', async () => {
    const props = {
      update: {
        type: 'challengeCompleted',
        challenge: {
          shortTitle: 'A1',
        },
        user: {
          id: 'currentUser',
          displayName: 'Foo',
        },
      },
    };

    const { container } = render(
      <EventProvider {...{ hashedUserId: 'currentUser' }}>
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'You completed the challenge A1 – well done!'
    );
  });

  test('it renders a challengeCompleted update for teammate', async () => {
    const props = {
      update: {
        type: 'challengeCompleted',
        user: {
          id: '12345',
          displayName: 'Foo',
        },
        team: {
          id: 'currentTeam',
          name: 'My Team',
        },
      },
    };

    const { container } = render(
      <EventProvider {...{ hashedTeamId: 'currentTeam' }}>
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'Your teammate Foo completed a challenge – go team!'
    );
  });

  test('it renders a challengeCompleted update for teammate with challenge info', async () => {
    const props = {
      update: {
        type: 'challengeCompleted',
        user: {
          id: '12345',
          displayName: 'Foo',
        },
        challenge: {
          shortTitle: 'A1',
        },
        team: {
          id: 'currentTeam',
          name: 'My Team',
        },
      },
    };

    const { container } = render(
      <EventProvider {...{ hashedTeamId: 'currentTeam' }}>
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'Your teammate Foo completed the challenge A1 – go team!'
    );
  });

  test('it renders a challengeCompleted update for an individual opponent in knockout mode', async () => {
    const props = {
      update: {
        type: 'challengeCompleted',
        user: {
          id: '12345',
          displayName: 'Bar',
        },
        challenge: {
          shortTitle: 'A1',
        },
      },
    };

    const { container } = render(
      <EventProvider eventData={{ scoreMode: 4 }} hashedUserId="currentUser">
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual('Bar captured A1');
  });

  test('it renders a challengeCompleted update for an opposing team in knockout mode', async () => {
    const props = {
      update: {
        type: 'challengeCompleted',
        user: {
          id: '12345',
          displayName: 'Bar',
        },
        team: {
          id: '12345',
          name: 'hakors',
        },
        challenge: {
          shortTitle: 'A1',
        },
      },
    };

    const { container } = render(
      <EventProvider eventData={{ scoreMode: 4 }} hashedTeamId="currentTeam">
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual('hakors captured A1');
  });

  test('it renders a challengeCompleted update for a teammate in knockout mode', async () => {
    const props = {
      update: {
        type: 'challengeCompleted',
        user: {
          id: '12345',
          displayName: 'Foo',
        },
        challenge: {
          shortTitle: 'A1',
        },
        team: {
          id: 'currentTeam',
          name: 'My Team',
        },
      },
    };

    const { container } = render(
      <EventProvider
        eventData={{ scoreMode: 4, isTeamEvent: true }}
        hashedTeamId="currentTeam"
      >
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'Your teammate Foo completed the challenge A1 – go team!'
    );
  });

  test('it renders a topOfLeaderboard update for current user', async () => {
    const props = {
      update: {
        type: 'topOfLeaderboard',
        user: {
          id: 'currentUser',
          displayName: 'Foo',
        },
      },
    };

    const { container } = render(
      <EventProvider {...{ hashedUserId: 'currentUser' }}>
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'You went to the top of the leaderboard!'
    );
  });

  test('it renders a topOfLeaderboard update for another user', async () => {
    const props = {
      update: {
        type: 'topOfLeaderboard',
        user: {
          id: '12345',
          displayName: 'Foo',
        },
      },
    };

    const { container } = render(
      <EventProvider {...{ hashedUserId: 'currentUser' }}>
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'Foo went to the top of the leaderboard'
    );
  });

  test('it renders a topOfLeaderboard update for current team', async () => {
    const props = {
      update: {
        type: 'topOfLeaderboard',
        user: {
          displayName: 'Foo',
        },
        team: {
          id: 'currentTeam',
          name: 'Foo',
        },
      },
    };

    const { container } = render(
      <EventProvider
        eventData={{ isTeamEvent: true }}
        hashedTeamId="currentTeam"
      >
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'Your team went to the top of the leaderboard!'
    );
  });

  test('it renders a topOfLeaderboard update for another team', async () => {
    const props = {
      update: {
        type: 'topOfLeaderboard',
        team: {
          id: '12345',
          name: 'H4ckers',
        },
      },
    };

    const { container } = render(
      <EventProvider
        eventData={{ isTeamEvent: true }}
        hashedTeamId="currentTeam"
      >
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'H4ckers went to the top of the leaderboard'
    );
  });

  test('it renders the eventStarted update', async () => {
    const props = {
      update: {
        type: 'eventStarted',
      },
    };

    const { container } = render(
      <EventProvider>
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'The event has started – go, go, go!'
    );
  });

  test('it renders the eventStarted update with event info', async () => {
    const props = {
      update: {
        type: 'eventStarted',
        event: {
          name: 'CyberThreat',
        },
      },
    };

    const { container } = render(
      <EventProvider>
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'The event CyberThreat has started – go, go, go!'
    );
  });

  test('it renders the eventPaused update', async () => {
    const props = {
      update: {
        type: 'eventPaused',
      },
    };

    const { container } = render(
      <EventProvider>
        <Update {...props} />
      </EventProvider>
    );

    expect(container.textContent).toEqual(
      'The event has been paused – it will continue shortly'
    );
  });

  test("it doesn't render anything if if receives an unrecognised update type", async () => {
    const props = {
      update: {
        type: 'unrecognised',
      },
    };

    const { container } = render(
      <EventProvider>
        <Update {...props} />
      </EventProvider>
    );
    expect(container.firstChild).not.toBeInTheDocument();
  });
});
