import { useContext, useEffect, useRef, useCallback } from 'react';
import jsonRequest from '../../common/jsonRequest';
import { WSContext } from '../../common/WSContext';
import { EventContext } from '../../common/EventContext';
import { ChallengesContext } from '../../common/ChallengesContext';
import { eventStatus } from '../../common/enums';

export default ({ jwt, liveEventApiEndpoint, hashedUserId, hashedTeamId }) => {
  const backup = useRef(false);
  const firstRender = useRef(true);

  const { ws, ready } = useContext(WSContext);

  const {
    event: { id, isTeamEvent, status, start },
  } = useContext(EventContext);

  const {
    challenges: { refresh },
    challengesDispatch,
  } = useContext(ChallengesContext);

  const getChallenges = useCallback(
    async isSubscribed => {
      const backupUrl = `/api/event/${id}/challenges`;
      const url = liveEventApiEndpoint
        ? `${liveEventApiEndpoint}/api/event/${id}/challenges?token=${jwt}`
        : backupUrl;

      if (isSubscribed) {
        try {
          const response = await jsonRequest(backup.current ? backupUrl : url);

          if (response.status !== 200 && !backup.current) {
            backup.current = true;
            getChallenges(isSubscribed);
            return;
          }

          const json = await response.json();

          if (!Array.isArray(json)) {
            challengesDispatch({ type: 'FETCH_FAILURE', payload: json });
            return;
          }

          challengesDispatch({
            type: 'FETCH_SUCCESS',
            payload: {
              challengeGroups: json,
              isTeamEvent,
              hashedUserId,
              hashedTeamId,
            },
          });
        } catch (error) {
          if (!backup.current) {
            backup.current = true;
            getChallenges(isSubscribed);
            return;
          }

          challengesDispatch({ type: 'FETCH_FAILURE', payload: error });
        }
      }
    },
    [
      challengesDispatch,
      hashedTeamId,
      hashedUserId,
      id,
      isTeamEvent,
      jwt,
      liveEventApiEndpoint,
    ]
  );

  // First render or refresh
  useEffect(() => {
    let isSubscribed = true;
    const now = new Date();

    if (now > start && status !== eventStatus.READY && firstRender.current) {
      getChallenges(isSubscribed);
      firstRender.current = false;
    }

    return () => {
      isSubscribed = false;
    };
  }, [status, getChallenges, start, refresh]);

  // Websocket updates
  useEffect(() => {
    let isSubscribed = true;

    const handleChallengeMessage = e => {
      const { type, body } = JSON.parse(e.data);

      if (
        type === 'scoring-update' &&
        (body.type === 'challengeCompleted' ||
          body.type === 'challengeAlreadyCompleted')
      ) {
        challengesDispatch({
          type: 'CHALLENGE_COMPLETE',
          payload: {
            completed: [
              {
                challenge_id: body.challenge.id,
                user_id: body.user.id,
                team_id: body.team ? body.team.id : null,
              },
            ],
          },
        });
      }

      if (type === 'challenges-update' && body.type === 'challengesUpdated') {
        getChallenges(isSubscribed);
      }
    };

    if (ready) {
      ws.addEventListener('message', handleChallengeMessage);
    }

    return () => {
      isSubscribed = false;

      if (ws) {
        ws.removeEventListener('message', handleChallengeMessage);
      }
    };
  }, [challengesDispatch, getChallenges, ready, ws]);
};
