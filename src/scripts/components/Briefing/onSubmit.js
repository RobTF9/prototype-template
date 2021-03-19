/* eslint-disable camelcase */
import { navigate } from '@reach/router';
import jsonRequest from '../../common/jsonRequest';
import submissionStates from './submissionStates';

const csrf_name = document.querySelector("[name='csrf_name']")
  ? document.querySelector("[name='csrf_name']").value
  : '';
const csrf_value = document.querySelector("[name='csrf_value']")
  ? document.querySelector("[name='csrf_value']").value
  : '';

const onSubmit = ({
  formData,
  setSubmissionState,
  setRateLimit,
  url,
  challengesDispatch,
  leaderboardDispatch,
  challengeId,
  isTeamEvent,
  fallback,
  signalEl,
  data,
  totalChallenges,
  id,
  dispatch,
  hashedUserId,
  hashedTeamId,
}) => {
  // Reset and set loading state
  setSubmissionState(submissionStates.LOADING);
  setRateLimit(0);

  // Try flag
  jsonRequest(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      flag: formData.flag,
      csrf_name,
      csrf_value,
    }),
  })
    .then(r => {
      setRateLimit(parseInt(r.headers.get('Retry-After') || 0));
      return r.json();
    })
    .then(body => {
      if (body === 'correct') {
        setSubmissionState(submissionStates.CORRECT);

        challengesDispatch({
          type: 'CHALLENGE_COMPLETE',
          payload: {
            completed: [
              {
                challenge_id: challengeId,
                user_id: hashedUserId,
                team_id: hashedTeamId,
              },
            ],
          },
        });

        if (isTeamEvent || fallback) {
          leaderboardDispatch({ type: 'REFRESH_LEADERBOARD' });
        } else {
          leaderboardDispatch({
            type: 'UPDATE_PLAYER',
            payload: {
              points: data.points - data.penalty,
              totalChallenges,
              hashedUserId,
            },
          });
        }
        signalEl.current.focus();
        return;
      }

      if (body === 'completed') {
        setSubmissionState(submissionStates.ALREADY_COMPLETE);
        signalEl.current.focus();

        challengesDispatch({
          type: 'CHALLENGE_COMPLETE',
          payload: {
            completed: [
              {
                challenge_id: challengeId,
                user_id: hashedUserId,
                team_id: hashedTeamId,
              },
            ],
          },
        });

        return;
      }

      if (body === 'locked') {
        challengesDispatch({
          type: 'LOCK_CHALLENGE',
          payload: challengeId,
        });
        navigate(`/event/${id}`);
        return;
      }

      if (body === 'paused') {
        navigate(`/event/${id}`);
        dispatch({ type: 'PAUSE_EVENT' });
        return;
      }

      if (body === 'incorrect') {
        setSubmissionState(submissionStates.INCORRECT);
        signalEl.current.focus();
        return;
      }

      if (body === 'rate_limited') {
        setSubmissionState(submissionStates.IDLE);
        signalEl.current.focus();
        return;
      }

      setSubmissionState(submissionStates.ERROR);
      signalEl.current.focus();
    })
    .catch(error => {
      setSubmissionState(submissionStates.ERROR);
      signalEl.current.focus();
    });
};

export default onSubmit;
