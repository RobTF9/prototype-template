import isEqual from 'lodash.isequal';
import { eventStatus } from '../enums';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'UPDATE_NAME':
      if (state.name === payload) {
        return state;
      }

      return {
        ...state,
        name: payload,
      };
    case 'UPDATE_START':
      if (isEqual(state.start, payload)) {
        return state;
      }

      return {
        ...state,
        start: payload,
      };
    case 'UPDATE_END':
      if (isEqual(state.end, payload)) {
        return state;
      }

      return {
        ...state,
        end: payload,
      };

    case 'PAUSE_EVENT':
      return {
        ...state,
        status: eventStatus.PAUSED,
      };

    case 'RESTART_EVENT':
      return {
        ...state,
        status: eventStatus.STARTED,
      };

    case 'FINISH_EVENT':
      return {
        ...state,
        status: eventStatus.FINISHED,
      };

    case 'UPDATE_PLAYER_COUNT':
      if (state.numberOfPlayers === payload) {
        return state;
      }

      return {
        ...state,
        numberOfPlayers: payload,
      };

    case 'UPDATE_TEAM_COUNTS':
      if (
        state.numberOfTeams === payload.teamCount &&
        state.numberOfPlayersNotInTeam === payload.playersNotInTeamCount
      ) {
        return state;
      }

      return {
        ...state,
        numberOfTeams: payload.teamCount,
        numberOfPlayersNotInTeam: payload.playersNotInTeamCount,
      };

    case 'REFRESH_COC_AND_FILES':
      if (
        state.codeOfConduct === payload.codeOfConduct &&
        isEqual(state.files, payload.files)
      ) {
        return state;
      }

      return {
        ...state,
        codeOfConduct: payload.codeOfConduct,
        files: payload.files,
      };

    default:
      throw new Error();
  }
};
