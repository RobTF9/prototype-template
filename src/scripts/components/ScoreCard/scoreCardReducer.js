export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'UPDATE_CHALLENGES':
      return {
        ...state,
        challenges: payload,
      };
    case 'UPDATE_BADGES':
      if (state.badges >= payload) {
        return state;
      }

      return {
        ...state,
        badges: payload,
      };
    default:
      throw new Error();
  }
};
