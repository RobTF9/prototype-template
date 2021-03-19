import styled, { keyframes } from 'styled-components';
import CoreColors from '../../common/coreColors';
import { sideBorder } from '../../common/borders';

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
  padding: 10px;

  @media (min-width: 960px) {
    padding: 30px 20px;
  }
`;

const FirstWrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;

  h2 {
    margin-bottom: 30px;
  }

  p {
    margin-bottom: 30px;
  }

  @media (min-width: 600px) {
    margin-top: 90px;
  }
`;

const TeamsWrapper = styled.div`
  ${sideBorder('top', CoreColors.greydarkest)}
`;

const NoTeam = styled.div`
  ${sideBorder('bottom', CoreColors.greydarkest)}
  padding: 30px 10px;

  @media (min-width: 960px) {
    padding: 30px 20px;
  }

  p {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  span {
    color: ${CoreColors.blueprime};
  }

  .core-button {
    border-radius: 3px;
    display: inline-block;
    font-size: 14px;
    margin: 0;
    padding: 5px 7px;
    width: auto;
  }
`;

const LoadingTeam = styled.div`
  ${sideBorder('bottom', CoreColors.greydarkest)}
  padding: 30px 10px;

  @media (min-width: 960px) {
    padding: 30px 20px;
  }

  div {
    animation: ${pulse} 2s infinite ease-in-out;
    height: 55px;
  }
`;

const SearchForm = styled.form`
  margin-top: 20px;

  div {
    display: flex;
  }

  .core-button {
    height: 32px;
    margin-left: 10px;
    width: 120px;
  }
`;

const ErrorWrapper = styled.div`
  ${sideBorder('bottom', CoreColors.greydarkest)}
  padding: 30px 10px;

  @media (min-width: 960px) {
    padding: 30px 20px;
  }

  .core-signal {
    margin-bottom: 0;
  }
`;

const Filter = styled.p`
  margin: 10px 0 0;

  a {
    margin-left: 10px;
  }
`;

const NoTeams = styled.div`
  padding: 30px 10px;

  @media (min-width: 960px) {
    padding: 30px 20px;
  }
`;

export {
  Wrapper,
  FirstWrapper,
  TeamsWrapper,
  NoTeam,
  LoadingTeam,
  SearchForm,
  ErrorWrapper,
  Filter,
  NoTeams,
};
