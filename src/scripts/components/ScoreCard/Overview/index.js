import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { EventContext } from '../../../common/EventContext';
import { LeaderboardContext } from '../../../common/LeaderboardContext';
import { ChallengesContext } from '../../../common/ChallengesContext';
import ProgressCircle from '../../ProgressCircle';
import LoadingEllipsis from '../../LoadingEllipses';
import ordinal from '../../../common/ordinal';
import { eventMembershipMode } from '../../../common/enums';
import Challenges from '../Challenges';
import {
  Wrapper,
  HeaderText,
  Stats,
  ProgressCircleContent,
  Feat,
} from './styles';
import CoreColors from '../../../common/coreColors';

const Overview = ({ displayName, breakpoint }) => {
  const {
    event: {
      name,
      numberOfPlayers,
      numberOfTeams,
      numberOfPlayersNotInTeam,
      isTeamEvent,
      membershipMode,
    },
  } = useContext(EventContext);

  const {
    leaderboard: { player, team },
  } = useContext(LeaderboardContext);

  const {
    challenges: { data },
  } = useContext(ChallengesContext);

  let you = { position: null, percent: null, points: null };
  if (team && team.name) {
    you = team;
  }
  if (player && player.id) {
    you = player;
  }

  const totalPoints = data.reduce((acc, current) => {
    let points = 0;
    current.challenges.forEach(challenge => {
      points += challenge.points;
    });

    return acc + points;
  }, 0);

  const positionProgress = you.position
    ? (1 -
        (you.position - 1) /
          (isTeamEvent
            ? numberOfTeams + numberOfPlayersNotInTeam
            : numberOfPlayers)) *
      100
    : null;

  const pointsProgress =
    you.points && totalPoints ? (you.points / totalPoints) * 100 : 0;

  const getColor = progress => {
    if (progress === null) {
      return '#ffffff';
    }

    if (progress >= 66) {
      return CoreColors.greenprime;
    }

    if (progress >= 33) {
      return CoreColors.yellowprime;
    }

    return CoreColors.redprime;
  };

  return (
    <Wrapper {...{ breakpoint }}>
      <HeaderText {...{ breakpoint }}>
        <h3 className="core-heading core-heading--tertiary">
          Welcome back, <span>{displayName}</span>
        </h3>
        <p className="core-text core-text--secondary">
          Here are some stats about how you did at {name}.
        </p>
      </HeaderText>
      <Stats>
        {membershipMode !== eventMembershipMode.LIMITED && (
          <ProgressCircle
            {...{
              progress: positionProgress,
              color: getColor(positionProgress),
            }}
          >
            <ProgressCircleContent>
              <p className="core-text core-text--tertiary desktop">
                You{isTeamEvent ? 'r team' : ''} came
              </p>
              <Feat
                className="core-text core-text--primary"
                color={getColor(positionProgress)}
              >
                {you.position ? ordinal(you.position) : <LoadingEllipsis />}
              </Feat>
              <p className="core-text core-text--tertiary mobile">
                /{' '}
                {isTeamEvent
                  ? (numberOfTeams + numberOfPlayersNotInTeam).toLocaleString()
                  : numberOfPlayers.toLocaleString()}
              </p>
              <p className="core-text core-text--tertiary desktop">
                out of{' '}
                {isTeamEvent
                  ? (numberOfTeams + numberOfPlayersNotInTeam).toLocaleString()
                  : numberOfPlayers.toLocaleString()}{' '}
                {isTeamEvent ? 'teams' : 'players'}
              </p>
            </ProgressCircleContent>
          </ProgressCircle>
        )}
        <ProgressCircle
          {...{ progress: pointsProgress, color: getColor(pointsProgress) }}
        >
          <ProgressCircleContent>
            <p className="core-text core-text--tertiary desktop">
              You{isTeamEvent ? 'r team' : ''} scored
            </p>
            <Feat
              className="core-text core-text--primary"
              color={pointsProgress ? getColor(pointsProgress) : null}
            >
              {you.points !== null ? (
                you.points.toLocaleString()
              ) : (
                <LoadingEllipsis />
              )}
              pts
            </Feat>
            <p className="core-text core-text--tertiary mobile">
              / {totalPoints.toLocaleString()}pts
            </p>
            <p className="core-text core-text--tertiary desktop">
              out of {totalPoints.toLocaleString()}pts
            </p>
          </ProgressCircleContent>
        </ProgressCircle>
        <ProgressCircle
          {...{
            progress: you.percent || 0,
            color: you.percent ? getColor(you.percent) : null,
          }}
        >
          <ProgressCircleContent>
            <p className="core-text core-text--tertiary desktop">
              You{isTeamEvent ? 'r team' : ''} completed
            </p>
            <Feat
              className="core-text core-text--primary"
              color={you.percent ? getColor(you.percent) : null}
            >
              {you.percent !== null ? `${you.percent}%` : <LoadingEllipsis />}
            </Feat>
            <p className="core-text core-text--tertiary mobile">complete</p>
            <p className="core-text core-text--tertiary desktop">
              of all the challenges
            </p>
          </ProgressCircleContent>
        </ProgressCircle>
      </Stats>
      <HeaderText {...{ breakpoint }}>
        <h3 className="core-heading core-heading--tertiary">Challenges</h3>
      </HeaderText>
      <Challenges />
    </Wrapper>
  );
};

Overview.propTypes = {
  displayName: PropTypes.string,
  breakpoint: PropTypes.number,
};

export default Overview;
