import React from 'react';
import PropTypes from 'prop-types';

function SuccessRateCellRender({ value }) {
  if (value === null) {
    return '-';
  }
  let className = 'color-foreground--red-prime';

  if (value >= 33) {
    className = 'color-foreground--yellow-prime';
  }

  if (value >= 66) {
    className = 'color-foreground--green-prime';
  }

  return <span className={className}>{`${Math.round(value)}%`}</span>;
}

SuccessRateCellRender.propTypes = {
  value: PropTypes.string,
};

export default SuccessRateCellRender;
