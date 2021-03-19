import React, { useRef, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { TitleInput, AutoScaler } from './styles';
import CoreColors from '../../common/coreColors';
import { borderWidth } from '../../common/borders';
import { keycodes } from '../../common/enums';

export default function Title({
  open,
  setOpen,
  status,
  register,
  watch,
  originalData,
  name,
  submit,
  disabled,
}) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const scalerRef = useRef();
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

  useEffect(() => {
    if (scalerRef.current) {
      forceUpdate();
    }
  }, [scalerRef]);

  return (
    <>
      <AutoScaler ref={scalerRef}>{watch('title')}</AutoScaler>
      <TitleInput
        {...{
          id: `${name}-input`,
          type: 'text',
          name,
          className: 'core-heading core-heading--quaternary',
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
          maxLength: 100,
          style: {
            width: scalerRef.current
              ? `${scalerRef.current.offsetWidth + 15}px`
              : 'auto',
          },
          ref: register({
            required: 'Field cannot be empty',
          }),
          defaultValue: originalData,
          breakpoint: 960,
        }}
      />
    </>
  );
}

Title.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  status: PropTypes.string,
  register: PropTypes.func,
  watch: PropTypes.func,
  originalData: PropTypes.string,
  name: PropTypes.string,
  submit: PropTypes.func,
  disabled: PropTypes.bool,
};
