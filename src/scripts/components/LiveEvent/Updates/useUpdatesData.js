import { useState, useCallback, useEffect, useContext, useRef } from 'react';
import format from 'date-fns-tz/format';
import jsonRequest from '../../../common/jsonRequest';
import { WSContext } from '../../../common/WSContext';
import { EventContext } from '../../../common/EventContext';
import { ChallengesContext } from '../../../common/ChallengesContext';

export default () => {
  const REFRESH_TIME = 10000;
  const MAX_UPDATES = 20;
  const [updates, setUpdates] = useState([]);
  const firstRender = useRef(true);

  const displayUpdateTypes = useRef([
    'badgeAwarded',
    'challengeCompleted',
    'topOfLeaderboard',
    'eventStarted',
    'eventPaused',
  ]);

  const {
    event: { id, name, end },
  } = useContext(EventContext);

  const { ws, ready, fallback } = useContext(WSContext);
  const { challengesDispatch } = useContext(ChallengesContext);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleUpdate = useCallback(async newUpdates => {
    for (let i = 0; i < newUpdates.length; i += 1) {
      setUpdates(existingUpdates =>
        [newUpdates[i], ...existingUpdates].slice(0, MAX_UPDATES)
      );
      await sleep(REFRESH_TIME / newUpdates.length);
    }
  }, []);

  // First render Effect
  useEffect(() => {
    if (firstRender.current) {
      const getInitialUpdates = async (url = `/api/event/${id}/updates`) => {
        const response = await jsonRequest(url);
        const data = await response.json();

        setUpdates(data.updates.reverse().slice(0, MAX_UPDATES));
        firstRender.current = false;
      };

      getInitialUpdates();
    }
  }, [id, name]);

  useEffect(() => {
    const handleUpdatesMessage = e => {
      const { type, body } = JSON.parse(e.data);
      if (
        (type === 'event-update' || type === 'scoring-update') &&
        displayUpdateTypes.current.includes(body.type)
      ) {
        handleUpdate([body]);
      }
    };

    if (ready) {
      ws.addEventListener('message', handleUpdatesMessage);
    }

    return () => {
      if (ws) {
        ws.removeEventListener('message', handleUpdatesMessage);
      }
    };
  }, [handleUpdate, ready, ws]);

  // Polling fallback effect
  useEffect(() => {
    let now = new Date();
    let finished = end < now;
    let timeout = null;

    const getUpdates = async url => {
      let nextUrl;

      try {
        const response = await jsonRequest(url);
        const data = await response.json();
        nextUrl = data.links._next;

        const challengeCompletions = data.updates.filter(
          update =>
            update.type === 'challengeCompleted' ||
            update.type === 'challengeAlreadyCompleted'
        );

        if (challengeCompletions.length) {
          const payload = {
            completed: challengeCompletions.map(update => ({
              challenge_id: update.challenge.id,
              user_id: update.user ? update.user.id : null,
              team_id: update.team ? update.team.id : null,
            })),
          };

          challengesDispatch({
            type: 'CHALLENGE_COMPLETE',
            payload,
          });
        }

        const displayUpdates = data.updates.filter(update =>
          displayUpdateTypes.current.includes(update.type)
        );

        handleUpdate(displayUpdates);
      } catch (error) {
        // Try original URL again
        nextUrl = url;
      }

      // Update finished variable before checking if we should keep polling
      now = new Date();
      finished = end < now;

      if (!finished) {
        timeout = setTimeout(getUpdates.bind(this, nextUrl), REFRESH_TIME);
      }
    };

    if (fallback && !finished) {
      getUpdates(
        encodeURI(
          `/api/event/${id}/updates?since=${format(
            Date.now(),
            'yyyy-MM-dd HH:mm:ss',
            { timeZone: 'UTC' }
          )}`
        )
      );
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [challengesDispatch, end, fallback, handleUpdate, id, ws]);

  return { updates, firstRender };
};
