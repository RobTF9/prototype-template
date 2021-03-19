import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 10px;

  @media (min-width: 960px) {
    padding: 30px 20px;
  }
`;

const PlayerCards = styled.div`
  display: grid;
  grid-gap: 10px;

  @media (min-width: 600px) {
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    & > div {
      margin-bottom: 10px;
      min-height: auto;
    }
  }
`;

const Filter = styled.p`
  a {
    margin-left: 10px;
  }
`;

const NoPlayers = styled.div`
  margin-top: 20px;
`;

export { Wrapper, PlayerCards, Filter, NoPlayers };
