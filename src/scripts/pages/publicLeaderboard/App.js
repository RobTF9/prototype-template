import React, { useState, useContext } from 'react';
import { eventStatus } from '../../common/enums';
import Timer from '../../components/Timer';
import Leaderboard from '../../components/Leaderboard';
import Signal from '../../components/Signal';
import useEventData from './useEventData';
import { EventContext } from '../../common/EventContext';
import useLeaderboardData from './useLeaderboardData';
import { LeaderboardContext } from '../../common/LeaderboardContext';

function App() {
  const [refreshTime, setRefreshTime] = useState(30000);

  const {
    event: { name, start, end, status, id, leaderboardCode },
    dispatch,
  } = useContext(EventContext);

  // Event data
  useEventData({ refreshTime, id, leaderboardCode });

  // Event data
  useLeaderboardData({ refreshTime, id, leaderboardCode });

  const {
    leaderboard: { error },
  } = useContext(LeaderboardContext);

  const onEnd = () => {
    dispatch({ type: 'FINISH_EVENT' });
    setRefreshTime(null);
  };

  const createSignal = () => {
    let reason = '';
    let severity = '';

    if (status === eventStatus.READY) {
      reason = 'This event has not started yet';
      severity = 'warning';
    }

    if (error) {
      reason =
        'There was a problem fetching the latest leaderboard update. We will try updating again soon';
      severity = 'warning';
    }

    if (status === eventStatus.PAUSED) {
      reason = 'This event is currently paused';
      severity = 'warning';
    }

    if (status === eventStatus.FINISHED) {
      reason = 'This event is finished';
      severity = 'danger';
    }

    if (reason) {
      return (
        <Signal
          {...{
            reasons: [reason],
            center: true,
            severity,
          }}
        />
      );
    }

    return null;
  };

  return (
    <div className="wrapper">
      <div className="hat" role="banner">
        <div className="lead box layout-container">
          <div className="name layout layout--half-left">
            <h1 className="core-heading core-heading--tertiary">{name}</h1>
          </div>

          {(status === eventStatus.STARTED ||
            status === eventStatus.PAUSED) && (
            <div className="timer layout layout--half-right">
              <Timer {...{ start, end, large: true, onEnd }} />
            </div>
          )}
        </div>
      </div>

      <div className="main main--no-aside" role="main">
        {createSignal()}
        <div className="leaderboard box">
          <Leaderboard
            {...{
              size: 'maxi',
              showFullLink: false,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
