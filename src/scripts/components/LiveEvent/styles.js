import styled, { css } from 'styled-components';
import coreColors from '../../common/coreColors';

export const EventRouterWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  width: 100%;

  &::after {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(26, 27, 32, 1) 100%
    );
    bottom: 0;
    content: '';
    display: block;
    height: 60px;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    width: 100%;
  }

  & > div {
    height: 100%;
    overflow-y: scroll;
    padding: 0 20px 20px;

    @media (max-width: 600px) {
      min-width: calc(100vw - 38px);

      ${({ sidebarActive }) =>
        sidebarActive &&
        css`
          pointer-events: none;
        `}
    }
  }
`;

export const OpacityToggle = styled.button`
  background-color: ${coreColors.greysuperdark};
  border: none;
  display: none;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  transition: opacity 0.3s ease;
  width: 100%;
  z-index: 99;

  @media (max-width: 600px) {
    display: block;
    pointer-events: none;
    ${({ sidebarActive }) =>
      sidebarActive &&
      css`
        opacity: 0.8;
        pointer-events: all;
      `}
  }
`;
