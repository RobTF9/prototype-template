import * as React from 'react';
import styled from 'styled-components';
import CoreColors from '../../common/coreColors';

const Path = styled.path`
  fill: ${CoreColors.greydarkest};
`;

function SortDesc() {
  return (
    <svg width={7} height={4} viewBox="0 0 7 4" fill="none">
      <Path d="M3.5 4L.469.25H6.53L3.5 4z" />
    </svg>
  );
}

export default SortDesc;
