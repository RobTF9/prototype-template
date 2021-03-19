import React from 'react';
import Leaderboard from '.';
import { LeaderboardProvider } from '../../../common/LeaderboardContext';
import { EventProvider } from '../../../common/EventContext';
import { mixedLeaderboard } from './index.fixture';

export default {
  title: 'Columns/Leaderboard',
  component: Leaderboard,
  decorators: [
    storyFn => (
      <EventProvider {...{ hashedUserId: '12345', hashedTeamId: '12345' }}>
        <LeaderboardProvider
          defaultOverrides={{ loading: false, data: mixedLeaderboard }}
        >
          {storyFn()}
        </LeaderboardProvider>
      </EventProvider>
    ),
  ],
};

const Template = args => <Leaderboard {...args} />;

export const Default = Template.bind({});
Default.args = {};
