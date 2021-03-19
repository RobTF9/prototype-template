import React from 'react';
import EventTimer from '.';
import { Wrapper, Section } from '../../Header/styles';

export default {
  title: 'Header Sections/Event Timer',
  decorators: [
    storyFn => (
      <Wrapper>
        <Section>{storyFn()}</Section>
      </Wrapper>
    ),
  ],
};

const Template = args => <EventTimer {...args} />;

export const Default = Template.bind({});
Default.args = {
  start: 'Fri Jan 01 2021 00:00:00 GMT+0000 (Greenwich Mean Time)',
  end: 'Sat Jan 01 2022 00:00:00 GMT+0000 (Greenwich Mean Time)',
};
