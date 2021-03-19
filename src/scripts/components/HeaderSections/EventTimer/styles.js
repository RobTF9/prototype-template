import styled from 'styled-components';
import coreColors from '../../../common/coreColors';

export const EventTimerWrapper = styled.div`
  min-width: 290px;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;

    * {
      margin: 0;
    }

    p {
      color: ${coreColors.yellowprime};
    }
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;
