import React from 'react';
import Position from '.';
import { Wrapper, Section } from '../../Header/styles';

export default {
  title: 'Header Sections/Position',
  decorators: [
    storyFn => (
      <Wrapper>
        <Section>{storyFn()}</Section>
      </Wrapper>
    ),
  ],
};

const Template = args => <Position {...args} />;

export const Default = Template.bind({});
Default.args = {
  position: 3,
  percentComplete: 60,
  points: 600,
  showPosition: true,
};
