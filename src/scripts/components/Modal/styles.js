import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import CoreColors from '../../common/coreColors';
import { fullBorder } from '../../common/borders';

const Overlay = styled(motion.div)`
  align-items: center;
  background: rgba(26, 27, 32, 0.9);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 200;
`;

const Wrapper = styled(motion.div)`
  background: ${CoreColors.greysuperdark};
  ${fullBorder(CoreColors.greydarkest)};
  box-shadow: 0 0 60px rgba(13, 14, 16, 0.5);
  margin: 0 20px;
  max-width: 600px;
  width: 100%;
`;

const Header = styled.div`
  padding: 20px;

  button {
    ${fullBorder('transparent')};
  }

  ${({ headerType }) =>
    headerType === 'withPaginationLinks' &&
    css`
      align-items: center;
      display: flex;
      justify-content: space-between;
    `}
`;

export { Overlay, Wrapper, Header };
