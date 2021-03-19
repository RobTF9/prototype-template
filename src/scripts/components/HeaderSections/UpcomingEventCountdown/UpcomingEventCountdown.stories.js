import React from 'react';
import UpcomingEventCountdown from '.';
import { Wrapper, Section } from '../../Header/styles';

export default {
  title: 'Header Sections/Upcoming Event Countdown',
  decorators: [
    storyFn => (
      <Wrapper>
        <Section>{storyFn()}</Section>
      </Wrapper>
    ),
  ],
};

const Template = args => <UpcomingEventCountdown {...args} />;

export const OneMinute = Template.bind({});
OneMinute.args = { end: new Date(Date.now() + 60000) };

export const OneHour = Template.bind({});
OneHour.args = { end: new Date(Date.now() + 3600000) };

export const OneDay = Template.bind({});
OneDay.args = { end: new Date(Date.now() + 86400000) };

export const OneHundredDays = Template.bind({});
OneHundredDays.args = { end: new Date(Date.now() + 8640000000) };
