/* global doNotPoll */
import { useContext, useEffect } from 'react';
import { eventStatus } from '../../common/enums';
import jsonRequest from '../../common/jsonRequest';
import { EventContext } from '../../common/EventContext';

export default ({ refreshTime, id, leaderboardCode }) => {
  const stopPolling = typeof doNotPoll !== 'undefined' && doNotPoll;

  const {
    event: { status },
    dispatch,
  } = useContext(EventContext);

  useEffect(() => {
    let isSubscribed = true;
    let timeout = null;

    const getEvent = async () => {
      if (stopPolling) {
        return;
      }

      if (isSubscribed) {
        try {
          const response = await jsonRequest(
            `/api/event/${id}/public/${leaderboardCode}`
          );
          const data = await response.json();

          dispatch({ type: 'UPDATE_NAME', payload: data.name });
          dispatch({
            type: 'UPDATE_START',
            payload: new Date(data.startsAt * 1000),
          });
          dispatch({
            type: 'UPDATE_END',
            payload: new Date(data.endsAt * 1000),
          });

          // Event in progress
          if (data.status === eventStatus.STARTED) {
            // Set in progress
            dispatch({ type: 'RESTART_EVENT' });
          }

          // Event paused
          if (data.status === eventStatus.PAUSED) {
            // Set paused
            dispatch({ type: 'PAUSE_EVENT' });
          }

          // Event finished
          if (data.status === eventStatus.FINISHED) {
            // Set finished to true
            dispatch({ type: 'FINISH_EVENT' });

            // Stop polling
            clearTimeout(timeout);
            return;
          }
        } catch (error) {
          // TODO logo error
        }
      }

      if (status !== eventStatus.FINISHED) {
        timeout = setTimeout(getEvent, refreshTime);
      }
    };

    let initialTimeout = null;
    if (refreshTime) {
      initialTimeout = setTimeout(getEvent, refreshTime);
    }

    return () => {
      isSubscribed = false;

      clearTimeout(initialTimeout);
      clearTimeout(timeout);
    };
  }, [dispatch, id, leaderboardCode, refreshTime, status, stopPolling]);
};
