import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Bar = ({ severity, taller, bottom, progress }) => {
  const classes = classNames({
    'core-bar': true,
    [`core-bar--${severity}`]: severity,
    'core-bar--taller': taller,
    'core-bar--bottom': bottom,
  });

  return (
    <div className={classes}>
      <div className="completed" style={{ width: `${progress}%` }} />
    </div>
  );
};

Bar.propTypes = {
  severity: PropTypes.string,
  taller: PropTypes.bool,
  bottom: PropTypes.bool,
  progress: PropTypes.number,
};

export default Bar;
