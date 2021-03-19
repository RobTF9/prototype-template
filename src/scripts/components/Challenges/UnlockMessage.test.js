import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import addSeconds from 'date-fns/addSeconds';
import subSeconds from 'date-fns/subSeconds';
import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';
import addMinutes from 'date-fns/addMinutes';
import UnlockMessage from './UnlockMessage';
import { ChallengesContext } from '../../common/ChallengesContext';

describe('UnlockMessage component', () => {
  const renderUnlockMessage = ({ props, challengesDispatch = () => {} }) =>
    render(
      <ChallengesContext.Provider value={{ challengesDispatch }}>
        <UnlockMessage {...props} />
      </ChallengesContext.Provider>
    );

  const currentDate = new Date('2019-10-01T12:00:00.000Z');
  const realDate = Date;

  // Setup
  beforeEach(() => {
    // Mock new Date() to return date currentDate
    global.Date = class extends Date {
      constructor(...args) {
        if (args.length > 0) {
          // eslint-disable-next-line constructor-super
          return super(...args);
        }

        return currentDate;
      }
    };
  });

  // Cleanup
  afterEach(() => {
    global.Date = realDate;
  });

  test('it returns null if unlocked', async () => {
    const props = {
      unlock: 'unlocked',
      unlockData: {
        percentage: null,
        unlockAt: null,
      },
      previousGroupLabel: '',
    };
    const { container } = renderUnlockMessage({ props });
    expect(container.firstChild).toBeNull();
  });

  test('it returns null if progression not recognised', async () => {
    const props = {
      unlock: 'unknown',
      unlockData: {
        percentage: null,
        unlockAt: null,
      },
      previousGroupLabel: '',
    };
    const { container } = renderUnlockMessage({ props });
    expect(container.firstChild).toBeNull();
  });

  test('it renders a message for unlocked progression with old unlock data', () => {
    const { getByText } = renderUnlockMessage({
      props: {
        unlock: 'progressive',
        unlockData: {
          percentage: 50,
          unlockAt: null,
        },
        previousGroupLabel: 'Group 1',
      },
    });
    expect(
      getByText('This group unlocks when 50% of Group 1 has been completed.')
    ).toBeInTheDocument();
  });

  test('it renders a message for unlocked progression with previous group', () => {
    const { getByText } = renderUnlockMessage({
      props: {
        unlock: 'progressive',
        unlockData: {
          percentage: 50,
          unlockAt: null,
          groupInclusion: 2,
          groupsToInclude: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              name: 'Previous Group',
            },
          ],
        },
        previousGroupLabel: 'Group 1',
      },
    });
    expect(
      getByText('This group unlocks when 50% of Group 1 has been completed.')
    ).toBeInTheDocument();
  });

  test('it renders a message for unlocked progression with 1 group', () => {
    const props = {
      unlock: 'progressive',
      unlockData: {
        percentage: 50,
        unlockAt: null,
        groupInclusion: 2,
        groupsToInclude: [
          {
            id: '12345',
            name: 'Group A',
          },
        ],
      },
    };
    const { getByText } = renderUnlockMessage({ props });
    expect(
      getByText('This group unlocks when 50% of Group A has been completed.')
    ).toBeInTheDocument();
  });

  test('it renders a message for unlocked progression with 2 groups (ANY MODE)', () => {
    const props = {
      unlock: 'progressive',
      unlockData: {
        percentage: 50,
        unlockAt: null,
        groupInclusion: 1,
        groupsToInclude: [
          {
            id: '12345',
            name: 'Group A',
          },
          {
            id: '23456',
            name: 'Group B',
          },
        ],
      },
    };
    const { getByText } = renderUnlockMessage({ props });
    expect(
      getByText(
        'This group unlocks when 50% of any challenges from Group A or Group B have been completed.'
      )
    ).toBeInTheDocument();
  });

  test('it renders a message for unlocked progression with 2 groups (ALL MODE)', () => {
    const props = {
      unlock: 'progressive',
      unlockData: {
        percentage: 50,
        unlockAt: null,
        groupInclusion: 2,
        groupsToInclude: [
          {
            id: '12345',
            name: 'Group A',
          },
          {
            id: '23456',
            name: 'Group B',
          },
        ],
      },
    };
    const { getByText } = renderUnlockMessage({ props });
    expect(
      getByText(
        'This group unlocks when 50% of all challenges from Group A and Group B have been completed.'
      )
    ).toBeInTheDocument();
  });

  test('it renders a message for unlocked progression with 3 groups (ANY MODE)', () => {
    const props = {
      unlock: 'progressive',
      unlockData: {
        percentage: 50,
        unlockAt: null,
        groupInclusion: 1,
        groupsToInclude: [
          {
            id: '12345',
            name: 'Group A',
          },
          {
            id: '23456',
            name: 'Group B',
          },
          {
            id: '34567',
            name: 'Group C',
          },
        ],
      },
    };
    const { getByText } = renderUnlockMessage({ props });
    expect(
      getByText(
        'This group unlocks when 50% of any challenges from Group A, Group B or Group C have been completed.'
      )
    ).toBeInTheDocument();
  });

  test('it renders a message for unlocked progression with 3 groups (ALL MODE)', () => {
    const props = {
      unlock: 'progressive',
      unlockData: {
        percentage: 50,
        unlockAt: null,
        groupInclusion: 2,
        groupsToInclude: [
          {
            id: '12345',
            name: 'Group A',
          },
          {
            id: '23456',
            name: 'Group B',
          },
          {
            id: '34567',
            name: 'Group C',
          },
        ],
      },
    };
    const { getByText } = renderUnlockMessage({ props });
    expect(
      getByText(
        'This group unlocks when 50% of all challenges from Group A, Group B and Group C have been completed.'
      )
    ).toBeInTheDocument();
  });

  test('it renders null and calls the dispatch function to unlock group if date is past', () => {
    const props = {
      unlock: 'timed',
      unlockData: {
        percentage: null,
        unlockAt: subSeconds(new Date(), 30).getTime() / 1000,
      },
      id: '12345',
    };
    const mockedChallengesDispatch = jest.fn();

    const { container } = renderUnlockMessage({
      props,
      challengesDispatch: mockedChallengesDispatch,
    });

    expect(container.firstChild).toBeNull();
    expect(mockedChallengesDispatch).toHaveBeenCalledWith({
      type: 'UNLOCK_GROUP',
      payload: '12345',
    });
  });

  test("it renders a duration message 'less than a minute' with timed progression 30 seconds from now", () => {
    const props = {
      unlock: 'timed',
      unlockData: {
        percentage: null,
        unlockAt: addSeconds(new Date(), 30).getTime() / 1000,
      },
    };
    const { getByText } = renderUnlockMessage({ props });

    expect(getByText('Unlocks in less than a minute.')).toBeInTheDocument();
  });

  test('it renders a duration message with timed progression 1 day, 1 hour and 1 minute in future', () => {
    const unlockAt =
      addDays(addHours(addMinutes(new Date(), 1), 1), 1).getTime() / 1000;

    const props = {
      unlock: 'timed',
      unlockData: {
        percentage: null,
        unlockAt,
      },
    };
    const { getByText } = renderUnlockMessage({ props });

    expect(
      getByText('Unlocks in 1 day, 1 hour, 1 minute.')
    ).toBeInTheDocument();
  });

  test('it renders a duration message with timed progression 2 days in future', () => {
    const unlockAt = addDays(currentDate, 2).getTime() / 1000;

    const props = {
      unlock: 'timed',
      unlockData: {
        percentage: null,
        unlockAt,
      },
    };
    const { getByText } = renderUnlockMessage({ props });

    expect(getByText('Unlocks in 2 days.')).toBeInTheDocument();
  });

  test('it renders a duration message with timed progression 2 hours in future', () => {
    const unlockAt = addHours(currentDate, 2).getTime() / 1000;

    const props = {
      unlock: 'timed',
      unlockData: {
        percentage: null,
        unlockAt,
      },
    };
    const { getByText } = renderUnlockMessage({ props });

    expect(getByText('Unlocks in 2 hours.')).toBeInTheDocument();
  });

  test('it renders a duration message with timed progression 2 minutes in future', () => {
    const unlockAt = addMinutes(currentDate, 2).getTime() / 1000;

    const props = {
      unlock: 'timed',
      unlockData: {
        percentage: null,
        unlockAt,
      },
    };
    const { getByText } = renderUnlockMessage({ props });

    expect(getByText('Unlocks in 2 minutes.')).toBeInTheDocument();
  });
});
