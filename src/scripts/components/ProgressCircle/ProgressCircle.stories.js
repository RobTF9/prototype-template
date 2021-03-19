import React from 'react';
import ProgressCircle from '.';

export default {
  title: 'ProgressCircle',
  component: ProgressCircle,
  decorators: [
    storyFn => (
      <div style={{ width: '300px', padding: '20px' }}>{storyFn()}</div>
    ),
  ],
  argTypes: {
    children: { control: { disable: true } },
    color: { control: { type: 'color' } },
    progress: { control: { type: 'range' } },
  },
};

const Template = args => <ProgressCircle {...args} />;

export const Default = Template.bind({});
Default.args = {
  progress: 50,
  color: '',
  children: (
    <p className="core-text" style={{ margin: 0 }}>
      Content
    </p>
  ),
};
