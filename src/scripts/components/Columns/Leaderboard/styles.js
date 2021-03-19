import styled from 'styled-components';

const LeaderboardLink = styled.a`
  display: inline-block;
  font-size: 14px;
  margin-bottom: 30px;
  position: absolute;
  right: 0;
  top: -39px;

  @media (min-width: 1280px) {
    margin-bottom: 20px;
    position: static;
  }
`;

const TopTenHeader = styled.h3`
  && {
    margin-bottom: 16px;
    padding-top: 10px;
  }
`;

export { LeaderboardLink, TopTenHeader };
