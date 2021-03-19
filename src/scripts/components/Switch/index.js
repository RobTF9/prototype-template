import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import { Wrapper, Toggle, Circle, Text, StatusWrapper } from './styles';
import CoreColors from '../../common/coreColors';
import { Status } from '../InlineField';
import { borderWidth } from '../../common/borders';

export default function Switch({
  id,
  name,
  label,
  isOn,
  handleChange,
  disabled,
  status,
}) {
  return (
    <Wrapper {...{ disabled }}>
      <label htmlFor={id}>
        <input
          {...{
            type: 'checkbox',
            onChange: handleChange,
            id,
            name,
            disabled,
            checked: isOn,
          }}
        />
        <span>{label}</span>
        <Toggle
          {...{
            initial: 'off',
            animate: isOn ? 'on' : 'off',
            variants: {
              on: {
                border: `${borderWidth}px solid ${CoreColors.blueprime}`,
              },
              off: {
                border: `${borderWidth}px solid ${CoreColors.greyprime}`,
              },
            },
            disabled,
          }}
        >
          <StatusWrapper>
            <AnimatePresence>
              <Status {...{ status }} />
            </AnimatePresence>
          </StatusWrapper>
          <Text
            {...{
              initial: 'off',
              animate: isOn ? 'on' : 'off',
              variants: {
                on: {
                  opacity: 1,
                  left: '5px',
                },
                off: {
                  opacity: 0,
                },
              },
              disabled,
            }}
          >
            Yes
          </Text>
          <Circle
            {...{
              initial: 'off',
              animate: isOn ? 'on' : 'off',
              variants: {
                on: {
                  background: CoreColors.blueprime,
                  left: '28px',
                },
                off: {
                  background: CoreColors.greyprime,
                  left: '5px',
                },
              },
            }}
          />
          <Text
            {...{
              initial: 'off',
              animate: isOn ? 'on' : 'off',
              variants: {
                on: {
                  opacity: 0,
                },
                off: {
                  opacity: 1,
                  right: '6px',
                },
              },
              disabled,
            }}
          >
            No
          </Text>
        </Toggle>
      </label>
    </Wrapper>
  );
}

Switch.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  isOn: PropTypes.bool,
  handleChange: PropTypes.func,
  disabled: PropTypes.bool,
  status: PropTypes.string,
};
