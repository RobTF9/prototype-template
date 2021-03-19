import styled from 'styled-components';
import CoreColors from '../../../common/coreColors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  p {
    margin: 0;
  }

  &::after {
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(26, 27, 32, 1) 100%
    );
    content: '';
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 15px;
    z-index: 1;
  }

  &.scroll-right::after,
  &.no-scroll-x::after {
    display: none;
  }
`;

const DateText = styled.p`
  && {
    color: ${CoreColors.greylightest};
    overflow: scroll;
    white-space: nowrap;
  }
`;

export { Wrapper, DateText };
