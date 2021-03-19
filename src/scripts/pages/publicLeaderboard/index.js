import React from 'react';
import PropTypes from 'prop-types';
import App from './App';

import { EventProvider } from '../../common/EventContext';
import { LeaderboardProvider } from '../../common/LeaderboardContext';

function AppWrapper({ eventData }) {
  return (
    <EventProvider {...{ eventData }}>
      <LeaderboardProvider>
        <App />
      </LeaderboardProvider>
    </EventProvider>
  );
}

AppWrapper.propTypes = {
  eventData: PropTypes.object,
};

export default AppWrapper;
