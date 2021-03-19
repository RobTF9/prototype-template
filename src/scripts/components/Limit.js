import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Limit({ limit, value }) {
  const warningLimit = Math.min(limit / 2, 25);
  const charsLeft = limit - value.length;

  const classes = classNames({
    'limiter-count': true,
    'limiter-count--warning': charsLeft <= warningLimit,
    'limiter-count--danger': charsLeft === 0,
  });

  return <div className={classes}>{limit - value.length}</div>;
}

Limit.propTypes = {
  limit: PropTypes.number,
  value: PropTypes.string,
};

export default Limit;
