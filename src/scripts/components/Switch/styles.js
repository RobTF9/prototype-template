import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { borderWidth, fullBorder } from '../../common/borders';
import CoreColors from '../../common/coreColors';
import { visuallyHidden } from '../../common/styleMixins';

const Wrapper = styled.div`
  max-width: 300px;
  width: 100%;

  label {
    display: flex;
    justify-content: space-between;
  }

  label > span {
    cursor: pointer;
  }

  input[type='checkbox'] {
    ${visuallyHidden()}
  }

  input[type='checkbox']:focus + span,
  label > span:hover {
    color: ${CoreColors.blueprime};
  }

  input[type='checkbox']:disabled + span {
    cursor: default;
  }

  input[type='checkbox']:disabled + span:hover {
    color: ${CoreColors.primarywhite};
  }
`;

const Toggle = styled(motion.div)`
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex: 0 0 46px;
  height: 20px;
  justify-content: flex-start;
  margin: 2px 0 0 35px;
  padding: 5px;
  position: relative;
  width: 46px;

  ${({ disabled }) =>
    disabled &&
    css`
      border: ${borderWidth}px solid ${CoreColors.greyprime} !important;
      cursor: default;
    `}
`;

const StatusWrapper = styled.div`
  left: -28px;
  position: absolute;
  width: 20px;

  div {
    margin: 0;
    width: 20px;
  }

  img {
    margin: 0;
  }
`;

const Circle = styled(motion.div)`
  border-radius: 6px;
  height: 12px;
  position: absolute;
  width: 12px;
`;

const Text = styled(motion.span)`
  font-size: 12px;
  position: absolute;
  text-transform: uppercase;

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${CoreColors.greyprime};
    `}
`;

export { Wrapper, Toggle, StatusWrapper, Circle, Text };
