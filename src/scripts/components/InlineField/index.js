import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import useOnClickOutside from '../../common/useOnClickOutside';
import { keycodes } from '../../common/enums';

import {
  Wrapper,
  Loading,
  Success,
  ValidationError,
  NetworkError,
  LabelWrapper,
} from './styles';
import Check from '../Icons/Check';

const transition = {
  type: 'spring',
  damping: 300,
  stiffness: 550,
};

const opacityVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export function Status({ status }) {
  return (
    <>
      {status === 'LOADING' && (
        <Loading
          {...{
            initial: 'hidden',
            animate: 'visible',
            exit: 'hidden',
            variants: opacityVariants,
            transition: { ...transition, delay: 0.6 },
            key: 'loading',
          }}
        >
          <img
            src="/assets/images/spinner.svg"
            alt="Loading Spinner"
            className="image"
          />
        </Loading>
      )}
      {status === 'SUCCESS' && (
        <Success
          {...{
            initial: 'hidden',
            animate: 'visible',
            exit: 'hidden',
            variants: opacityVariants,
            transition,
            key: 'success',
          }}
        >
          <Check />
        </Success>
      )}
    </>
  );
}

Status.propTypes = {
  status: PropTypes.string,
};

export default function InlineField({
  children,
  open,
  setOpen,
  setOriginalValue,
  status,
  submit,
  errors,
  name,
  label,
  actionVariants,
  validateMessageVariants = opacityVariants,
  clearError,
  noValidate,
  customValidationMessages,
  formAlign = 'start',
  formWrap = 'nowrap',
}) {
  const fieldRef = useRef();

  function cancel() {
    setOriginalValue();
    setOpen(false);
  }

  function handleKeydown(e) {
    const { keyCode } = e;

    if (keyCode === keycodes.ESCAPE) {
      cancel();
    }
  }

  useOnClickOutside(fieldRef, () => {
    if (open) {
      cancel();
    }
  });

  useEffect(() => {
    const input = document.getElementById(`${name}-input`);
    if (input) {
      input.scrollLeft = 0;
    }
  }, [name, open]);

  useEffect(() => {
    if (!open && clearError) {
      clearError(name);
    }
  }, [clearError, name, open]);

  return (
    <AnimatePresence>
      <Wrapper
        {...{
          className: 'core-form',
          ref: fieldRef,
          onSubmit: submit,
          onKeyDown: e => handleKeydown(e),
          label,
          name,
          noValidate,
          formAlign,
          formWrap,
        }}
      >
        {!!label && (
          <LabelWrapper>
            {label}
            <Status {...{ status }} />
          </LabelWrapper>
        )}
        {children}
        <AnimatePresence>
          {open && errors[name] && (
            <ValidationError
              {...{
                className: 'core-text core-text--quaternary core-text--danger',
                initial: 'hidden',
                animate: 'visible',
                exit: 'hidden',
                variants: validateMessageVariants,
                transition,
                key: 'validationError',
                absolute: name === 'title',
              }}
            >
              {errors[name].message ||
                customValidationMessages[errors[name].type]}
            </ValidationError>
          )}
          {open && (
            <motion.div
              {...{
                className: 'actions',
                initial: 'hidden',
                animate: 'visible',
                exit: 'hidden',
                variants: actionVariants,
                transition,
                key: 'actions',
              }}
            >
              <input
                type="submit"
                className="core-button core-button--primary core-button--smallest"
                value="Save"
              />
              <button
                type="button"
                className="core-button core-button--quiet core-button--smallest"
                onClick={() => cancel()}
              >
                Cancel
              </button>
            </motion.div>
          )}
          {label === undefined && <Status {...{ status }} />}
        </AnimatePresence>
      </Wrapper>
      <NetworkError
        {...{
          className: 'core-text core-text--quaternary core-text--danger',
          initial: { opacity: 0, height: 0 },
          animate: {
            opacity: !open && status === 'ERROR' ? 1 : 0,
            height: !open && status === 'ERROR' ? 'auto' : 0,
          },

          transition,
          key: 'networkError',
          tabIndex: '-1',
        }}
      >
        Something went wrong, please try again
      </NetworkError>
    </AnimatePresence>
  );
}

InlineField.propTypes = {
  children: PropTypes.any,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setOriginalValue: PropTypes.func,
  status: PropTypes.string,
  submit: PropTypes.func,
  errors: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.object,
  actionVariants: PropTypes.object,
  validateMessageVariants: PropTypes.object,
  clearError: PropTypes.func,
  noValidate: PropTypes.bool,
  customValidationMessages: PropTypes.object,
  formAlign: PropTypes.string,
  formWrap: PropTypes.string,
};
