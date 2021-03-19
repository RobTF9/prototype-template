import styled from 'styled-components';
import CoreColors from '../../../common/coreColors';

const Wrapper = styled.div`
  padding: 10px;

  @media (min-width: 960px) {
    padding: 10px 20px;
  }
`;

const HeaderText = styled.div`
  margin-bottom: 30px;

  h3.core-heading {
    margin-bottom: 15px;

    span {
      color: ${CoreColors.blueprime};
    }

    @media (min-width: 960px) {
      font-size: 24px;
    }
  }
`;

const Stats = styled.div`
  display: flex;
  margin: 0 5px 60px;
  position: relative;

  & > div {
    margin: 0 5px;
    width: 100%;

    @media (min-width: 705px) {
      height: 215px;
      margin: 0 20px 0 0;
      width: 215px;
    }
  }

  @media (min-width: 705px) {
    margin-bottom: 78px;
  }
`;

const ProgressCircleContent = styled.div`
  p {
    margin: 0;
    text-align: center;
    white-space: nowrap;
  }

  .mobile {
    @media (min-width: 705px) {
      display: none;
    }
  }

  .desktop {
    @media (max-width: 704px) {
      display: none;
    }
  }
`;

const Feat = styled.p`
  && {
    color: ${({ color }) => color || 'white'};
    margin-bottom: 5px;

    @media (min-width: 705px) {
      font-size: 24px;
      margin-bottom: 0;
    }
  }
`;

export { Wrapper, HeaderText, Stats, ProgressCircleContent, Feat };
