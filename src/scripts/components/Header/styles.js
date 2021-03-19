import styled, { css } from 'styled-components';
import { sideBorder } from '../../common/borders';
import CoreColors from '../../common/coreColors';

const Wrapper = styled.header`
  background: ${CoreColors.greysuperdark};
  ${sideBorder('bottom', CoreColors.greydarkest)}

  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    align-items: center;
    display: flex;
    justify-content: space-between;
    min-height: 60px;
  }

  & * {
    -ms-overflow-style: none; /* IE 10+ */
    scrollbar-width: none; /* Firefox */
  }

  & *::-webkit-scrollbar {
    background: transparent; /* Chrome/Safari/Webkit */
    height: 0;
    width: 0;
  }
`;

const InfoWrapper = styled.div`
  flex: 1 1 auto;
  min-width: 0%;
  padding: 0 10px;
  position: relative;

  ${({ hasChildren }) =>
    hasChildren &&
    css`
      ${sideBorder('bottom', CoreColors.greydarkest)}
    `}

  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    border-bottom: none;
    padding: 0 20px;
  }
`;

const Info = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  min-height: 40px;
  min-width: 0%;
  padding: 7px 0;
  white-space: nowrap;

  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    justify-content: start;

    &::after {
      right: 20px;
    }
  }

  ${({ scrollableInfo }) =>
    scrollableInfo &&
    css`
      overflow: scroll;

      &::after {
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0) 0%,
          rgba(26, 27, 32, 1) 100%
        );
        content: '';
        height: calc(100% - 2px);
        position: absolute;
        right: 10px;
        top: 0;
        width: 15px;
        z-index: 1;
      }

      &.scroll-right::after,
      &.no-scroll-x::after {
        display: none;
      }
    `}
`;

const Heading = styled.h1`
  &.core-heading {
    margin: 0;
  }

  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    &.core-heading {
      margin-right: 20px;
    }
  }
`;

const SubText = styled.p`
  flex: 0 1 100%;
  margin: 0;
  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    flex: 0 1 auto;
  }

  && {
    margin: 0;
    ${({ color }) =>
      color &&
      css`
        color: ${CoreColors[color]};
      `}
  }
`;

const Sections = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
`;

const Section = styled.div`
  ${sideBorder('left', CoreColors.greydarkest)};
  display: flex;
  flex-direction: column;
  height: 50px;
  justify-content: center;
  min-width: 0%;
  padding: 0 10px;
  position: relative;

  &:first-of-type {
    border-left: none;
  }

  ${({ fixedEnd }) =>
    fixedEnd &&
    css`
      flex: 0 0 auto;
    `}

  ${({ hideMobile }) =>
    hideMobile &&
    css`
      @media (max-width: ${({ breakpoint }) => breakpoint}px) {
        display: none;
      }
    `}

  ${({ fullWidthMobile }) =>
    fullWidthMobile &&
    css`
      @media (max-width: ${({ breakpoint }) => breakpoint}px) {
        border-left: none;
        width: 100%;
      }
    `}

  ${({ noBorderMobile }) =>
    noBorderMobile &&
    css`
      @media (max-width: ${({ breakpoint }) => breakpoint}px) {
        border-left: none;
      }
    `}

  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    height: 60px;
    padding: 0 20px;

    &:first-of-type {
      ${sideBorder('left', CoreColors.greydarkest)}
    }
  }
`;

export { Wrapper, InfoWrapper, Info, Heading, SubText, Sections, Section };
