import styled from 'styled-components';
import { sideBorder } from '../../../common/borders';
import CoreColors from '../../../common/coreColors';

const Wrapper = styled.div`
  padding-top: 10px;
`;

const FilesWrapper = styled.div`
  ${sideBorder('top', CoreColors.greydarkest)}
  margin-top: 30px;
`;

const FileWrapper = styled.div`
  align-items: flex-start;
  ${sideBorder('bottom', CoreColors.greydarkest)}
  display: flex;
  flex-direction: column;
  padding: 20px 0;

  @media (min-width: 1280px) {
    padding: 30px 0;
  }
`;

const Filename = styled.p`
  && {
    color: ${CoreColors.greylightest};
    margin-bottom: 0;
  }
`;

const Tip = styled.p`
  margin: 5px 0 0;

  @media (min-width: 1280px) {
    margin: 10px 0 0;
  }
`;

const Link = styled.a`
  align-self: flex-end;
  margin-top: 10px;

  @media (min-width: 1280px) {
    align-self: flex-start;
  }
`;

export { Wrapper, FilesWrapper, FileWrapper, Filename, Tip, Link };
