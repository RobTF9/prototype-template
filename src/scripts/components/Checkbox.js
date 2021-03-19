/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

function Checkbox({ id, name, value, label, checked, handleChange, disabled }) {
  return (
    <div className="checkbox">
      <input
        {...{
          type: 'checkbox',
          className: 'checkbox-input',
          id,
          name,
          value,
          checked,
          onChange: handleChange,
          disabled,
        }}
      />
      <label className="checkbox-label checkbox-label--large" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
  checked: PropTypes.bool,
  handleChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Checkbox;
