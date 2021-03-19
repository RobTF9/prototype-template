import * as React from 'react';
import styled from 'styled-components';
import CoreColors from '../../common/coreColors';

const Path = styled.path`
  fill: ${CoreColors.greydarkest};
`;

function SortArrows() {
  return (
    <svg width={7} height={10} viewBox="0 0 7 10" fill="none">
      <Path d="M3.5 10L.469 6.25H6.53L3.5 10zM3.5 0l3.031 3.75H.47L3.5 0z" />
    </svg>
  );
}

export default SortArrows;
