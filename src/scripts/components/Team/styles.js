import styled from 'styled-components';
import CoreColors from '../../common/coreColors';
import { sideBorder } from '../../common/borders';

const Wrapper = styled.div`
  ${sideBorder('bottom', CoreColors.greydarkest)}
  padding: 30px 10px;

  @media (min-width: 960px) {
    padding: 30px 20px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  && {
    h4 {
      margin-bottom: 0;
      white-space: nowrap;
    }
  }

  div {
    align-items: center;
    display: flex;

    a {
      margin-left: 10px;
    }
  }

  .your-team {
    color: ${CoreColors.blueprime};
  }
`;

const AccessCode = styled.p`
  margin: 5px 0 0;

  span {
    color: ${CoreColors.greenprime};
  }
`;

const NumberOfPlayers = styled.p`
  margin: 5px 0 0;
`;

export { Wrapper, Header, AccessCode, NumberOfPlayers };
