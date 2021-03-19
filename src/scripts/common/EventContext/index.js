import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import eventReducer from './eventReducer';

const defaultValues = {
  id: '',
  name: '',
  isScored: false,
  isTeamEvent: false,
  isInviteOnly: false,
  maximumTeamCount: null,
  maximumPlayerCountPerTeam: null,
  isTeamChatEnabled: false,
  numberOfPlayers: 0,
  numberOfTeams: 0,
  numberOfPlayersNotInTeam: 0,
  start: 0,
  end: 0,
  scoreMode: 0,
  leaderboardCode: '',
  hashedUserId: '',
  hashedTeamId: '',
};

export const EventContext = createContext(defaultValues);

export const EventProvider = ({
  children,
  defaultOverrides = {},
  eventData,
  hashedUserId,
  hashedTeamId,
  combinedEventPages,
}) => {
  const [event, dispatch] = useReducer(eventReducer, {
    ...defaultValues,
    ...eventData,
    start:
      eventData && eventData.startsAt ? new Date(eventData.startsAt * 1000) : 0,
    end: eventData && eventData.endsAt ? new Date(eventData.endsAt * 1000) : 0,
    hashedUserId,
    hashedTeamId,
    combinedEventPages,
    ...defaultOverrides,
  });

  return (
    <EventContext.Provider value={{ event, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

EventProvider.propTypes = {
  children: PropTypes.object,
  defaultOverrides: PropTypes.object,
  eventData: PropTypes.object,
  hashedUserId: PropTypes.string,
  hashedTeamId: PropTypes.string,
  combinedEventPages: PropTypes.bool,
};
