import styled from 'styled-components';
import { motion } from 'framer-motion';
import CoreColors from '../../../../common/coreColors';
import Close from '../../../Icons/Close';

const Toggle = styled(motion.custom(Close))`
  cursor: pointer;
  height: 8px;
  position: absolute;
  right: 0;
  top: 6px;
  width: 8px;
`;

const Wrapper = styled.div`
  margin-bottom: 30px;
  position: relative;

  .you {
    color: ${CoreColors.blueprime};
  }
`;

const Pos = styled.p`
  && {
    color: white;
    margin-bottom: 7px;

    .position {
      color: ${CoreColors.yellowprime};
    }
  }
`;

const Percent = styled.p`
  && {
    margin-bottom: 11px;
  }
`;

const Team = styled(motion.div)`
  overflow: hidden;

  p {
    margin-bottom: 10px;
  }

  p:first-child {
    margin-top: 10px;
  }

  p:last-child {
    margin-bottom: 20px;
  }

  span {
    color: white;
  }
`;

const PosLoading = styled.div`
  display: inline-block;
  height: 19px;
  margin-bottom: 4px;
  margin-right: 10px;
  width: 20px;
`;

const NameLoading = styled.div`
  display: inline-block;
  height: 19px;
  margin-bottom: 4px;
  width: 100px;
`;

const PercentLoading = styled.div`
  height: 19px;
  margin-bottom: 11px;
  width: 100px;
`;

const BarLoading = styled.div`
  height: 2px;
  width: 100%;
`;

export {
  Toggle,
  Wrapper,
  Pos,
  Percent,
  Team,
  PosLoading,
  NameLoading,
  PercentLoading,
  BarLoading,
};
