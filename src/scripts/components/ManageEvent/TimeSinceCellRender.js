import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { format, formatDistanceToNow } from 'date-fns';
import useInterval from '../../common/useInterval';
import { eventStatus as status } from '../../common/enums';

function TimeSinceCellRender({ value, column }) {
  const { eventStatus } = column;
  const dateValue = new Date(value * 1000);

  const [distance, setDistance] = useState(
    value === null ? '-' : formatDistanceToNow(dateValue, { addSuffix: true })
  );

  const updateDistance = useCallback(() => {
    if (value === null) {
      return;
    }

    setDistance(formatDistanceToNow(dateValue, { addSuffix: true }));
  }, [dateValue, value]);

  // Run if value has changed
  useEffect(() => {
    updateDistance();
  }, [updateDistance, value]);

  // Run every 60 seconds
  useInterval(() => {
    if (eventStatus === status.STARTED) {
      updateDistance();
    }
  }, 60000);

  if (eventStatus === status.FINISHED) {
    return value === null ? '-' : format(dateValue, 'HH:mm do LLL yyyy');
  }

  return distance;
}

TimeSinceCellRender.propTypes = {
  value: PropTypes.number,
};

export default TimeSinceCellRender;
