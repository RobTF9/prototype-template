import styled, { css } from 'styled-components';
import { sideBorder } from '../../common/borders';
import CoreColors from '../../common/coreColors';

const Wrapper = styled.div`
  /* General table styles */
  background: ${CoreColors.greysuperdark};
  display: block;
  height: 100%;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: scroll;

  table {
    margin-bottom: 40px;
    width: 100%;
  }

  tr,
  .tr {
    ${sideBorder('bottom', CoreColors.greydarkest)}
    height: 50px;
    padding-right: 40px;
  }

  th,
  td {
    padding: 0 20px;
    white-space: nowrap;
    width: 1px;
  }

  th,
  .th {
    color: ${CoreColors.greyprime};
    text-align: left;

    svg {
      margin-right: 5px;
    }
  }

  td,
  .td {
    color: ${CoreColors.greylightest};
  }

  th:last-child,
  td:last-child {
    padding-right: 40px;
    width: 100%;
  }

  tbody,
  .tbody {
    tr:last-child,
    .tr:last-child {
      border-bottom: none;
    }
  }

  /* Styles specific for virtualised list table */
  ${({ virtualisedList }) =>
    virtualisedList &&
    css`
      overflow-y: hidden;
    `}

  .table {
    display: inline-block;
    height: 100%;
  }

  .th,
  .td {
    align-items: center;
    display: flex;
    padding: 0 20px;
  }

  .td {
    overflow: scroll;
    -ms-overflow-style: none; /* IE 10+ */
    scrollbar-width: none; /* Firefox */
    white-space: nowrap;

    &::-webkit-scrollbar {
      background: transparent; /* Chrome/Safari/Webkit */
      height: 0;
      width: 0;
    }
  }

  /* Fixes for virtualised list autosizer */
  div[role='rowgroup'] {
    height: calc(100% - 50px);

    & > div {
      width: auto !important;
    }

    & > div > div {
      min-width: 100%;
    }
  }
`;

export { Wrapper };
