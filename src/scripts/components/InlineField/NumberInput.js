import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledNumberInput, ClearButton } from './styles';
import CoreColors from '../../common/coreColors';
import { borderWidth } from '../../common/borders';
import { keycodes } from '../../common/enums';

export default function NumberInput({
  open,
  setOpen,
  status,
  register,
  originalData,
  name,
  submit,
  disabled,
  customValidators,
  onClear,
}) {
  const inputRef = useRef();

  useEffect(() => {
    if (open) {
      inputRef.current.select();
    }
  }, [open]);

  const transition = {
    type: 'spring',
    damping: 300,
    stiffness: 550,
  };

  function handleKeydown(e) {
    const { keyCode, target } = e;

    if (keyCode === keycodes.ESCAPE) {
      target.blur();
    }

    if (keyCode === keycodes.ENTER) {
      target.blur();

      submit();
    }
  }

  return (
    <>
      <StyledNumberInput
        {...{
          id: `${name}-input`,
          type: 'text',
          name,
          onFocus: () => {
            if (!disabled) {
              setOpen(true);
            }
          },
          onKeyDown: e => handleKeydown(e),
          initial: { border: `${borderWidth}px solid rgba(0,0,0,0)` },
          animate: {
            border: open
              ? `${borderWidth}px solid ${CoreColors.bluedarkest}`
              : `${borderWidth}px solid rgba(0,0,0,0)`,
          },
          transition,
          disabled: disabled || status === 'LOADING',
          ref: e => {
            register(e, {
              pattern: {
                value: /^[0-9]*$/,
                message: 'This input is number only.',
              },
              validate: customValidators,
            });
            inputRef.current = e;
          },
          defaultValue: originalData,
          inputMode: 'numeric',
          pattern: '[0-9]*',
          placeholder: '-',
        }}
      />
      {open && <ClearButton onClick={() => onClear()} />}
    </>
  );
}

NumberInput.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  status: PropTypes.string,
  register: PropTypes.func,
  originalData: PropTypes.number,
  name: PropTypes.string,
  submit: PropTypes.func,
  disabled: PropTypes.bool,
  customValidators: PropTypes.object,
  onClear: PropTypes.func,
};
