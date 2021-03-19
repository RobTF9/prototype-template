import randomiseChallenges from './randomiseChallenges';

describe('randomiseChallenges', () => {
  test('it will return the original challenge order if the group is not random', () => {
    const challengeGroups = [
      {
        order: 'manual',
        challenges: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
    ];

    const result = randomiseChallenges({ challengeGroups });

    expect(result).toEqual(challengeGroups);
  });

  test('it will return the same randomised challenge order for a player twice', () => {
    const challengeGroups = [
      {
        order: 'random',
        challenges: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
    ];

    const result1 = randomiseChallenges({
      challengeGroups,
      isTeamEvent: false,
      hashedUserId:
        'ZmVlYzA3MDZlYzI0MmFlN2U1MTYxYTFiMDFjYTdlOTg1ZDE0NzQ3YTI3MjkxNTA1YzAwZjAwY2I0MzdlMWQ1NjQ0ZmMwMmRiMjE4ZmJjMjU2MjNiOWFhMDA4ZTYzYzk2',
    });

    expect(result1).toEqual([
      {
        order: 'random',
        challenges: [{ id: 2 }, { id: 4 }, { id: 3 }, { id: 1 }],
      },
    ]);

    const result2 = randomiseChallenges({
      challengeGroups,
      isTeamEvent: false,
      hashedUserId:
        'ZmVlYzA3MDZlYzI0MmFlN2U1MTYxYTFiMDFjYTdlOTg1ZDE0NzQ3YTI3MjkxNTA1YzAwZjAwY2I0MzdlMWQ1NjQ0ZmMwMmRiMjE4ZmJjMjU2MjNiOWFhMDA4ZTYzYzk2',
    });

    expect(result1).toEqual(result2);
  });

  test('it will return the same randomised challenge order for two players on the same team', () => {
    const challengeGroups = [
      {
        order: 'random',
        challenges: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
    ];

    const result1 = randomiseChallenges({
      challengeGroups,
      isTeamEvent: true,
      hashedTeamId:
        'NDhmMTE2NzNiZmZiNjY0Y2M0ZTY2Mzg3MWVhN2FmZWY3MDRiYmU3ZWExZjIwMGY0YzAxNTEwNWFkNDExNDkzZGJjOTU0ZmIwZGZmODM4NGJhNjgwNjYwZTllZmFlZGUz',
      hashedUserId:
        'ZmVlYzA3MDZlYzI0MmFlN2U1MTYxYTFiMDFjYTdlOTg1ZDE0NzQ3YTI3MjkxNTA1YzAwZjAwY2I0MzdlMWQ1NjQ0ZmMwMmRiMjE4ZmJjMjU2MjNiOWFhMDA4ZTYzYzk2',
    });

    expect(result1).toEqual([
      {
        order: 'random',
        challenges: [{ id: 4 }, { id: 3 }, { id: 2 }, { id: 1 }],
      },
    ]);

    const result2 = randomiseChallenges({
      challengeGroups,
      isTeamEvent: true,
      hashedTeamId:
        'NDhmMTE2NzNiZmZiNjY0Y2M0ZTY2Mzg3MWVhN2FmZWY3MDRiYmU3ZWExZjIwMGY0YzAxNTEwNWFkNDExNDkzZGJjOTU0ZmIwZGZmODM4NGJhNjgwNjYwZTllZmFlZGUz',
      hashedUserId:
        'YTZiNzJlNDhjYzJjNjM2ZTBmZmJkNGRiOWUxNDRmZjMxMjY3ZGRmYjQ5M2EzM2NmNWFhM2I5NjhhMzViZGFhMjFkNjc2ZGUzYjY2NWU2ZTU3OTRlMjgwOTk5ODIyOTg5',
    });

    expect(result1).toEqual(result2);
  });
});
