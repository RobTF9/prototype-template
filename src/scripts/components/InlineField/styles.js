import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import datepickerStyles from './datepickerStyles';
import CoreColors from '../../common/coreColors';
import { borderWidth } from '../../common/borders';
import Close from '../Icons/Close';

const Wrapper = styled(motion.form)`
  align-items: ${({ formAlign }) => formAlign};
  display: ${({ label }) => (label === undefined ? 'flex' : 'block')};
  flex-wrap: ${({ formWrap }) => formWrap};
  min-width: 0%;
  position: relative;
  width: 100%;

  .actions {
    align-items: center;
    display: flex;
    padding: 0;

    button,
    input[type='submit'] {
      border-radius: 3px;
      margin: 0 0 0 10px;
      white-space: nowrap;

      &.core-button.core-button--smallest {
        padding: 4px 21px 5px;
      }
    }

    ${({ name }) =>
      name !== 'title' &&
      css`
        input[type='submit'] {
          margin: 0;
        }
      `}
  }
`;

const TitleInput = styled(motion.input)`
  background: none;
  color: ${CoreColors.primarywhite};
  height: 32px;
  min-width: 130px;
  padding: 0 4px;
  text-transform: uppercase;

  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    padding: 0 9px;
  }

  &.core-heading.core-heading--quaternary {
    font-size: 16px;
    margin: 0 0 0 -5px;

    @media (min-width: ${({ breakpoint }) => breakpoint}px) {
      margin: 0 0 0 -11px;
    }
  }

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        border: ${borderWidth}px solid ${CoreColors.bluedarkest} !important;
      }
    `}

  &:focus {
    outline: none;
  }
`;

const AutoScaler = styled.div`
  border: ${borderWidth}px solid white;
  font-weight: 800;
  height: 32px;
  margin-left: -11px;
  max-width: 100%;
  min-width: 130px;
  overflow: hidden;
  padding: 0 9px;
  position: absolute;
  text-transform: uppercase;
  visibility: hidden;
`;

const Loading = styled(motion.div)`
  background: ${CoreColors.greysuperdark};
  flex: 0 0 30px;
  width: 30px;

  img {
    background: ${CoreColors.greysuperdark};
    height: 20px;
    margin: 0 10px;
    width: 20px;
  }
`;

const Success = styled(motion.div)`
  align-items: center;
  background: ${CoreColors.greenprime};
  border-radius: 10px;
  display: flex;
  flex: 0 0 20px;
  height: 20px;
  justify-content: center;
  margin: 0 10px;
  width: 20px;

  svg {
    height: 16px;
    width: 16px;
  }
`;

const ValidationError = styled(motion.p)`
  ${({ absolute }) =>
    absolute &&
    css`
      background: ${CoreColors.greysuperdark};
      left: -5px;
      position: absolute;
      top: 30px;
    `};

  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    left: -11px;
  }
`;

const NetworkError = styled(motion.p)`
  flex: 0 1 100%;
  margin: 0;
  overflow: scroll;
`;

const LabelWrapper = styled.div`
  align-items: center;
  display: flex;

  .label {
    padding: 0;
  }
`;

const Selected = styled(motion.div)`
  border: ${borderWidth}px solid transparent;
  margin-left: -7px;
  outline: none;
  overflow: hidden;
  padding: 2px 5px;
  width: 100%;

  ${({ open, disabled }) =>
    !open &&
    !disabled &&
    css`
      &:hover {
        border: ${borderWidth}px solid ${CoreColors.bluedarkest} !important;
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${CoreColors.greyprime};
    `};

  ${({ selectedOptionWarning }) =>
    selectedOptionWarning &&
    css`
      color: ${CoreColors.yellowprime};
    `}
`;

const RadioButtons = styled(motion.div)`
  background: ${CoreColors.greysuperdark};
  overflow: hidden;
