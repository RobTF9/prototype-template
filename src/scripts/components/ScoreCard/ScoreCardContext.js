import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import scoreCardReducer from './scoreCardReducer';

const defaultValues = {
  badges: null,
  challenges: null,
};

export const ScoreCardContext = createContext(defaultValues);

export const ScoreCardProvider = ({ children, scoreCardStats }) => {
  const passedDefaults =
    scoreCardStats && scoreCardStats.overall ? scoreCardStats.overall : {};

  const [scoreCard, scoreCardDispatch] = useReducer(scoreCardReducer, {
    ...defaultValues,
    ...passedDefaults,
  });

  return (
    <ScoreCardContext.Provider value={{ scoreCard, scoreCardDispatch }}>
      {children}
    </ScoreCardContext.Provider>
  );
};

ScoreCardProvider.propTypes = {
  children: PropTypes.any,
  scoreCardStats: PropTypes.object,
};
