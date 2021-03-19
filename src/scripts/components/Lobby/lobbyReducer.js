export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'TEAMS_LOADING':
      return {
        ...state,
        teams: { ...state.teams, loading: true, error: false },
      };

    case 'TEAMS_ERROR':
      return {
        ...state,
        teams: { ...state.teams, error: true, loading: false },
      };

    case 'TEAMS_FETCH_SUCCESS':
      return {
        ...state,
        teams: {
          data: payload.teams,
          pagination: payload.pagination,
          loading: false,
          error: false,
        },
      };

    case 'PLAYERS_LOADING':
      return {
        ...state,
        players: { ...state.players, loading: true, error: false },
      };

    case 'PLAYERS_ERROR':
      return {
        ...state,
        players: { ...state.players, error: true, loading: false },
      };

    case 'PLAYERS_FETCH_SUCCESS':
      return {
        ...state,
        players: {
          data: payload.players,
          pagination: payload.pagination,
          loading: false,
          error: false,
        },
      };

    default:
      throw new Error();
  }
};
