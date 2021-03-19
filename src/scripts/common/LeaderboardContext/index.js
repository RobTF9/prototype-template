import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import leaderboardReducer from './leaderboardReducer';

const defaultValues = {
  loading: true,
  error: false,
  data: [],
  refresh: false,
  player: {},
  team: {},
  finalRefresh: null,
};

export const LeaderboardContext = createContext(defaultValues);

export const LeaderboardProvider = ({ children, defaultOverrides = {} }) => {
  const [leaderboard, leaderboardDispatch] = useReducer(leaderboardReducer, {
    ...defaultValues,
    ...defaultOverrides,
  });

  return (
    <LeaderboardContext.Provider value={{ leaderboard, leaderboardDispatch }}>
      {children}
    </LeaderboardContext.Provider>
  );
};

LeaderboardProvider.propTypes = {
  children: PropTypes.any,
  defaultOverrides: PropTypes.object,
};
