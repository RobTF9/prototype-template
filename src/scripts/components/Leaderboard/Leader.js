import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Flipped } from 'react-flip-toolkit';
import { motion } from 'framer-motion';
import { EventContext } from '../../common/EventContext';
import Bar from '../Bar';
import ordinal from '../../common/ordinal';

const Leader = ({
  id,
  name,
  id_hash: idHash,
  running_position: runningPosition,
  points,
  percent,
  team,
  size,
  bigScreen,
  lastPosition,
  index,
}) => {
  const [showTeam, setShowTeam] = useState(false);

  const {
    event: { hashedUserId, hashedTeamId },
  } = useContext(EventContext);

  const toggleTeam = () => {
    setShowTeam(prev => !prev);
  };

  const onAppear = el => {
    el.classList.add('appearing');
    el.style.opacity = '1';
  };

  const onComplete = el => {
    el.classList.remove('appearing');
    el.style.opacity = '1';
  };

  const classes = classNames({
    row: true,
    you: idHash === hashedUserId || idHash === hashedTeamId,
    'row--end':
      (runningPosition === undefined && index !== 0) ||
      runningPosition > lastPosition + 1,
    [`row--${size}`]: size,
  });

  let subject = name;

  if (team && !bigScreen) {
    subject = (
      <button
        type="button"
        className="core-link core-link--invisible"
        onClick={toggleTeam}
      >
        <span className="plus">+</span>
        {idHash === hashedTeamId && <span className="prefix">Your team: </span>}
        {name}
      </button>
    );
  } else if (idHash === hashedUserId && !bigScreen) {
    subject = (
      <>
        <span className="prefix">You:</span> {name}
      </>
    );
  }

  return (
    <Flipped flipId={id} onAppear={onAppear} onComplete={onComplete}>
      <div className={classes}>
        <div className="info">
          {!!runningPosition && runningPosition <= 10 && (
            <div className="rank">{ordinal(runningPosition)}</div>
          )}
          <div className={`subject ${showTeam ? 'subject--open' : ''}`}>
            {subject}
          </div>
          <motion.div
            className="team"
            initial={false}
            animate={{
              height: showTeam ? 'auto' : 0,
              opacity: showTeam ? 1 : 0,
              transition: {
                stiffness: 300,
              },
            }}
          >
            {team &&
              team
                .sort((a, b) => b.points - a.points)
                .map(player => (
                  <div className="player" key={player.id}>
                    <span className="name">{player.name}</span>{' '}
                    {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                    <span className="divider">//</span>{' '}
                    <span className="points">
                      {player.points.toLocaleString()}pts
                    </span>{' '}
                  </div>
                ))}
          </motion.div>
        </div>

        <div className="scores">
          <span className="percent">{percent}%</span>{' '}
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          <span className="divider">//</span>{' '}
          <span className="points">{points.toLocaleString()}pts</span>{' '}
        </div>
        <Bar
          {...{
            progress: percent,
            bottom: true,
            severity: idHash === hashedUserId ? null : 'secondary',
          }}
        />
      </div>
    </Flipped>
  );
};

Leader.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  id_hash: PropTypes.string,
  position: PropTypes.number,
  running_position: PropTypes.number,
  points: PropTypes.number,
  percent: PropTypes.number,
  team: PropTypes.array,
  size: PropTypes.string,
  bigScreen: PropTypes.bool,
  lastPosition: PropTypes.number,
  index: PropTypes.number,
};

export default Leader;
