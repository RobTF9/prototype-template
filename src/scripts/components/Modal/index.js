import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Overlay, Wrapper, Header } from './styles';
import { keycodes } from '../../common/enums';

const overlayVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const modalVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: '30px' },
};

export default function Modal({ children, open, setOpen, headerType, portal }) {
  const modalRef = useRef();
  const transition = {
    type: 'spring',
    damping: 300,
    stiffness: 550,
  };

  function handleOverlayClick({ target }) {
    if (!modalRef.current || modalRef.current.contains(target)) {
      return;
    }

    setOpen(false);
  }

  function handleKeydown({ keyCode }) {
    if (keyCode === keycodes.ESCAPE) {
      setOpen(false);
    }
  }

  const modalMarkup = (
    <AnimatePresence initial={false}>
      {open && (
        <Overlay
          {...{
            onClick: e => handleOverlayClick(e),
            tabIndex: '-1',
            initial: 'closed',
            animate: 'open',
            exit: 'closed',
            variants: overlayVariants,
            transition,
            key: 'modal-overlay',
          }}
        >
          <Wrapper
            {...{
              ref: modalRef,
              onKeyDown: e => handleKeydown(e),
              tabIndex: '-1',
              initial: 'closed',
              animate: 'open',
              exit: 'closed',
              variants: modalVariants,
              transition,
              'aria-modal': 'true',
              key: 'modal',
            }}
          >
            <FocusLock returnFocus>
              {headerType && (
                <Header {...{ headerType }}>
                  {headerType === 'basic' ? (
                    <button
                      className="core-link core-link--danger"
                      type="button"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <>
                      <button type="button" className="core-link">
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="core-link core-link--quiet"
                      >
                        Close
                      </button>
                      <button type="button" className="core-link">
                        Next
                      </button>
                    </>
                  )}
                </Header>
              )}

              {children}
            </FocusLock>
          </Wrapper>
        </Overlay>
      )}
    </AnimatePresence>
  );

  if (portal) {
    return createPortal(modalMarkup, document.getElementById(portal));
  }

  return modalMarkup;
}

Modal.propTypes = {
  children: PropTypes.any,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  headerType: PropTypes.string,
  portal: PropTypes.string,
};
