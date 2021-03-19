import getRefreshTime from './index';

describe('getRefreshTime', () => {
  const refreshConfig = [
    { min: 1, max: 1000, time: 30000 },
    { min: 1001, max: 2500, time: 60000 },
    { min: 2501, max: 5000, time: 120000 },
    { min: 5001, max: 10000, time: 300000 },
    { min: 10001, max: Number.MAX_SAFE_INTEGER, time: 600000 },
  ];

  test('it returns 30 seconds for an event with fewer than 1000 players', () => {
    const time = getRefreshTime(20, refreshConfig);

    expect(time).toEqual(30000);
  });

  test('it returns 60 seconds for an event with between 1001 and 2500 players', () => {
    const time = getRefreshTime(2000, refreshConfig);

    expect(time).toEqual(60000);
  });

  test('it returns 2 minutes for an event with between 2501 and 5000 players', () => {
    const time = getRefreshTime(3000, refreshConfig);

    expect(time).toEqual(120000);
  });

  test('it returns 5 minutes for an event with between 5001 and 10000 players', () => {
    const time = getRefreshTime(7000, refreshConfig);

    expect(time).toEqual(300000);
  });

  test('it returns 10 minutes for an event with over 10000 players', () => {
    const time = getRefreshTime(20000, refreshConfig);

    expect(time).toEqual(600000);
  });
});
