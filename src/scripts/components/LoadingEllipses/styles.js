import styled, { keyframes } from 'styled-components';

const ellipsisDot = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const Ellipses = styled.span`
  & span {
    animation: ${ellipsisDot} 1s infinite;
    opacity: 0;
  }

  & span:nth-child(1) {
    animation-delay: 0s;
  }

  & span:nth-child(2) {
    animation-delay: 0.1s;
  }

  & span:nth-child(3) {
    animation-delay: 0.2s;
  }
`;

export { Ellipses };