`;

const DatePickerWrapper = styled(motion.div)`
  // lib styles
  ${datepickerStyles}

  // overwrites
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker {
    background-color: ${CoreColors.greysuperdark};
    border: none;
    border-radius: 0;
    color: ${CoreColors.greylightest};
    max-width: 250px;
    width: 100%;
  }

  .react-datepicker__navigation {
    border: solid ${CoreColors.blueprime};
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    top: 14px;
  }

  .react-datepicker__navigation--next {
    transform: rotate(-45deg);
  }

  .react-datepicker__navigation--previous {
    transform: rotate(135deg);
  }

  .react-datepicker__header {
    background-color: ${CoreColors.greysuperdark};
    border-bottom: none;
  }

  .react-datepicker__current-month {
    color: ${CoreColors.primarywhite};
    margin-bottom: 12px;
  }

  .react-datepicker__day-name {
    color: ${CoreColors.greyprime};
    flex: 1 1 30px;
    font-size: 12px;
    font-weight: 700;
    line-height: 19px;
    margin: 0;
    text-transform: uppercase;
  }

  .react-datepicker__month-container {
    float: none;
  }

  .react-datepicker__month {
    margin: 0 0 7px;
  }

  .react-datepicker__day-names,
  .react-datepicker__week {
    display: flex;
  }

  .react-datepicker__day {
    color: ${CoreColors.greylightest};
    flex: 1 1 30px;
    line-height: 30px;
    margin: 0;

    &:hover {
      background-color: ${CoreColors.bluedark};
      border-radius: 0;
    }
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
    background-color: ${CoreColors.greylightest};
    border-radius: 0;
    color: ${CoreColors.greysuperdark};

    &:hover {
      background-color: ${CoreColors.bluedark};
      border-radius: 0;
    }
  }

  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    background-color: ${CoreColors.blueprime};
    border-radius: 0;
  }

  .react-datepicker__day--range-start {
    border-bottom-left-radius: 15px;
    border-top-left-radius: 15px;
  }

  .react-datepicker__day--range-end {
    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
  }

  .react-datepicker--time-only {
  }

  .react-datepicker__header--time {
    background-color: ${CoreColors.greyuberdark};
  }

  .react-datepicker-time__header {
    color: ${CoreColors.primarywhite};
  }

  .react-datepicker__time-container .react-datepicker__time {
    background-color: ${CoreColors.greyuberdark};
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item:hover {
    background-color: ${CoreColors.blueprime};
    color: ${CoreColors.greysuperdark};
  }
`;

const Time = styled.div`
  border-top: 1px solid #3f434e;
  display: block;
  padding: 15px 0;
  width: 100%;

  label {
    color: ${CoreColors.greyprime};
    display: block;
    margin: 0;
  }

  input {
    background: none;
    border: none;
    color: ${CoreColors.primarywhite};
    font-size: 16px;
    margin-top: 3px;
    width: 100%;
  }
`;

const Warning = styled.p`
  && {
    text-align: left;
  }
`;

const StyledNumberInput = styled(motion.input)`
  background: none;
  border: ${borderWidth}px solid transparent;
  color: ${CoreColors.primarywhite};
  height: 32px;
  margin-left: -7px;
  outline: none;
  overflow: hidden;
  padding: 2px 5px;
  width: 100%;

  /* Chrome/Opera/Safari */
  &::-webkit-input-placeholder {
    color: ${CoreColors.primarywhite};
  }

  /* Firefox 19+ */
  &::-moz-placeholder {
    color: ${CoreColors.primarywhite};
    opacity: 1;
  }

  /* IE 10+ */
  &:-ms-input-placeholder {
    color: ${CoreColors.primarywhite};
  }

  /* Firefox 18- */
  &:-moz-placeholder {
    color: ${CoreColors.primarywhite};
    opacity: 1;
  }

  ${({ open, disabled }) =>
    !open &&
    !disabled &&
    css`
      &:hover {
        border: ${borderWidth}px solid ${CoreColors.bluedarkest} !important;
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${CoreColors.greyprime};
    `}
`;

const ClearButton = styled(Close)`
  cursor: pointer;
  height: 12px;
  position: absolute;
  right: 14px;
  top: 28px;
  transform: rotate(45deg);
  width: 12px;
`;

export {
  Wrapper,
  TitleInput,
  AutoScaler,
  Loading,
  Success,
  ValidationError,
  NetworkError,
  LabelWrapper,
  Selected,
  RadioButtons,
  DatePickerWrapper,
  Time,
  Warning,
  StyledNumberInput,
  ClearButton,
};
