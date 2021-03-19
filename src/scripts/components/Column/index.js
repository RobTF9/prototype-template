import React, { Fragment } from 'react';
import { AnimatePresence } from 'framer-motion';
import useScrollInfo from 'react-element-scroll-hook';
import PropTypes from 'prop-types';

import { Wrapper, Content, Header, Heading, Toggle } from './styles';

const Column = ({ title, open, columns, children, setColumns, index }) => {
  const [scrollInfo, setRef] = useScrollInfo();

  const variants = {
    open: { flexBasis: '290px' },
    closed: { flexBasis: '80px' },
  };

  const contentVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: 80 },
  };

  const transition = {
    type: 'spring',
    damping: 300,
    stiffness: 550,
  };

  return (
    <Wrapper
      {...{
        columns,
        variants,
        open,
        animate: open ? 'open' : 'closed',
        initial: 'open',
        transition,
        ref: setRef,
        className: scrollInfo.y.className,
      }}
    >
      <Header>
        <AnimatePresence initial={false}>
          {open ? (
            <Fragment key="openHeader">
              <Heading
                {...{
                  className: 'core-heading core-heading--quinary',
                  initial: { opacity: 1, x: 80 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: 80 },
                  transition,
                }}
              >
                {title}
              </Heading>
              <Toggle
                type="button"
                className={`core-link ${
                  open ? 'core-link--quiet-emphasis' : null
                }`}
                onClick={() =>
                  setColumns(currentColumns =>
                    currentColumns.map((col, idx) => ({
                      ...col,
                      open: idx === index ? false : col.open,
                    }))
                  )
                }
                {...{
                  initial: { opacity: 1, x: 310 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: 310 },
                  transition,
                }}
              >
                Hide
              </Toggle>
            </Fragment>
          ) : (
            <Fragment>
              <Heading
                {...{
                  className: 'core-heading core-heading--quinary',
                  initial: {
                    opacity: 0,
                    rotate: 90,
                    x: -30,
                    y: 50,
                  },
                  animate: { opacity: 1, x: 30 },
                  exit: { opacity: 0, x: -50 },
                  key: 'closedHeader',
                  transition,
                }}
              >
                {title}
              </Heading>
              <Toggle
                type="button"
                className={`core-link ${
                  open ? 'core-link--quiet-emphasis' : null
                }`}
                onClick={() =>
                  setColumns(currentColumns =>
                    currentColumns.map((col, idx) => ({
                      ...col,
                      open: idx === index ? true : col.open,
                    }))
                  )
                }
                {...{
                  initial: { opacity: 1, x: -310 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -310 },
                  transition,
                }}
              >
                Show
              </Toggle>
            </Fragment>
          )}
        </AnimatePresence>
      </Header>
      <Content
        {...{
          variants: contentVariants,
          animate: open ? 'open' : 'closed',
          initial: 'open',
          transition,
        }}
      >
        {children}
      </Content>
    </Wrapper>
  );
};

Column.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  columns: PropTypes.number,
  setColumns: PropTypes.func,
  index: PropTypes.number,
  children: PropTypes.any,
};

export default Column;
