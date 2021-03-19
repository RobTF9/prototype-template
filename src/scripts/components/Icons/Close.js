import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CoreColors from '../../common/coreColors';

const Svg = styled.svg`
  height: 15px;
  width: 15px;
`;

const Close = forwardRef(({ className, onClick }, ref) => (
  <Svg
    viewBox="0 0 8 8"
    fill="none"
    className={className}
    onClick={onClick}
    ref={ref}
  >
    <path
      d="M8 4a.828.828 0 00-.817-.817h-2.28V.903A.908.908 0 004 0a.908.908 0 00-.902.902v2.281H.817A.807.807 0 000 4c0 .443.357.817.817.817h2.28v2.28c0 .494.41.903.903.903a.908.908 0 00.902-.902V4.817h2.281A.828.828 0 008 4z"
      fill={CoreColors.blueprime}
    />
  </Svg>
));

Close.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Close.displayName = 'Close';

export default Close;
