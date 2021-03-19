/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Switch from '.';
import Field from '../ManageEvent/Field';

export default {
  title: 'Switch',
  component: Switch,
  argTypes: {
    isOn: { control: { disable: true } },
    handleChange: { control: { disable: true } },
    status: { control: { disable: true } },
  },
};

const Template = args => {
  const [isOn, setIsOn] = useState(false);
  const [status, setStatus] = useState('');

  function submit() {
    setStatus('LOADING');

    setTimeout(() => {
      setStatus('ERROR');
      setIsOn(false);
    }, 3000);
  }

  function handleChange(e) {
    const { checked } = e.target;

    setIsOn(checked);
    submit();
  }

  return (
    <Field {...{ status, showStatus: false }}>
      <Switch
        {...{
          ...args,
          isOn,
          handleChange,
          status,
          disabled: status === 'LOADING',
        }}
      />
    </Field>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 'some-id',
  name: 'some-name',
  label: 'Label',
  disabled: false,
  status: 'READY',
};
