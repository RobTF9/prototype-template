import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { EventContext } from '../../common/EventContext';
import useEventData from './useEventData';
import useLeaderboardData from './useLeaderboardData';
import useChallengesData from './useChallengesData';
import useScoreCardInfo from '../../components/ScoreCard/useScoreCardInfo';
import useUpdatesData from '../../components/LiveEvent/Updates/useUpdatesData';
import LiveEvent from '../../components/LiveEvent';
import { LobbyProvider } from '../../components/Lobby/LobbyContext';
import Lobby from '../../components/Lobby';
import { eventStatus } from '../../common/enums';
import ScoreCard from '../../components/ScoreCard';
import Updates from '../../components/LiveEvent/Updates';

function App({
  displayName,
  jwt,
  liveEventApiEndpoint,
  hashedUserId,
  hashedTeamId,
  lobby,
  config,
  links,
}) {
  // Event data
  useEventData();

  // Leaderboard data
  useLeaderboardData({ hashedUserId, hashedTeamId });

  // Challenges data
  useChallengesData({
    jwt,
    liveEventApiEndpoint,
    hashedUserId,
    hashedTeamId,
  });

  // Scorecard Data
  useScoreCardInfo();

  // Updates data
  const { updates, firstRender } = useUpdatesData();
  const updatesComponent = <Updates {...{ updates, firstRender }} />;

  const {
    event: { status, start, end },
  } = useContext(EventContext);
  const [eventPage, setEventPage] = useState('');

  useEffect(() => {
    const now = new Date();
    if (now < start || status === eventStatus.READY) {
      setEventPage('LOBBY');
    }

    if (now > start && now < end && status !== eventStatus.READY) {
      setEventPage('LIVE');
    }

    if (now > end && status !== eventStatus.READY) {
      setEventPage('SCORECARD');
    }
  }, [end, start, status]);

  if (eventPage === 'LOBBY') {
    return (
      <LobbyProvider {...{ lobbyData: lobby }}>
        <Lobby {...{ displayName, links, config, setEventPage }} />
      </LobbyProvider>
    );
  }

  if (eventPage === 'LIVE') {
    return (
      <LiveEvent
        {...{ displayName, jwt, setEventPage, updatesComponent, config, links }}
      />
    );
  }

  if (eventPage === 'SCORECARD') {
    return <ScoreCard {...{ displayName, links, config, setEventPage }} />;
  }

  return null;
}

App.propTypes = {
  displayName: PropTypes.string,
  jwt: PropTypes.string,
  liveEventApiEndpoint: PropTypes.string,
  hashedUserId: PropTypes.string,
  hashedTeamId: PropTypes.string,
  lobby: PropTypes.object,
  config: PropTypes.object,
  links: PropTypes.object,
};
export default App;
