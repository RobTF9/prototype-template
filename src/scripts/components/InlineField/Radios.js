/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Selected, RadioButtons, Warning } from './styles';

const transition = {
  type: 'spring',
  damping: 300,
  stiffness: 550,
};

const opacityVariants = {
  visible: { opacity: 1, height: 'auto' },
  hidden: { opacity: 0, height: 0 },
};

function Radios({
  name,
  open,
  setOpen,
  status,
  options,
  value,
  setValue,
  disabled,
  handleChange = ({ target: { value: inputValue } }) => {
    setValue(inputValue);
  },
  warning,
  selectedOptionWarning,
}) {
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
          selectedOptionWarning,
        }}
      >
        {options.find(option => option.value === value).label}
      </Selected>
      <RadioButtons
        {...{
          initial: 'hidden',
          animate: open ? 'visible' : 'hidden',
          variants: opacityVariants,
          transition,
          key: 'radios',
        }}
      >
        {options.map(({ value: optionValue, label, id }) => (
          <div className="radio" key={id}>
            <input
              className="radio-input"
              type="radio"
              name={name}
              id={id}
              value={optionValue}
              checked={value === optionValue}
              disabled={disabled || status === 'LOADING'}
              onChange={e => handleChange(e)}
            />
            <label className="radio-label" htmlFor={id}>
              {label}
            </label>
          </div>
        ))}
      </RadioButtons>
      {open && warning && (
        <Warning className="tip tip--danger">{warning}</Warning>
      )}
    </>
  );
}

Radios.propTypes = {
  name: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  status: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  warning: PropTypes.string,
  selectedOptionWarning: PropTypes.bool,
};

export default Radios;
