import styled, { css } from 'styled-components';
import { sideBorder } from '../../../common/borders';
import CoreColors from '../../../common/coreColors';

const Wrapper = styled.div(
  ({ bottomMargin }) => css`
    margin-bottom: ${bottomMargin ? '30px' : '0'};
    margin-top: -20px;
  `
);

const AddButton = styled.button(
  ({ margin }) => css`
    margin: ${margin ? '30px 0' : '0'};
  `
);

const HintWrapper = styled.div`
  ${sideBorder('bottom', CoreColors.greydark)}
  padding: 20px 0;
  position: relative;
`;

const Grabber = styled.div(
  ({ show }) => css`
    color: ${CoreColors.greyprime};
    cursor: move;
    display: ${show ? 'block' : 'none'};
    left: -22px;
    padding: 5px;
    position: absolute;
    top: 12px;
  `
);

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  .core-text {
    margin: 0;
  }
`;

const Actions = styled.div`
  display: flex;

  button {
    margin-left: 20px;
  }
`;

const Body = styled.div(
  ({ show }) => css`
    display: ${show ? 'block' : 'none'};
    margin-top: 20px;
  `
);

export { Wrapper, AddButton, HintWrapper, Grabber, Header, Actions, Body };
