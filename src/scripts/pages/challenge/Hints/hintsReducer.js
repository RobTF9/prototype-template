export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_HINT':
      return [
        ...state.map(hint => ({ ...hint, show: false })),
        { title: 'Hint title', content: '', show: true },
      ];
    case 'REMOVE_HINT':
      return state.filter((hint, i) => i !== payload);
    case 'UPDATE_HINT':
      return state.map((hint, i) => {
        if (i !== payload.index) {
          return hint;
        }

        return { ...hint, [payload.name]: payload.value };
      });
    case 'TOGGLE_SHOW_HINT':
      return state.map((hint, i) => {
        if (i !== payload.index) {
          return { ...hint, show: false };
        }

        return { ...hint, show: !hint.show };
      });
    case 'REORDER': {
      const { source, destination } = payload;
      const newHints = Array.from(state);
      const hint = newHints.splice(source.index, 1);
      newHints.splice(destination.index, 0, ...hint);
      return newHints;
    }
    default:
      throw new Error('Unrecognised action type');
  }
};
