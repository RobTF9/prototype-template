import React from 'react';
import ManageEventStatus from '.';
import { Wrapper, Section } from '../../Header/styles';

export default {
  title: 'Header Sections/Manage Event Status',
  decorators: [
    storyFn => (
      <Wrapper>
        <Section {...{ breakpoint: 960 }}>{storyFn()}</Section>
      </Wrapper>
    ),
  ],
};

const Template = args => <ManageEventStatus {...args} />;

export const Draft = Template.bind({});
Draft.args = {
  status: 0,
};

export const Ready = Template.bind({});
Ready.args = {
  status: 1,
};

export const Started = Template.bind({});
Started.args = {
  status: 2,
};

export const Paused = Template.bind({});
Paused.args = {
  status: 3,
};

export const Finished = Template.bind({});
Finished.args = {
  status: 4,
};
