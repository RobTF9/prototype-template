import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Countdown } from './styles';
import { getTimeRemaining } from '../../../common/countdown';
import formatTime from '../../../common/formatTime';
import useInterval from '../../../common/useInterval';

const UpcomingEventDates = ({ end, onEnd }) => {
  const initialRemaining = getTimeRemaining(end);
  const [time, setTime] = useState(formatTime(initialRemaining));
  const [isRunning, setIsRunning] = useState(true);

  // Update timer every second
  useInterval(
    () => {
      const t = getTimeRemaining(end);
      setTime(formatTime(t));

      if (t.total <= 0) {
        setIsRunning(false);
        onEnd();
      }
    },
    isRunning ? 1000 : null
  );

  return (
    <Wrapper>
      <h5 className="core-heading core-heading--senary">Starts in</h5>
      <Countdown className="core-text core-text--primary">{time}</Countdown>
    </Wrapper>
  );
};

UpcomingEventDates.propTypes = {
  end: PropTypes.instanceOf(Date),
  onEnd: PropTypes.func,
};

export default UpcomingEventDates;
