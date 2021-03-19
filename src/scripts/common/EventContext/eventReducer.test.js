import eventReducer from './eventReducer';

// Initial state
const state = {};

describe('eventReducer', () => {
  test('it errors with an unrecognized action type', async () => {
    expect(() => {
      eventReducer(state, { type: 'SOMETHING' });
    }).toThrowError();
  });
});
