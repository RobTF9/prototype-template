/* eslint-disable global-require */
import transposeChallengeList from './transposeChallengeList';

describe('transposeChallengeList', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('it marks a challenge as complete if included in the completed array', () => {
    const { oneGroupOneChallenge } = require('./tranposeChallengeList.fixture');

    const result = transposeChallengeList({
      challengeList: oneGroupOneChallenge,
      completed: [
        {
          challenge_id: '8faacb0c-98e2-11e9-84b6-323835316431',
        },
      ],
    });
    expect(result[0].challenges[0].completed).toBe(true);
  });

  test('it marks a progressive unlock group as unlocked if progression percent of previous group met', () => {
    const {
      twoGroupsTwoChallenges,
    } = require('./tranposeChallengeList.fixture');

    const result = transposeChallengeList({
      challengeList: twoGroupsTwoChallenges,
      completed: [
        {
          challenge_id: '8faacb0c-98e2-11e9-84b6-323835316431',
        },
      ],
    });
    expect(result[1].locked).toBe(false);
  });

  test('it marks a progressive unlock group as unlocked if it has the old unlock data', () => {
    const {
      twoGroupsTwoChallenges,
    } = require('./tranposeChallengeList.fixture');

    const challengeList = twoGroupsTwoChallenges.map(group => {
      if (group.id === '12d74dd0-98e2-11e9-8d3a-353430623636') {
        return {
          ...group,
          unlockData: {
            percentage: 50,
            unlockAt: null,
          },
        };
      }

      return group;
    });

    const result = transposeChallengeList({
      challengeList,
      completed: [{ challenge_id: '8faacb0c-98e2-11e9-84b6-323835316431' }],
    });
    expect(result[1].locked).toBe(false);
  });

  test('it marks a progressive unlock group as unlocked if progression percent of specified groups is met (ANY mode)', () => {
    const {
      twoGroupsTwoChallenges,
    } = require('./tranposeChallengeList.fixture');

    const result = transposeChallengeList({
      challengeList: [
        ...twoGroupsTwoChallenges,
        {
          id: '12345',
          label: 'Group 3',
          locked: true,
          unlock: 'progressive',
          order: 'manual',
          unlockData: {
            percentage: 50,
            groupInclusion: 1,
            groupsToInclude: [
              { id: 'ef0328c0-98e1-11e9-bde6-636437363238', name: 'Group 1' },
              { id: '12d74dd0-98e2-11e9-8d3a-353430623636', name: 'Group 2' },
            ],
          },
          challenges: [{ id: '12345', locked: false }],
        },
      ],
      completed: [{ challenge_id: '8faacb0c-98e2-11e9-84b6-323835316431' }],
    });
    expect(result[2].locked).toBe(false);
  });

  test('it marks a progressive unlock group as unlocked if progression percent of specified groups is met (ALL mode)', () => {
    const {
      twoGroupsTwoChallenges,
    } = require('./tranposeChallengeList.fixture');

    const result = transposeChallengeList({
      challengeList: [
        ...twoGroupsTwoChallenges,
        {
          id: '12345',
          label: 'Group 3',
          locked: true,
          unlock: 'progressive',
          order: 'manual',
          unlockData: {
            percentage: 75,
            groupInclusion: 2,
            groupsToInclude: [
              { id: 'ef0328c0-98e1-11e9-bde6-636437363238', name: 'Group 1' },
              { id: '12d74dd0-98e2-11e9-8d3a-353430623636', name: 'Group 2' },
            ],
          },
          challenges: [{ id: '12345', locked: false }],
        },
      ],
      completed: [
        { challenge_id: '8faacb0c-98e2-11e9-84b6-323835316431' },
        { challenge_id: '407c63f6-98e2-11e9-8b8d-646235336131' },
        { challenge_id: 'dd171576-98e2-11e9-94db-643066363033' },
      ],
    });
    expect(result[2].locked).toBe(false);
  });

  test('it marks a progressive unlock group (manual sequential order) and its first challenge as unlocked if progression percent of specified groups is met (ALL mode)', () => {
    const {
      twoGroupsTwoChallenges,
    } = require('./tranposeChallengeList.fixture');

    const result = transposeChallengeList({
      challengeList: [
        ...twoGroupsTwoChallenges,
        {
          id: '12345',
          label: 'Group 3',
          locked: true,
          unlock: 'progressive',
          order: 'manual sequential',
          unlockData: {
            percentage: 75,
            groupInclusion: 2,
            groupsToInclude: [
              { id: 'ef0328c0-98e1-11e9-bde6-636437363238', name: 'Group 1' },
              { id: '12d74dd0-98e2-11e9-8d3a-353430623636', name: 'Group 2' },
            ],
          },
          challenges: [
            { id: '12345', locked: true },
            { id: '23456', locked: true },
          ],
        },
      ],
      completed: [
        { challenge_id: '8faacb0c-98e2-11e9-84b6-323835316431' },
        { challenge_id: '407c63f6-98e2-11e9-8b8d-646235336131' },
        { challenge_id: 'dd171576-98e2-11e9-94db-643066363033' },
      ],
    });
    expect(result[2].locked).toBe(false);
    expect(result[2].challenges[0].locked).toBe(false);
    expect(result[2].challenges[1].locked).toBe(true);
  });

  test('it marks a timed unlock group and its challenges as unlocked if Date now is past the unlockAt time', () => {
    const { timed2ndGroup } = require('./tranposeChallengeList.fixture');

    const result = transposeChallengeList({
      challengeList: timed2ndGroup,
      completed: [],
    });

    expect(result[1].locked).toBe(false);
    expect(result[1].challenges[0].locked).toBe(false);
  });

  test('it will unlock the next challenge in a manual sequential order group', () => {
    const { manualSequential } = require('./tranposeChallengeList.fixture');

    const result = transposeChallengeList({
      challengeList: manualSequential,
      completed: [
        {
          challenge_id: '8faacb0c-98e2-11e9-84b6-323835316431',
        },
      ],
    });

    expect(result[0].challenges[0].completed).toBe(true);
    expect(result[0].challenges[1].locked).toBe(false);
  });
});
