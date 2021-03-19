/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import TimezoneSelect from '.';
import options from './options.json';

export default {
  title: 'TimezoneSelect',
  component: TimezoneSelect,
  decorators: [
    Story => (
      <form className="core-form">
        <Story />
      </form>
    ),
  ],
};

const Template = args => <TimezoneSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  onMenuOpen() {},
  options,
  value: { label: 'UTC', value: 'UTC' },
  setTimezone() {},
  disabled: false,
  submit() {},
};
