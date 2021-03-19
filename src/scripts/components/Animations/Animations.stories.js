import React from 'react';
import BadgeAwarded from './BadgeAwarded';
import ChallengeCompleted from './ChallengeCompleted';
import EventStarted from './EventStarted';

export default {
  title: 'Animations',
  decorators: [
    storyFn => (
      <div className="atom-updates" style={{ padding: '10px' }}>
        {storyFn()}
      </div>
    ),
  ],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const BadgeAwardedUpdate = () => <BadgeAwarded />;
export const ChallengeCompletedUpdate = () => <ChallengeCompleted />;
export const EventStartedUpdate = () => <EventStarted />;
