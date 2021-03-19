import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Signal = forwardRef(
  ({ reasons, intro, center, severity, shallow }, ref) => {
    const classes = classNames({
      'core-signal': true,
      'core-signal--center': center && reasons.length === 1,
      [`core-signal--${severity}`]: severity,
      'core-signal--multipart': reasons > 1,
      'core-signal--shallow': shallow,
    });

    return (
      <div className={classes} ref={ref} tabIndex="-1">
        {reasons.length > 1 ? (
          <>
            <div className="core-signal--intro">{intro || 'Errors'}</div>
            <ul className="core-list core-list--unordered">
              {reasons.map(reason => (
                <li className="core-list-item">{reason}</li>
              ))}
            </ul>
          </>
        ) : (
          reasons[0]
        )}
      </div>
    );
  }
);

Signal.propTypes = {
  reasons: PropTypes.array,
  intro: PropTypes.string,
  center: PropTypes.bool,
  severity: PropTypes.string,
  shallow: PropTypes.bool,
};

export default Signal;
