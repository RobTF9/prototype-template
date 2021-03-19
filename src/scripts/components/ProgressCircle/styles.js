import styled, { keyframes } from 'styled-components';
import { borderWidth } from '../../common/borders';
import CoreColors from '../../common/coreColors';

const progressAnimation = keyframes`
  0% {
    stroke-dashoffset: 360;
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const Svg = styled.svg`
  transform: rotate(-90deg);

  circle {
    fill: none;
  }
`;

const Bg = styled.circle`
  stroke: ${CoreColors.greydarkest};
  stroke-width: ${borderWidth}px;
`;

const Progress = styled.circle`
  animation: ${progressAnimation} 500ms ease-out forwards;
  stroke: ${({ color }) => color || CoreColors.blueprime};
`;

const Content = styled.div`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export { Wrapper, Svg, Bg, Progress, Content };
