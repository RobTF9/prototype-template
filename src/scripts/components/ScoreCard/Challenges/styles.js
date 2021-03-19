import styled from 'styled-components';
import CoreColors from '../../../common/coreColors';

const GroupHeader = styled.h4`
  && {
    color: ${CoreColors.greylightest};
  }
`;

const Cards = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-bottom: 50px;

  @media (min-width: 600px) {
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

export { GroupHeader, Cards };
