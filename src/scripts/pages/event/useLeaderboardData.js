import { useContext, useEffect, useRef, useCallback } from 'react';
import jsonRequest from '../../common/jsonRequest';
import { WSContext } from '../../common/WSContext';
import { EventContext } from '../../common/EventContext';
import { LeaderboardContext } from '../../common/LeaderboardContext';
import getRefreshTime from '../../common/getRefreshTime';
import slowPolling from '../../common/slowPolling';

export default ({ hashedUserId, hashedTeamId }) => {
  const t1 = useRef(0);
  const t2 = useRef(0);
  const { ws, ready, fallback } = useContext(WSContext);

  const {
    event: { id, numberOfPlayers, isTeamEvent, end },
  } = useContext(EventContext);

  const {
    leaderboard: { refresh, finalRefresh },
    leaderboardDispatch,
  } = useContext(LeaderboardContext);

  const refreshConfig = useRef([
    { min: 1, max: 1000, time: 30000 },
    { min: 1001, max: 2500, time: 60000 },
    { min: 2501, max: 5000, time: 120000 },
    { min: 5001, max: 10000, time: 300000 },
    { min: 10001, max: Number.MAX_SAFE_INTEGER, time: 600000 },
  ]);
  const refreshTime = useRef(
    getRefreshTime(numberOfPlayers, refreshConfig.current)
  );

  const getLeaderboard = useCallback(
    async (final = false) => {
      try {
        t1.current = performance.now();
        const response = await jsonRequest(`/api/event/${id}/leaders`);
        const data = await response.json();
        t2.current = performance.now();
        leaderboardDispatch({
          type: 'FETCH_SUCCESS',
          payload: {
            data,
            hashedUserId,
            hashedTeamId,
          },
        });
        if (final) {
          leaderboardDispatch({ type: 'FINAL_REFRESH_DONE' });
        }
      } catch (error) {
        leaderboardDispatch({ type: 'FETCH_FAILURE', payload: error });
      }
    },
    [hashedTeamId, hashedUserId, id, leaderboardDispatch]
  );

  // First render or refresh
  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard, refresh]);

  // Final refresh
  useEffect(() => {
    if (finalRefresh === 'start') {
      getLeaderboard(true);
    }
  }, [getLeaderboard, finalRefresh]);

  // Websocket updates
  useEffect(() => {
    const handleLeaderboardMessage = e => {
      const { type, body } = JSON.parse(e.data);

      // Check for position update
      if (type === 'position-update') {
        leaderboardDispatch({
          type: 'UPDATE_PLAYER_POSITION',
          payload: body.position,
        });
      }

      if (type === 'leaderboard-update') {
        leaderboardDispatch({
          type: 'WEBSOCKET_UPDATE',
          payload: {
            data: body.leaders,
            hashedUserId,
          },
        });
      }
    };

    if (ready && !isTeamEvent) {
      ws.addEventListener('message', handleLeaderboardMessage);
    }
    return () => {
      if (ws) {
        ws.removeEventListener('message', handleLeaderboardMessage);
      }
    };
  }, [hashedUserId, isTeamEvent, leaderboardDispatch, ready, ws]);

  // Polling updates
  useEffect(() => {
    const now = new Date();
    const finished = end < now;
    let timeout = null;

    const poll = async () => {
      await getLeaderboard();

      // If it took longer than a second, slow polling
      if (t2.current - t1.current > 1000) {
        refreshTime.current = slowPolling(
          refreshConfig.current,
          refreshTime.current
        );
      }

      if (refreshTime.current) {
        timeout = setTimeout(poll, refreshTime.current);
      }
    };

    if ((isTeamEvent || fallback) && !finished) {
      timeout = setTimeout(poll, refreshTime.current);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [end, fallback, getLeaderboard, isTeamEvent]);
};
