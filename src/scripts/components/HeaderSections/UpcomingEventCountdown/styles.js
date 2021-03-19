import styled from 'styled-components';
import CoreColors from '../../../common/coreColors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  && {
    h5,
    p {
      margin: 0;
    }
  }
`;

const Countdown = styled.p`
  && {
    color: ${CoreColors.blueprime};
    overflow: scroll;
    white-space: nowrap;
  }
`;

export { Wrapper, Countdown };
