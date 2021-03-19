import React from 'react';
import PropTypes from 'prop-types';
import Bar from '../../Bar';
import ordinal from '../../../common/ordinal';
import LoadingEllipses from '../../LoadingEllipses';
import { Wrapper } from './styles';

const Position = ({
  position,
  percentComplete,
  points = null,
  showPosition,
  fullWidthMobile, // eslint-disable-line no-unused-vars
}) => (
  <div>
    <Wrapper>
      <p className="core-text core-text--tertiary">
        Your {showPosition ? 'position' : 'progress'}
      </p>
      <p className="core-text core-text--tertiary">
        {showPosition && (
          <>
            {position ? ordinal(position) : <LoadingEllipses />}
            {' // '}
          </>
        )}
        {percentComplete !== null ? percentComplete : <LoadingEllipses />}%
        {' // '}
        {points !== null ? points.toLocaleString() : <LoadingEllipses />}
        pts
      </p>
    </Wrapper>
    <Bar {...{ progress: percentComplete, taller: true }} />
  </div>
);

Position.propTypes = {
  position: PropTypes.number,
  percentComplete: PropTypes.number,
  points: PropTypes.number,
  showPosition: PropTypes.bool,
  fullWidthMobile: PropTypes.bool,
};

export default Position;
