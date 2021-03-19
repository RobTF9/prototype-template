import leaderboardReducer from './leaderboardReducer';

// Initial state
const state = {
  loading: true,
  error: false,
  data: [],
  refresh: false,
};

describe('eventReducer', () => {
  test('it errors with an unrecognized action type', () => {
    expect(() => {
      leaderboardReducer(state, { type: 'SOMETHING' });
    }).toThrowError();
  });

  test('it sets loading to false, error to false and data to the payload when given the FETCH_SUCCESS action type', () => {
    const result = leaderboardReducer(state, {
      type: 'FETCH_SUCCESS',
      payload: {
        data: [
          {
            id: '12345',
            name: 'Jane Jones',
            position: 1,
            percent: 100,
            points: 10000,
          },
        ],
        hashedUserId: '',
        hashedTeamId: '',
      },
    });

    expect(result).toEqual({
      loading: false,
      error: false,
      data: [
        {
          id: '12345',
          name: 'Jane Jones',
          position: 1,
          percent: 100,
          points: 10000,
        },
      ],
      refresh: false,
    });
  });

  test('it sets loading to false and error to true when given the FETCH_FAILURE action type', () => {
    const result = leaderboardReducer(state, {
      type: 'FETCH_FAILURE',
    });

    expect(result).toEqual({
      loading: false,
      error: true,
      data: [],
      refresh: false,
    });
  });

  test('it sets refresh to the opposite when given REFRESH_LEADERBOARD action type', () => {
    const result = leaderboardReducer(state, {
      type: 'REFRESH_LEADERBOARD',
    });

    expect(result).toEqual({
      loading: true,
      error: false,
      data: [],
      refresh: true,
    });
  });
});
