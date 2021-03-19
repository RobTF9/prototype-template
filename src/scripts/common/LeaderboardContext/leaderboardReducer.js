export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'FETCH_SUCCESS': {
      const player = payload.data.find(
        leader => leader.id_hash === payload.hashedUserId
      );

      const team = payload.data.find(
        leader => leader.team_id_hash === payload.hashedTeamId
      );

      return {
        ...state,
        loading: false,
        error: false,
        data: payload.data,
        player: player
          ? {
              name: player.name,
              id: player.id,
              points: player.points,
              id_hash: player.id_hash,
              percent: player.percent,
              position: player.running_position,
            }
          : state.player,
        team: team
          ? {
              name: team.name,
              points: team.points,
              percent: team.percent,
              position: team.running_position,
            }
          : state.team,
      };
    }
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'REFRESH_LEADERBOARD':
      return {
        ...state,
        refresh: !state.refresh,
      };

    case 'FINAL_REFRESH_DONE':
      return {
        ...state,
        finalRefresh: 'done',
      };

    case 'FINAL_REFRESH_START':
      return {
        ...state,
        finalRefresh: 'start',
      };

    case 'WEBSOCKET_UPDATE': {
      let newData = [];
      let newPlayer = {};

      // Check if player is in current top 10
      const playerInCurrentTop10 = state.data.find(
        leader => leader.id_hash === payload.hashedUserId
      );

      // Check if player is in the new top 10
      const playerInNewTop10 = payload.data.find(
        leader => leader.id_hash === payload.hashedUserId
      );

      if (playerInCurrentTop10 && !playerInNewTop10) {
        newData = [...payload.data, state.player];
      } else {
        newData = payload.data;
      }

      if (playerInNewTop10) {
        newPlayer = playerInNewTop10;
      } else {
        newPlayer = { ...state.player, position: null };
      }

      return {
        ...state,
        data: newData,
        player: newPlayer,
      };
    }
    case 'UPDATE_PLAYER': {
      const { points, totalChallenges, hashedUserId } = payload;
      const challengesComplete = Math.round(
        (totalChallenges * state.player.percent) / 100
      );
      const newPercent = Math.round(
        ((challengesComplete + 1) / totalChallenges) * 100
      );

      const newData = state.data;
      const newPlayer = {
        ...state.player,
        points: state.player.points + points,
        percent: newPercent,
      };

      // Find and update player
      const index = newData.findIndex(
        player => player.id_hash === hashedUserId
      );
      newData[index] = {
        ...newData[index],
        points: newPlayer.points,
        percent: newPlayer.percent,
      };

      return {
        ...state,
        data: newData,
        player: newPlayer,
      };
    }

    case 'UPDATE_PLAYER_POSITION': {
      return {
        ...state,
        player: {
          ...state.player,
          position: payload,
        },
      };
    }

    default:
      throw new Error();
  }
};
