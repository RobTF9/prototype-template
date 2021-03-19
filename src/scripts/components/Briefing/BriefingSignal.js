import React from 'react';
import PropTypes from 'prop-types';
import Signal from '../Signal';
import submissionStates from './submissionStates';

const BriefingSignal = ({
  data,
  error,
  hintError,
  rateLimit,
  submissionState,
  signalEl,
}) => {
  let reason = '';
  let severity = '';

  if ((!data && error) || submissionState === submissionStates.ERROR) {
    reason = 'An unexpected error occurred';
    severity = 'danger';
  }

  if (rateLimit) {
    const rateLimitMinutes = Math.ceil(rateLimit / 60);
    reason = `You have reached the rate limit for submissions. You can try again in ${rateLimitMinutes} minute${
      rateLimitMinutes === 1 ? '' : 's'
    }`;
    severity = 'danger';
  }

  if (hintError) {
    reason = 'There was an error getting the hint. Please try again';
    severity = 'danger';
  }

  if (submissionState === submissionStates.CORRECT) {
    severity = 'positive';

    if (data.flagMetadata.text) {
      reason = 'Acknowledged!';
    } else {
      reason = 'Flag correct!';
    }
  }

  if (
    data.challengeComplete ||
    submissionState === submissionStates.ALREADY_COMPLETE
  ) {
    reason = 'Challenge already completed';
    severity = 'warning';
  }

  if (submissionState === submissionStates.INCORRECT) {
    reason = 'Flag incorrect!';
    severity = 'danger';
  }

  if (reason) {
    return (
      <Signal
        {...{
          reasons: [reason],
          center: true,
          severity,
          shallow: true,
          ref: signalEl,
        }}
      />
    );
  }

  return null;
};

BriefingSignal.propTypes = {
  data: PropTypes.object,
  error: PropTypes.object,
  hintError: PropTypes.string,
  rateLimit: PropTypes.number,
  submissionState: PropTypes.number,
  signalEl: PropTypes.object,
};

export default BriefingSignal;
