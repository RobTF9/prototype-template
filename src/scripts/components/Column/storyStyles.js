import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  flex: 1 0 0;
  height: 100%;

  overflow: hidden;
  width: ${({ columns }) => 100 * (columns + 1)}vw;

  @media (min-width: 1280px) {
    transform: translateX(0) !important;
    width: 100vw;
  }
`;

const Content = styled.div`
  flex: 1 0 ${({ columns }) => 100 / (columns + 1)}%;
  overflow: scroll;
  padding: 20px;
  position: relative;

  @media (min-width: 1280px) {
    flex: 1 0 auto;
  }

  .sub-1280 {
    @media (min-width: 1280px) {
      display: none;
    }
  }
`;

export { Main, Content };
