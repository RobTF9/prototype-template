import Select from 'react-select';
import styled from 'styled-components';
import CoreColors from '../../common/coreColors';
import { fullBorder, borderWidth } from '../../common/borders';

const InlineSelect = styled(Select)`
  .select--timezone__control {
    background-color: transparent;
    border: ${borderWidth}px solid transparent;
    border-radius: 0;
    box-shadow: none;
    margin-left: -7px;
    padding: 0 7px;

    &:hover {
      border: ${borderWidth}px solid ${CoreColors.bluedarkest} !important;
    }
  }

  .select--timezone__value-container {
    padding: 0;
  }

  .select--timezone__input {
    color: ${CoreColors.primarywhite};
  }

  .select--timezone__placeholder {
    color: ${CoreColors.primarywhite};
    margin-left: 0;
    margin-right: 0;
  }

  .select--timezone__single-value {
    color: ${CoreColors.primarywhite};
    margin-left: 0;
    margin-right: 0;

    &--is-disabled {
      color: ${CoreColors.greyprime};
    }
  }

  .select--timezone__indicators {
    display: none;
  }

  .select--timezone__menu {
    background-color: ${CoreColors.greysuperdark};
    border-radius: 0 !important;
    box-shadow: none;
    position: relative;
    ${fullBorder(CoreColors.greydarkest)}
  }

  .select--timezone__option {
    background-color: transparent;
    color: ${CoreColors.primarywhite};
  }

  .select--timezone__option:hover,
  .select--timezone__option--is-focused {
    background-color: ${CoreColors.blueprime};
    color: ${CoreColors.greysuperdark};
  }
`;

export { InlineSelect };
