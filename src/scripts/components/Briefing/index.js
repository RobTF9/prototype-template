import React, { useState, useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { useForm } from 'react-hook-form';
import { eventStatus } from '../../common/enums';
import { WSContext } from '../../common/WSContext';
import { EventContext } from '../../common/EventContext';
import { ChallengesContext } from '../../common/ChallengesContext';
import { LeaderboardContext } from '../../common/LeaderboardContext';
import useBriefingData from './useBriefingData';
import onSubmit from './onSubmit';
import submissionStates from './submissionStates';

import BriefingMarkup from './Briefing';

const Briefing = ({ dataURL, challengeId, setLastChallengeVisited, jwt }) => {
  const [rateLimit, setRateLimit] = useState(0);
  const [submissionState, setSubmissionState] = useState(submissionStates.IDLE);

  const [hintError, setHintError] = useState(null);
  const { leaderboardDispatch } = useContext(LeaderboardContext);
  const {
    challenges: { data: groups, total: totalChallenges },
    challengesDispatch,
  } = useContext(ChallengesContext);
  const url = `${dataURL}/challenge/${challengeId}`;

  const { fallback } = useContext(WSContext);

  const multipleChoiceFlagMode = 8;
  const acknowledgedFlagMode = 9;

  const {
    event: { isScored, id, status, isTeamEvent, hashedUserId, hashedTeamId },
    dispatch,
  } = useContext(EventContext);

  const { data, error, setData } = useBriefingData({
    url,
    challengeId,
    setSubmissionState,
    hashedUserId,
    hashedTeamId,
    jwt,
  });

  if (status === eventStatus.PAUSED) {
    navigate(`/event/${id}`);
  }

  const signalEl = useRef(null);

  const { register, handleSubmit, errors, reset } = useForm();

  const flatChallenges = groups
    .filter(group => !group.locked)
    .map(group => group.challenges)
    .flat(1)
    .filter(challenge => !challenge.locked);

  const currentIndex = flatChallenges.findIndex(
    challenge => challenge.id === challengeId
  );

  const previous = flatChallenges[currentIndex - 1]
    ? `/event/${id}/challenge/${flatChallenges[currentIndex - 1].id}`
    : '';

  const next = flatChallenges[currentIndex + 1]
    ? `/event/${id}/challenge/${flatChallenges[currentIndex + 1].id}`
    : '';

  if (data && data.eventStatus === eventStatus.PAUSED) {
    // Go to challenges page
    navigate(`/event/${id}`);

    // Set paused
    dispatch({ type: 'PAUSE_EVENT' });
  }

  const submit = formData =>
    onSubmit({
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
    });

  // When we switch to a new briefing
  useEffect(() => {
    // Set the last challenge visited
    setLastChallengeVisited(challengeId);

    // Reset data
    setData(null);
    setRateLimit(0);
    setSubmissionState(submissionStates.IDLE);
    setHintError(null);

    // Reset flag input
    reset();
  }, [challengeId, reset, setData, setLastChallengeVisited]);

  return (
    <BriefingMarkup
      {...{
        data,
        error,
        hintError,
        rateLimit,
        submissionState,
        signalEl,
        isScored,
        submit,
        register,
        handleSubmit,
        errors,
        multipleChoiceFlagMode,
        acknowledgedFlagMode,
        url,
        setData,
        setHintError,
        nextChallenge: next,
        previousChallenge: previous,
      }}
    />
  );
};

Briefing.propTypes = {
  dataURL: PropTypes.string,
  challengeId: PropTypes.string,
  setLastChallengeVisited: PropTypes.func,
  jwt: PropTypes.string,
};

export default Briefing;
