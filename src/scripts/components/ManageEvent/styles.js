import styled from 'styled-components';
import coreColors from '../../common/coreColors';

const ChallengesEmptyState = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 40px 10px 0;
  position: relative;
  z-index: 1;

  .wrapper {
    max-width: 600px;
  }

  .sub-text {
    color: ${coreColors.greyprime};
    margin-bottom: 24px;
  }

  @media (min-width: 600px) {
    padding-top: 100px;
  }
`;

const Actions = styled.div`
  padding-left: 20px;

  .core-button {
    display: inline-block;
    margin-right: 10px;
    width: auto;
  }

  .add-player-button {
    padding: 5px 19px;
  }

  .manage-csv-button {
    padding: 5px 23px;
  }
`;

const PlayerEmptyState = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 40px 10px 0;
  position: relative;
  z-index: 1;

  .wrapper {
    max-width: 600px;
  }

  .add-player-subtext {
    margin-bottom: 30px;
  }

  .csv-link-wrapper {
    margin-top: 15px;
    text-align: center;
  }

  @media (min-width: 600px) {
    padding-top: 100px;
  }
`;

const AddPlayerModalWrapper = styled.div`
  padding: 20px;
`;

const SignalWrapper = styled.div`
  padding: 0 10px;

  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    padding: 0 20px;
  }
`;

export {
  Actions,
  PlayerEmptyState,
  AddPlayerModalWrapper,
  ChallengesEmptyState,
  SignalWrapper,
};
