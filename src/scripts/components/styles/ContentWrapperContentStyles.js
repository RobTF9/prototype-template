import styled from 'styled-components';
import { motion } from 'framer-motion';
import Div100vh from 'react-div-100vh';

const Wrapper = styled(Div100vh)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Main = styled(motion.main)`
  display: flex;
  flex: 1 0 0;
  overflow: hidden;
  width: ${({ columns }) => 100 * (columns + 1)}vw;

  @media (min-width: 1280px) {
    transform: translateX(0) !important;
    width: 100vw;
  }
`;

const Content = styled.div`
  flex: 1 0 ${({ columns }) => 100 / (columns + 1)}%;
  overflow: hidden;
  position: relative;
  transform: translateZ(0);

  // Styling div added by reach-router for focus management
  & > div {
    height: 100%;
  }

  @media (min-width: 1280px) {
    flex: 1 1 auto;
  }
`;

export { Wrapper, Main, Content };
