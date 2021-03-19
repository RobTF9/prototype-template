import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import challengesReducer from './challengesReducer';

const defaultValues = {
  loading: true,
  error: false,
  data: [],
  refresh: false,
  total: 0,
};

export const ChallengesContext = createContext(defaultValues);

export const ChallengesProvider = ({ children, defaultOverrides = {} }) => {
  const [challenges, challengesDispatch] = useReducer(challengesReducer, {
    ...defaultValues,
    ...defaultOverrides,
  });

  return (
    <ChallengesContext.Provider value={{ challenges, challengesDispatch }}>
      {children}
    </ChallengesContext.Provider>
  );
};

ChallengesProvider.propTypes = {
  children: PropTypes.object,
  defaultOverrides: PropTypes.object,
};
