import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Svg, Bg, Progress, Content } from './styles';

const ProgressCircle = ({ children, progress = 0, color }) => {
  const PROGRESS_RADIUS = 57;
  return (
    <Wrapper>
      <Svg viewBox="0 0 120 120">
        <Bg cx="60" cy="60" r="59" />
        <Progress
          cx="60"
          cy="60"
          r={PROGRESS_RADIUS}
          strokeWidth="6"
          strokeDasharray={2 * Math.PI * PROGRESS_RADIUS}
          strokeDashoffset={
            2 * Math.PI * PROGRESS_RADIUS * (1 - progress / 100)
          }
          color={color}
        />
      </Svg>
      <Content>{children}</Content>
    </Wrapper>
  );
};
ProgressCircle.propTypes = {
  children: PropTypes.any,
  progress: PropTypes.number,
  color: PropTypes.string,
};

export default ProgressCircle;
