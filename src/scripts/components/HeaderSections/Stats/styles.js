import styled from 'styled-components';
import CoreColors from '../../../common/coreColors';

const Wrapper = styled.div`
  display: flex;
`;

const Stat = styled.div`
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }

  && {
    h5 {
      color: ${CoreColors.greylight};
      font-size: 14px;
      margin: 0;
      text-transform: none;
    }

    p {
      color: #fff;
      margin: 0;
    }
  }
`;

export { Wrapper, Stat };
