import styled, { keyframes, css } from 'styled-components';
import CoreColors from '../../common/coreColors';
import { fullBorder } from '../../common/borders';

const pulse = keyframes`
  0% {
    background: ${CoreColors.greysuperdark};
  }

  50% {
    background: ${CoreColors.greyuberdark};
  }

  100% {
    background: ${CoreColors.greysuperdark};
  }
`;

const Wrapper = styled.div`
  background: ${CoreColors.greysuperdark};
  ${({ border }) => fullBorder(CoreColors[border])};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 140px;
  padding: 20px;

  @media (min-width: 600px) {
    min-height: 180px;
  }

  ${({ loading }) =>
    loading &&
    css`
      animation: ${pulse} 2s infinite ease-in-out;
    `}
`;

const Header = styled.div`
  margin-bottom: 20px;

  p {
    margin: 0;
  }

  .you {
    color: ${CoreColors.blueprime};
  }

  ${({ swapOrder }) =>
    swapOrder &&
    css`
      display: flex;
      flex-direction: column-reverse;
    `}
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  a,
  p {
    color: ${({ color }) => CoreColors[color]};
  }

  p {
    margin: 0;
  }
`;

export { Wrapper, Header, LinkWrapper };
