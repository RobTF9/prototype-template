import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import Leaderboard from '../Leaderboard';
import Challenges from '../Challenges';
import Briefing from '../Briefing';
import Info from '../Info';
import { EventContext } from '../../common/EventContext';

function EventRouter({
  challengeRefs,
  lastChallengeVisited,
  setLastChallengeVisited,
  jwt,
}) {
  const {
    event: { id },
  } = useContext(EventContext);

  // eslint-disable-next-line no-shadow
  const ChallengesRoute = ({ challengeRefs, lastChallengeVisited }) => (
    <Challenges {...{ challengeRefs, lastChallengeVisited }} />
  );

  ChallengesRoute.propTypes = {
    challengeRefs: PropTypes.object,
    lastChallengeVisited: PropTypes.string,
  };

  const LeaderboardRoute = () => (
    <Leaderboard
      {...{
        filters: true,
      }}
    />
  );

  const InfoRoute = () => <Info />;

  return useMemo(
    () => (
      <Router>
        <ChallengesRoute
          path="/event/:eventId/*"
          {...{ challengeRefs, lastChallengeVisited }}
        />
        <Briefing
          {...{
            path: '/event/:eventId/challenge/:challengeId',
            dataURL: `/api/event/${id}`,
            setLastChallengeVisited,
            jwt,
          }}
        />
        <LeaderboardRoute path="/event/:eventId/leaderboard" />
        <InfoRoute path="/event/:eventId/info" />
      </Router>
    ),
    [challengeRefs, id, jwt, lastChallengeVisited, setLastChallengeVisited]
  );
}

EventRouter.propTypes = {
  challengeRefs: PropTypes.object,
  lastChallengeVisited: PropTypes.string,
  setLastChallengeVisited: PropTypes.func,
  jwt: PropTypes.string,
};

export default EventRouter;
