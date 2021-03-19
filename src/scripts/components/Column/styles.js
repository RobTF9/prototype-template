import styled from 'styled-components';
import { motion } from 'framer-motion';
import CoreColors from '../../common/coreColors';
import { sideBorder } from '../../common/borders';

const Wrapper = styled(motion.div)`
  background: ${CoreColors.greysuperdark};
  min-height: 100%;
  min-width: 0%;
  overflow-x: hidden;
  overflow-y: ${({ open }) => (open ? 'scroll' : 'hidden')};
  padding: 0 10px;
  position: relative;
  will-change: flex-basis;

  @media (min-width: 960px) {
    padding: 0 20px;
  }

  @media (min-width: 1280px) {
    ${sideBorder('left', CoreColors.greydarkest)}
    flex: 0 0 auto;
  }

  /* Overrides inline animation styling for smaller viewports */
  @media (max-width: 1279px) {
    flex: 1 0 ${({ columns }) => 100 / (columns + 1)}% !important;
    overflow-y: scroll;
  }

  &::after {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(26, 27, 32, 1) 100%
    );
    bottom: 0;
    content: '';
    height: 60px;
    position: fixed;
    width: 100%;
    z-index: 1;
  }

  &.scroll-bottom::after,
  &.no-scroll-y::after {
    display: none;
  }
`;

const Header = styled.div`
  position: relative;
`;

const Heading = styled(motion.div)`
  && {
    margin: 0;
    position: absolute;
    top: 20px;
    transform-origin: 0% 0%;
    white-space: nowrap;
    will-change: transform;

    /* Overrides inline animation styling for smaller viewports */
    @media (max-width: 1279px) {
      transform: none !important;
    }
  }
`;

const Toggle = styled(motion.button)`
  display: none;

  @media (min-width: 1280px) {
    display: block;
    position: absolute;
    right: 0;
    top: 20px;
    will-change: transform;
  }
`;

const Content = styled(motion.div)`
  margin-top: 60px;
  position: relative;
  will-change: transform;

  @media (min-width: 1280px) {
    width: 250px;
  }

  /* Overrides inline animation styling for smaller viewports */
  @media (max-width: 1279px) {
    opacity: 1 !important;
    transform: none !important;
  }
`;

export { Wrapper, Header, Heading, Toggle, Content };
