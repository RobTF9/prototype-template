/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import getStartFormatString from '../../common/getStartFormatString';
import { DatePickerWrapper, Selected, Time } from './styles';

const transition = {
  type: 'spring',
  damping: 300,
  stiffness: 550,
};

const opacityVariants = {
  visible: { opacity: 1, height: 'auto' },
  hidden: { opacity: 0, height: 0, overflow: 'hidden' },
};

function Dates({
  open,
  setOpen,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  disabled,
}) {
  const onChange = dates => {
    const [start, end] = dates;

    setStartDate(current => {
      if (current === null) {
        start.setHours(9);
      }
      return start;
    });

    setEndDate(current => {
      if (current === null && end) {
        end.setHours(17);
      }
      return end;
    });
  };

  const getDateString = () => {
    if (startDate === null && endDate === null) {
      return 'Set event dates';
    }

    return `${
      startDate !== null
        ? format(startDate, getStartFormatString(startDate, endDate))
        : ''
    } - ${
      endDate !== null
        ? format(endDate, 'HH:mm do LLL yyyy')
        : 'Select end Date'
    }`;
  };

  return (
    <>
      <Selected
        {...{
          initial: 'visible',
          animate: open ? 'hidden' : 'visible',
          variants: opacityVariants,
          transition,
          onClick: () => {
            if (!disabled) {
              setOpen(true);
            }
          },
          onFocus: () => {
            if (!disabled) {
              setOpen(true);
            }
          },
          tabIndex: disabled ? '-1' : '0',
          open,
          disabled,
        }}
      >
        {getDateString()}
      </Selected>
      <DatePickerWrapper
        {...{
          initial: 'hidden',
          animate: open ? 'visible' : 'hidden',
          variants: opacityVariants,
          transition,
        }}
      >
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          shouldCloseOnSelect={false}
          inline={!disabled}
          disabled={disabled}
          disabledKeyboardNavigation={disabled}
        />
        <Time>
          <label className="core-text core-text--tertiary">
            Start time{' '}
            {startDate ? `on ${format(startDate, 'dd/MM/yyyy')}` : ''}
          </label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            dateFormat="HH:mm"
            popperPlacement="top"
            placeholderText="--:--"
            disabled={disabled}
            disabledKeyboardNavigation={disabled}
          />
        </Time>
        <Time>
          <label className="core-text core-text--tertiary">
            Finish time {endDate ? `on ${format(endDate, 'dd/MM/yyyy')}` : ''}
          </label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            dateFormat="HH:mm"
            popperPlacement="top"
            placeholderText="--:--"
            disabled={disabled}
            disabledKeyboardNavigation={disabled}
          />
        </Time>
      </DatePickerWrapper>
    </>
  );
}

Dates.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  setStartDate: PropTypes.func,
  setEndDate: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Dates;
