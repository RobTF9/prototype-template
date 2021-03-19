import React from 'react';
import Bar from '.';

export default {
  title: 'Bar',
  component: Bar,
  decorators: [
    Story => (
      <div style={{ padding: '10px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    severity: {
      control: {
        type: 'radio',
        options: ['positive', 'warning', 'danger', 'secondary'],
      },
    },
  },
};

const Template = args => <Bar {...args} />;

export const Default = Template.bind({});
Default.args = { progress: 50 };

export const Positive = Template.bind({});
Positive.args = { ...Default.args, severity: 'positive' };

export const Warning = Template.bind({});
Warning.args = { ...Default.args, severity: 'warning' };

export const Danger = Template.bind({});
Danger.args = { ...Default.args, severity: 'danger' };

export const Secondary = Template.bind({});
Secondary.args = { ...Default.args, severity: 'secondary' };

export const Taller = Template.bind({});
Taller.args = { ...Default.args, severity: 'secondary', taller: true };

export const Bottom = Template.bind({});
Bottom.args = { ...Default.args, severity: 'secondary', bottom: true };
