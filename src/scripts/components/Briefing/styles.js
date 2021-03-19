import styled, { css } from 'styled-components';
import coreColors from '../../common/coreColors';
import { sideBorder } from '../../common/borders';

const layout = css`
  left: 0;
  margin: 0 auto;
  max-width: 720px;
  right: 0;
`;

export const BriefingContainer = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
  width: 100%;
`;

export const BriefingWrapper = styled.div`
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const BriefingScrollable = styled.div`
  height: 100%;
  overflow: scroll;
  padding: 20px 0 0;

  &::after {
    content: '';
    display: block;
    height: 150px;
    position: relative;
  }
`;

export const BriefingFixedFooter = styled.div`
  background-color: ${coreColors.greysuperdark};
  bottom: 0;
  position: absolute;
  width: 100%;
  z-index: 98;

  .core-form {
    ${layout};
    align-items: end;
    display: grid;
    gap: 20px;
    grid-template-columns: ${({ grid }) => grid};
    position: relative;
  }

  .core-button {
    min-height: 50px;
  }

  .field,
  input {
    margin: 0;
  }

  &::after {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(26, 27, 32, 1) 100%
    );
    content: '';
    display: block;
    height: 30px;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: -30px;
    width: 100%;
    z-index: 1;
  }

  .tip {
    bottom: 0;
    left: 0;
    position: absolute;
    text-align: left;
    transform: translateY(100%);
  }
`;

export const BriefingControls = styled.div`
  ${layout}
  ${sideBorder('top', coreColors.greydarkest)};
  display: flex;
  justify-content: space-between;
  margin-top: ${({ tipSpace }) => (tipSpace ? '40px' : '20px')};
  padding: 20px 0 5px;

  @media (max-width: 600px) {
    padding: 10px 0 0;
  }

  .core-link svg {
    height: 18px;
    width: 18px;

    & > path {
      fill: currentColor !important;
    }
  }

  .core-link:nth-of-type(2) {
    align-self: center;
  }
`;

export const BriefingInfo = styled.div`
  ${layout};
  padding: 0 0 20px 0;

  .points {
    color: ${coreColors.greenprime};

    .strike {
      color: ${coreColors.greyprime};
      text-decoration: line-through;
    }
  }

  .penalty {
    color: ${coreColors.yellowprime};
  }
`;

export const BriefingMultipleChoice = styled.form`
  ${layout};
  margin-top: 40px;
`;

export const BriefingContent = styled.div`
  ${layout};
  margin-bottom: 30px;
`;

export const BriefingSection = styled.div`
  ${layout}

  // Hints
  .hints {
    margin: 50px 0 20px;
    position: relative;

    & > .core-link {
      position: absolute;
      right: 0;
      top: 20px;
    }

    .reveal {
      margin: 30px 0;
    }

    .hint {
      padding-top: 15px;
    }

    .hint-header {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;

      .core-text {
        margin: 0;
      }
    }

    .hint-body {
      margin-bottom: 15px;
    }

    .hint-header--hidden {
      .core-heading {
        color: ${coreColors.greyprime};
      }
    }
  }
`;

export const BriefingContentGroup = styled.div`
  background: ${coreColors.greyuberdark};
  border-radius: 5px;
  margin: 10px 0 20px;
  padding: 20px;
  text-align: left;

  & > :last-child {
    margin-bottom: 0;
  }
`;
