import styled, { css } from 'styled-components';
import CoreColors from '../../common/coreColors';

const Header = styled.div`
  align-items: center;
  background: linear-gradient(
    to bottom,
    rgba(26, 27, 32, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  display: flex;
  height: 60px;
  justify-content: space-between;
  left: 0;
  padding: 0 10px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;

  && {
    button {
      background: none;
      display: none;
      position: relative;
      z-index: 2;

      @media (min-width: 1280px) {
        display: block;
      }
    }
  }

  @media (min-width: 960px) {
    padding: 0 20px;
  }

  /* Overwrites if the page content is a full size table */
  ${({ tableContent }) =>
    tableContent &&
    css`
      left: auto;
      position: static;
      right: auto;
      top: 0;
      z-index: auto;
    `}
`;

const TabLink = styled.a`
  && {
    border-bottom: none;
    margin: 0;

    ${({ isCurrent }) =>
      isCurrent &&
      css`
        color: #ffffff;
        font-weight: 700;
      `}
  }

  &:after {
    color: ${CoreColors.greydark};
    content: '|';
    font-weight: 400;
    margin: 0 6px;
  }

  &:last-child:after {
    content: '';
    margin: 0;
  }
`;

const Title = styled.h2`
  && {
    margin: 0;
  }
`;

const Content = styled.div`
  height: 100%;
  overflow: scroll;
  padding-top: 60px;
  position: relative;

  ${({ rightGradient }) =>
    rightGradient &&
    css`
      &::before {
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0) 0%,
          rgba(26, 27, 32, 1) 100%
        );
        bottom: 0;
        content: '';
        display: block;
        height: 100%;
        margin: 0;
        pointer-events: none;
        position: fixed;
        right: 0;
        top: 0;
        width: 60px;
        z-index: 1;
      }
    `}

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
    position: sticky;
    right: 0;
    width: 100%;
    z-index: 1;
  }

  /* Overwrites if the page content is a full size table */
  ${({ tableContent }) =>
    tableContent &&
    css`
      height: calc(100% - 60px);
      overflow: hidden;
      padding-top: 0;

      & > div {
        height: 100%;
      }
    `}
`;

export { Header, TabLink, Title, Content };
