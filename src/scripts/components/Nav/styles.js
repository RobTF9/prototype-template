import styled from 'styled-components';
import { motion } from 'framer-motion';
import CoreColors from '../../common/coreColors';
import { sideBorder } from '../../common/borders';

const Wrapper = styled.nav`
  align-items: center;
  background: ${CoreColors.greysuperdark};
  ${sideBorder('top', CoreColors.greydarkest)}
  display: flex;
  height: 50px;
  width: 100%;
`;

const MenuButton = styled.button`
  align-self: stretch;
  background: none;
  border: none;
  ${sideBorder('right', CoreColors.greydarkest)}
  min-width: 0;
  padding: 0 10px;

  @media (min-width: 1280px) {
    display: none;
  }
`;

const Tabs = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;

  button {
    margin: 0 10px;
  }

  @media (min-width: 1280px) {
    display: none;
  }
`;

const Menu = styled(motion.div)`
  background: ${CoreColors.greysuperdark};
  ${sideBorder('top', CoreColors.greydarkest)};
  bottom: 0;
  display: flex;
  height: 50px;
  justify-content: space-between;
  left: 0;
  position: fixed;
  width: 100%;
  will-change: transform;

  @media (min-width: 1280px) {
    align-items: center;
    border-top: none;
    flex: 1 0 auto;
    height: auto;
    justify-content: space-between;
    position: relative;
    transform: translateX(0) translateZ(0) !important;
    width: auto;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  ${sideBorder('right', CoreColors.greydarkest)};
  padding-right: 10px;

  @media (min-width: 1280px) {
    display: none;
  }
`;

export { Wrapper, MenuButton, Tabs, Menu, CloseButton };
