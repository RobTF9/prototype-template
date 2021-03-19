import React from 'react';
import Stats from '.';
import { Wrapper, Section } from '../../Header/styles';

export default {
  title: 'Header Sections/Stats',
  decorators: [
    storyFn => (
      <Wrapper>
        <Section>{storyFn()}</Section>
      </Wrapper>
    ),
  ],
};

const Template = args => <Stats {...args} />;

export const ScoreCardStats = Template.bind({});
ScoreCardStats.args = {
  headers: ['Total players', 'Challenges scored', 'Badges awarded'],
  data: [1632, 3260, 1700],
};

export const ManageEventStats = Template.bind({});
ManageEventStats.args = {
  headers: ['Active players', 'Correct attempts', 'Total attempts'],
  data: [1632, 3260, 3260],
};

export const StatsLoading = Template.bind({});
StatsLoading.args = {
  headers: ['Total players', 'Challenges scored', 'Badges awarded'],
  data: [null, null, null],
};
