/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import { Status } from '../../InlineField';
import { Wrapper, LabelWrapper, NetworkError } from '../../InlineField/styles';

const transition = {
  type: 'spring',
  damping: 300,
  stiffness: 550,
};

function Field({
  label,
  status,
  showStatus = true,
  formWrap = 'nowrap',
  children,
}) {
  return (
    <AnimatePresence>
      <Wrapper {...{ className: 'core-form', label, formWrap }}>
        {!!label && showStatus && (
          <LabelWrapper>
            <label className="label">{label}</label>
            <Status {...{ status }} />
          </LabelWrapper>
        )}
        {children}
        {label === undefined && showStatus && <Status {...{ status }} />}
      </Wrapper>
      <NetworkError
        {...{
          className: 'core-text core-text--quaternary core-text--danger',
          initial: { opacity: 0, height: 0 },
          animate: {
            opacity: status === 'ERROR' ? 1 : 0,
            height: status === 'ERROR' ? 'auto' : 0,
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

Field.propTypes = {
  label: PropTypes.string,
  status: PropTypes.string,
  showStatus: PropTypes.bool,
  formWrap: PropTypes.string,
  children: PropTypes.any,
};

export default Field;
