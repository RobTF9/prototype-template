import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Flipper } from 'react-flip-toolkit';
import Leader from './Leader';
import { LeaderboardContext } from '../../common/LeaderboardContext';
import { EventContext } from '../../common/EventContext';

const Leaderboard = ({ size, bigScreen, filters = false }) => {
  let lastPosition = 0;

  const {
    event: { isTeamEvent, isScored },
  } = useContext(EventContext);

  const {
    leaderboard: { data, loading, error },
  } = useContext(LeaderboardContext);

  if (!isScored) {
    return (
      <div className="atom atom-leaderboard">
        <p className="core-text">This event is not scored</p>
      </div>
    );
  }

  if (!data && error) {
    return (
      <p className="core-text">
        There was an error fetching the leaderboard. Please try again.
      </p>
    );
  }

  const displayLeaders = () => {
    if (data.length) {
      return (
        <Flipper flipKey={data.map(leader => leader.id).join('')}>
          {data.map((leader, index) => {
            const jsx = (
              <Leader
                {...{
                  ...leader,
                  size,
                  bigScreen,
                  lastPosition,
                  key: leader.id,
                  index,
                }}
              />
            );

            if (leader.running_position) {
              lastPosition = leader.running_position;
            }
            return jsx;
          })}
        </Flipper>
      );
    }

    return <p>No {isTeamEvent ? 'team' : 'player'}s yet</p>;
  };

  return (
    <div className="atom atom-leaderboard">
      {filters && (
        <header className="header">
          <h2 className="core-heading core-heading--quinary">Leaderboard</h2>
        </header>
      )}

      {loading ? (
        <div className="loading-wrapper">
          <img
            src="/assets/images/spinner.svg"
            alt="Loading Spinner"
            className="image"
          />
        </div>
      ) : (
        displayLeaders()
      )}
    </div>
  );
};

Leaderboard.propTypes = {
  size: PropTypes.string,
  bigScreen: PropTypes.bool,
  filters: PropTypes.bool,
};

export default Leaderboard;
