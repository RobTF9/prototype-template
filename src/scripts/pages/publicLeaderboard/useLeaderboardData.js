import { useContext, useEffect } from 'react';
import { EventContext } from '../../common/EventContext';
import { LeaderboardContext } from '../../common/LeaderboardContext';
import { eventStatus } from '../../common/enums';

export default ({ refreshTime, id, leaderboardCode }) => {
  const {
    event: { status },
  } = useContext(EventContext);

  const { leaderboardDispatch } = useContext(LeaderboardContext);

  useEffect(() => {
    let timeout = null;

    const getLeaderboard = async () => {
      try {
        const response = await fetch(
          `/api/event/${id}/leaderboard/${leaderboardCode}`
        );
        leaderboardDispatch({
          type: 'FETCH_SUCCESS',
          payload: {
            data: await response.json(),
          },
        });
      } catch (error) {
        leaderboardDispatch({ type: 'FETCH_FAILURE', payload: error });
      }

      if (status !== eventStatus.FINISHED) {
        timeout = setTimeout(getLeaderboard, refreshTime);
      }
    };

    if (refreshTime) {
      getLeaderboard();
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [id, leaderboardCode, leaderboardDispatch, refreshTime, status]);
};
