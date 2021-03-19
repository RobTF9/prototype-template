/* global doNotPoll */
import { useContext, useEffect, useCallback } from 'react';
import { navigate } from '@reach/router';
import { eventStatus } from '../../common/enums';
import jsonRequest from '../../common/jsonRequest';
import { EventContext } from '../../common/EventContext';
import { WSContext } from '../../common/WSContext';

const getRandomIntInclusive = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const returnToChallengeList = id => {
  if (!window.location.href.match(/\/event\/[^/]*$/)) {
    navigate(`/event/${id}`);
  }
};

export default () => {
  const END_GROUP_SIZE = 20;
  const EVENT_REFRESH = 30000;
  const stopPolling = typeof doNotPoll !== 'undefined' && doNotPoll;

  const {
    event: { id, numberOfPlayers, combinedEventPages },
    dispatch,
  } = useContext(EventContext);
  const { ws, ready, fallback } = useContext(WSContext);

  const pauseEvent = useCallback(() => {
    // Go to challenges page
    returnToChallengeList(id);

    // Set paused
    dispatch({ type: 'PAUSE_EVENT' });
  }, [dispatch, id]);

  const finishEvent = useCallback(() => {
    // Go to challenges page
    returnToChallengeList(id);

    // Set live to false
    dispatch({ type: 'FINISH_EVENT' });

    // Reload page after randomised time to get finished event page
    if (!combinedEventPages) {
      const rand = getRandomIntInclusive(1, numberOfPlayers);
      const secondsToWait = Math.ceil(rand / END_GROUP_SIZE);
      setTimeout(() => {
        window.location.reload(true);
      }, secondsToWait * 1000);
    }
  }, [combinedEventPages, dispatch, id, numberOfPlayers]);

  // Websockets
  useEffect(() => {
    const handleEventMessage = e => {
      const { type, body } = JSON.parse(e.data);

      if (type === 'event-update') {
        switch (body.type) {
          case 'eventPaused':
            pauseEvent();
            break;

          case 'eventStarted':
            dispatch({ type: 'RESTART_EVENT' });
            break;

          case 'eventFinished':
            finishEvent();
            break;

          case 'eventNameChanged':
            dispatch({ type: 'UPDATE_NAME', payload: body.event.name });
            break;

          case 'eventTimesChanged':
            dispatch({
              type: 'UPDATE_START',
              payload: new Date(body.event.startsAt * 1000),
            });
            dispatch({
              type: 'UPDATE_END',
              payload: new Date(body.event.endsAt * 1000),
            });
            break;

          case 'eventPlayerCountChanged':
            dispatch({
              type: 'UPDATE_PLAYER_COUNT',
              payload: body.event.playerCount,
            });
            break;

          case 'eventPlayersNotInTeamCountChanged':
            dispatch({
              type: 'UPDATE_TEAM_COUNTS',
              payload: { ...body.event },
            });
            break;

          default:
            break;
        }
      }
    };

    if (ready) {
      ws.addEventListener('message', handleEventMessage);
    }

    return () => {
      if (ws) {
        ws.removeEventListener('message', handleEventMessage);
      }
    };
  }, [dispatch, finishEvent, pauseEvent, ready, ws]);

  // Polling
  useEffect(() => {
    let isSubscribed = true;
    let timeout = null;

    const getEvent = async () => {
      if (stopPolling) {
        return;
      }

      if (isSubscribed) {
        try {
          const response = await jsonRequest(`/api/event/${id}`);
          const data = await response.json();

          dispatch({
            type: 'UPDATE_PLAYER_COUNT',
            payload: data.players,
          });
          dispatch({
            type: 'UPDATE_TEAM_COUNTS',
            payload: {
              teamCount: data.numberOfTeams,
              playersNotInTeamCount: data.numberOfPlayersNotInTeam,
            },
          });
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
            pauseEvent();
          }

          // Event finished
          if (data.status === eventStatus.FINISHED) {
            finishEvent();
            // Don't set timeout again
            return;
          }
        } catch (error) {
          // TODO log error
        }
      }

      timeout = setTimeout(getEvent, EVENT_REFRESH);
    };

    if (fallback) {
      timeout = setTimeout(getEvent, EVENT_REFRESH);
    }

    return () => {
      isSubscribed = false;

      clearTimeout(timeout);
    };
  }, [dispatch, fallback, finishEvent, id, pauseEvent, stopPolling]);
};
