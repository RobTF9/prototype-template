import styled from 'styled-components';
import Div100vh from 'react-div-100vh';
import { sideBorder } from '../../common/borders';
import CoreColors from '../../common/coreColors';

const Wrapper = styled(Div100vh)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Heading = styled.h1`
  margin: 0;
`;

const Main = styled.main`
  flex: 1 0 auto;
  height: calc(100% - 140px);
  position: relative;

  @media (min-width: 600px) {
    height: calc(100% - 110px);
  }
`;

const Scroller = styled.div`
  height: 100%;
  overflow: scroll;

  &::before {
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(26, 27, 32, 1) 100%
    );
    bottom: 0;
    content: '';
    display: block;
    height: 100%;
    margin: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    z-index: 1;
  }
`;

const Content = styled.div`
  display: flex;
  min-height: 100%;
`;

const Categories = styled.div`
  height: 100%;
  width: 100%;
`;

const Section = styled.div`
  align-items: center;
  display: grid;
  gap: 20px;
  grid-template-columns: 190px 1fr 1fr 1fr;
  padding: 20px 10px;
  ${sideBorder('bottom', CoreColors.greydarkest)};

  && * {
    margin: 0;
  }

  @media (min-width: 600px) {
    padding: 20px;
  }
`;

const TopSection = styled(Section)`
  background: ${CoreColors.greysuperdark};
  position: sticky;
  top: 0;
`;

const Totals = styled(Section)`
  background: ${CoreColors.greysuperdark};
  border-bottom: none;
  bottom: 0;
  position: sticky;
  ${sideBorder('top', CoreColors.greydarkest)};
`;

const Group = styled.div`
  display: flex;
  flex: 0 0 480px;
  flex-direction: column;
  justify-content: space-between;
  ${sideBorder('right', CoreColors.greydarkest)};

  &:last-child {
    ${Section} {
      padding-right: 60px;
    }

    ${Totals} {
      padding-right: 60px;
    }
  }
`;

const ColHeading = styled.div`
  && {
    color: ${CoreColors.greyprime};
  }
`;

export {
  Wrapper,
  Heading,
  Main,
  Scroller,
  Content,
  Categories,
  Section,
  TopSection,
  Totals,
  Group,
  ColHeading,
};
