/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ordinal from '../../../../common/ordinal';
import Bar from '../../../Bar';
import { EventContext } from '../../../../common/EventContext';
import { Toggle, Wrapper, Pos, Percent, Team } from './styles';
import LoadingEllipses from '../../../LoadingEllipses';

const variants = {
  open: { height: 'auto' },
  closed: { height: 0 },
};

const toggleVariants = {
  open: { rotate: 45 },
  closed: { rotate: 0 },
};

const Leader = ({
  id_hash: idHash,
  team_id_hash: teamIdHash,
  running_position: position,
  name,
  percent,
  points,
  team,
  displayName,
}) => {
  const {
    event: { hashedUserId, hashedTeamId },
  } = useContext(EventContext);

  const [showTeam, setShowTeam] = useState(false);

  const you = idHash === hashedUserId;
  const yourTeam = team && team.length && teamIdHash === hashedTeamId;

  const nameText = () => {
    if (yourTeam) {
      return (
        <>
          <span className="you">Your team:</span> <span>{name}</span>
        </>
      );
    }

    if (you) {
      return (
        <>
          <span className="you">You:</span> <span>{name}</span>
        </>
      );
    }

    return name;
  };

  return (
    <Wrapper>
      {team && (
        <Toggle
          {...{
            variants: toggleVariants,
            initial: 'closed',
            animate: showTeam ? 'open' : 'closed',
            transition: {
              type: 'spring',
              damping: 150,
              stiffness: 300,
            },
            onClick: () => setShowTeam(prev => !prev),
          }}
        />
      )}
      <Pos className="core-text core-text--tertiary">
        <span className="position">
          {position ? ordinal(position) : <LoadingEllipses />} -{' '}
        </span>
        {nameText()}
      </Pos>
      <Team
        {...{
          variants,
          intial: 'closed',
          animate: showTeam ? 'open' : 'closed',
          transition: {
            type: 'spring',
            damping: 150,
            stiffness: 300,
          },
          initial: false,
        }}
      >
        {team && team.length
          ? team.map(player => (
              <p className="core-text core-text--tertiary" key={player.id}>
                <span>
                  {player.name === displayName ? (
                    <>
                      <span className="you">You:</span> {player.name}
                    </>
                  ) : (
                    player.name
                  )}
                </span>{' '}
                // {player.points.toLocaleString()}pts
              </p>
            ))
          : null}
      </Team>
      <Percent className="core-text core-text--tertiary">
        {percent}% // {points.toLocaleString()}pts
      </Percent>
      <Bar {...{ progress: percent, severity: 'secondary' }} />
    </Wrapper>
  );
};

Leader.propTypes = {
  id_hash: PropTypes.string,
  team_id_hash: PropTypes.string,
  running_position: PropTypes.number,
  name: PropTypes.string,
  percent: PropTypes.number,
  points: PropTypes.number,
  team: PropTypes.array,
  displayName: PropTypes.string,
};

export default Leader;
