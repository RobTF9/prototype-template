import { motion } from 'framer-motion';
import styled from 'styled-components';
import { fullBorder, sideBorder } from '../../common/borders';
import coreColors from '../../common/coreColors';

export const SidebarToggle = styled.button`
  ${fullBorder(coreColors.blueprime)}
  align-items: center;
  background-color: ${coreColors.greysuperdark};
  border-radius: 30px;
  bottom: 0;
  display: flex;
  height: 30px;
  justify-content: center;
  opacity: 0;
  position: absolute;
  right: 0;
  transform: translateX(50%) translateY(50%);
  transition: opacity 0.3s ease-in-out;
  width: 30px;
  z-index: 100;

  svg {
    fill: ${coreColors.blueprime};
    transform: ${({ sidebarActive }) =>
      sidebarActive ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.3s ease-in-out;
  }
`;

export const SidebarWrapper = styled(motion.div)`
  ${sideBorder('right', coreColors.greydarkest)}
  background-color: ${coreColors.greysuperdark};
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    ${SidebarToggle} {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    ${SidebarToggle} {
      opacity: 1;
    }
  }
`;

export const SidebarList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 40px 20px;

  @media (max-width: 600px) {
    padding: 40px 10px;
  }

  li {
    margin: 0;
    padding: 0;

    &:last-of-type a {
      margin-bottom: 0 !important;
    }
  }

  li a {
    align-items: center;
    color: ${coreColors.greylightest};
    display: flex;
    margin-bottom: 40px;
    white-space: nowrap;

    span {
      color: ${coreColors.greylightest};
      display: block;
    }

    svg {
      fill: ${coreColors.greydark};
      flex-shrink: 0;
      height: 18px;
      margin-right: 5px;
      width: 18px;
    }
  }

  .active {
    span {
      color: ${coreColors.primarywhite};
    }

    svg {
      fill: ${coreColors.greenprime};
    }
  }
`;

export const SidebarHeader = styled.header`
  ${sideBorder('bottom', coreColors.greydarkest)}
  padding: 20px;
  position: relative;

  @media (max-width: 600px) {
    padding: 20px 10px;
  }
`;

export const SidebarHeaderNotActive = styled.div`
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
  ${({ sidebarActive }) => sidebarActive && 'opacity: 0'};

  * {
    color: ${coreColors.blueprime} !important;
    fill: currentColor;
    margin: 0;
  }

  svg {
    height: 18px;
    width: 18px;
  }
`;

export const SidebarHeaderActive = styled(motion.div)`
  width: 100%;
`;

export const SidebarChildren = styled(motion.div)`
  ${sideBorder('top', coreColors.greydarkest)}
  flex: 1;
  height: 100%;
  overflow: scroll;
  padding: 20px;
  position: relative;
  width: 290px;

  @media (max-width: 600px) {
    padding: 20px 10px;
  }

  .core-heading {
    position: sticky;
    top: 0;
    z-index: 10;

    &::after {
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 0%,
        rgba(26, 27, 32, 1) 100%
      );
      content: '';
      display: block;
      height: 60px;
      left: 0;
      pointer-events: none;
      position: absolute;
      right: 0;
      top: -20px;
      width: 100%;
      z-index: -1;
    }
  }

  &::after {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(26, 27, 32, 1) 100%
    );
    bottom: -20px;
    content: '';
    display: block;
    height: 60px;
    left: 0;
    pointer-events: none;
    position: sticky;
    right: 0;
    width: 100%;
    z-index: 1;
  }
`;
