import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;

  @media (min-width: 600px) {
    padding: 40px;
  }

  && {
    .core-heading {
      margin-bottom: 25px;
    }

    .radio-label {
      top: -25px;
    }

    .input-textarea,
    .preview {
      height: 500px;
      overflow: scroll;
    }
  }

  .actions-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: end;
    position: relative;

    @media (min-width: 600px) {
      flex-direction: row;
    }
  }

  .unsaved {
    margin: 10px 0 0 0;
    text-align: right;

    @media (min-width: 600px) {
      bottom: 0;
      left: 0;
      margin: 0;
      position: absolute;
    }
  }

  .actions {
    display: flex;
    padding-top: 10px;

    button,
    input[type='submit'] {
      border-radius: 3px;
      margin: 0 0 0 10px;
      white-space: nowrap;

      &.core-button.core-button--smallest {
        padding: 4px 21px 5px;
      }
    }

    @media (min-width: 600px) {
      padding-top: 25px;
    }
  }
`;

export { Wrapper };
