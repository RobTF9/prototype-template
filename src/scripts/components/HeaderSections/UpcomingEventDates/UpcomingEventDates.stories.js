import React from 'react';
import UpcomingEventDates from '.';
import { Wrapper, Section } from '../../Header/styles';

export default {
  title: 'Header Sections/Upcoming Event Dates',
  decorators: [
    storyFn => (
      <Wrapper>
        <Section>{storyFn()}</Section>
      </Wrapper>
    ),
  ],
  argTypes: {
    start: { control: { type: 'date' } },
    end: { control: { type: 'date' } },
  },
};

const Template = args => <UpcomingEventDates {...args} />;

export const SameDaySameMonthSameYear = Template.bind({});
SameDaySameMonthSameYear.args = {
  start: new Date('01 Jan 2020 09:00'),
  end: new Date('01 Jan 2020 17:00'),
};

export const DifferentDaySameMonthSameYear = Template.bind({});
DifferentDaySameMonthSameYear.args = {
  start: new Date('01 Jan 2020 09:00'),
  end: new Date('02 Jan 2020 17:00'),
};

export const DifferentDayDifferentMonthSameYear = Template.bind({});
DifferentDayDifferentMonthSameYear.args = {
  start: new Date('01 Jan 2020 09:00'),
  end: new Date('01 Feb 2020 17:00'),
};

export const DifferentDayDifferentMonthDifferentYear = Template.bind({});
DifferentDayDifferentMonthDifferentYear.args = {
  start: new Date('01 Jan 2020 09:00'),
  end: new Date('01 Feb 2021 17:00'),
};

export const WaitingToStart = Template.bind({});
WaitingToStart.args = {
  start: new Date('01 Jan 2020 09:00'),
  end: new Date('01 Feb 2021 17:00'),
  waiting: true,
};
