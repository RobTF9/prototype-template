import React, { useState } from 'react';
import PropTypes from 'prop-types';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import useInterval from '../common/useInterval';
import formatTime from '../common/formatTime';
import { getTimeRemaining } from '../common/countdown';
import Bar from './Bar';

const Timer = ({ start, end, large, onEnd }) => {
  const duration = differenceInSeconds(end, start);
  const initialRemaining = getTimeRemaining(end);

  // State
  const [progress, setProgress] = useState(
    (initialRemaining.total / 1000 / duration) * 100
  );
  const [time, setTime] = useState(formatTime(initialRemaining));
  const [isRunning, setIsRunning] = useState(true);

  // Update timer every second
  useInterval(
    () => {
      const t = getTimeRemaining(end);
      setProgress((t.total / 1000 / duration) * 100);
      setTime(formatTime(t));

      if (t.total <= 0) {
        setIsRunning(false);
        setProgress(0);
        onEnd();
      }
    },
    isRunning ? 1000 : null
  );

  return (
    <div className="atom atom-timer-bar">
      <Bar {...{ severity: 'warning', taller: true, progress }} />
      <div className={`time ${large ? 'time--large' : ''}`}>{time}</div>
    </div>
  );
};

Timer.propTypes = {
  start: PropTypes.object,
  end: PropTypes.object,
  large: PropTypes.bool,
  onEnd: PropTypes.func,
};

export default Timer;
