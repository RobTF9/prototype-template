import 'core-js/es/weak-set';
import 'core-js/es/string/ends-with';
import React from 'react';
import PropTypes from 'prop-types';
import App from './App';
import { WSProvider } from '../../common/WSContext';
import { EventProvider } from '../../common/EventContext';
import { ChallengesProvider } from '../../common/ChallengesContext';
import { LeaderboardProvider } from '../../common/LeaderboardContext';
import { ScoreCardProvider } from '../../components/ScoreCard/ScoreCardContext';

function AppWrapper({
  event,
  user: { hashedUserId, jwt, displayName },
  team: { hashedTeamId },
  lobby,
  config,
  links,
  scoreCardStats,
  combinedEventPages,
}) {
  const { wsEndpoint, liveEventApiEndpoint } = event;
  return (
    <WSProvider {...{ wsEndpoint, jwt }}>
      <EventProvider
        {...{
          eventData: event,
          hashedUserId,
          hashedTeamId,
          combinedEventPages,
        }}
      >
        <ChallengesProvider>
          <LeaderboardProvider>
            <ScoreCardProvider {...{ scoreCardStats }}>
              <App
                {...{
                  displayName,
                  jwt,
                  liveEventApiEndpoint,
                  hashedUserId,
                  hashedTeamId,
                  lobby,
                  config,
                  links,
                }}
              />
            </ScoreCardProvider>
          </LeaderboardProvider>
        </ChallengesProvider>
      </EventProvider>
    </WSProvider>
  );
}

AppWrapper.propTypes = {
  event: PropTypes.object,
  user: PropTypes.object,
  team: PropTypes.object,
  lobby: PropTypes.object,
  config: PropTypes.object,
  links: PropTypes.object,
  scoreCardStats: PropTypes.object,
  combinedEventPages: PropTypes.bool,
};

export default AppWrapper;
