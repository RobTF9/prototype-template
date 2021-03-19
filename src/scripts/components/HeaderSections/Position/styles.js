import styled from 'styled-components';
import coreColors from '../../../common/coreColors';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  min-width: 250px;

  p {
    margin-bottom: 0;
  }

  p:last-of-type {
    color: ${coreColors.blueprime};
  }
`;

export { Wrapper };
