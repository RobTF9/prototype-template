import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import lobbyReducer from './lobbyReducer';

const defaultValues = {
  teams: { loading: true, error: false, data: [] },
  players: { loading: true, error: false, data: [] },
};

export const LobbyContext = createContext(defaultValues);

export const LobbyProvider = ({ children, lobbyData }) => {
  const [lobby, lobbyDispatch] = useReducer(lobbyReducer, {
    ...defaultValues,
    ...lobbyData,
  });

  return (
    <LobbyContext.Provider value={{ lobby, lobbyDispatch }}>
      {children}
    </LobbyContext.Provider>
  );
};

LobbyProvider.propTypes = {
  children: PropTypes.object,
  lobbyData: PropTypes.object,
};
