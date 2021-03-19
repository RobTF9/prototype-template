import styled from 'styled-components';
import { fullBorder } from '../../../common/borders';
import CoreColors from '../../../common/coreColors';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;

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

  button {
    border-radius: 3px;
    margin: 13px 0 13px 10px;
    white-space: nowrap;

    &:first-child {
      margin-left: 0;
    }

    &.core-button.core-button--smallest {
      padding: 4px 21px 5px;
    }

    &:disabled,
    &[disabled],
    &.core-button--disabled {
      background-color: ${CoreColors.greysuperdark};
      ${fullBorder(CoreColors.greyprime)};
      color: ${CoreColors.greyprime};
      font-style: normal;

      // Hover.
      &:hover {
        background-color: ${CoreColors.greysuperdark};
        ${fullBorder(CoreColors.greyprime)};
        color: ${CoreColors.greyprime};
      }
    }
  }
`;

export { Wrapper };
