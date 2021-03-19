/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { InlineSelect } from './styles';
import CoreColors from '../../common/coreColors';

const TimezoneSelect = ({
  onMenuOpen,
  options,
  timezone,
  setTimezone,
  disabled,
  submit,
}) => {
  const formatGroupLabel = data => (
    <div style={{ color: CoreColors.blueprime }}>{data.label}</div>
  );

  return (
    <InlineSelect
      {...{
        onMenuOpen,
        options,
        value: timezone,
        classNamePrefix: 'select--timezone',
        formatGroupLabel,
        isDisabled: disabled,
        onChange: val => {
          setTimezone(val);
          submit(val);
        },
      }}
    />
  );
};

TimezoneSelect.propTypes = {
  onMenuOpen: PropTypes.func,
  options: PropTypes.array,
  timezone: PropTypes.object,
  setTimezone: PropTypes.func,
  disabled: PropTypes.bool,
  submit: PropTypes.func,
};

export default TimezoneSelect;
