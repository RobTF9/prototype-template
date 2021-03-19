import styled, { css } from 'styled-components';
import CoreColors from '../../common/coreColors';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const PageLink = styled.a`
  align-items: center;
  border-bottom: none;
  display: flex;
  font-size: 15px;
  justify-content: center;
  line-height: 15px;
  margin: 0 10px;

  ${({ selected }) =>
    selected &&
    css`
      background: ${CoreColors.greyprime};
      border-radius: 5px;
      color: ${CoreColors.greysuperdark};
      margin: 0 5px;
      padding: 2px 5px;

      &:hover {
        border-bottom: none;
        color: ${CoreColors.greysuperdark};
      }
    `};
`;

const Spacer = styled.div`
  align-items: center;
  color: ${CoreColors.greyprime};
  display: flex;
  font-size: 15px;
  justify-content: center;
  margin: 0 10px;
`;

export { Wrapper, PageLink, Spacer };
