import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EventContext } from '../common/EventContext';
import { scoreMode } from '../common/enums';

const Update = ({ update }) => {
  const {
    type,
    badge = {},
    challenge = {},
    event = {},
    user = {},
    team = {},
  } = update;
  const { id: userId, displayName } = user;
  const { id: teamId, name: teamName } = team;

  const {
    event: { isTeamEvent, scoreMode: mode, hashedUserId, hashedTeamId },
  } = useContext(EventContext);

  let sentiment = '';
  let content = '';
  const otherUser = userId !== hashedUserId && displayName ? displayName : null;
  const otherTeam = teamId !== hashedTeamId && teamName ? teamName : null;

  switch (type) {
    case 'badgeAwarded':
      sentiment = 'positive';
      content = (
        <>
          <div className="info">
            {otherUser ? (
              <>
                Your teammate{' '}
                <span className="core-highlight core-highlight--warning">
                  {otherUser}{' '}
                </span>
                was{' '}
              </>
            ) : (
              'You were '
            )}
            awarded {badge.name ? 'the' : 'a'}{' '}
            <span className="core-highlight core-highlight--positive">
              {badge.name ? `${badge.name} ` : ''}
            </span>
            badge{!otherUser && ' – good job!'}
          </div>
        </>
      );
      break;
    case 'challengeCompleted': {
      sentiment = 'positive';
      content = (
        <>
          <div className="info">
            {mode === scoreMode.KNOCKOUT &&
            ((isTeamEvent && otherTeam) || (!isTeamEvent && otherUser)) ? (
              <>
                <span className="core-highlight core-highlight--warning">
                  {otherTeam || otherUser}{' '}
                </span>
                captured{' '}
                <span className="core-highlight core-highlight--positive">
                  {challenge.shortTitle}
                </span>
              </>
            ) : (
              <>
                {otherUser ? (
                  <>
                    Your teammate{' '}
                    <span className="core-highlight core-highlight--warning">
                      {otherUser}{' '}
                    </span>
                  </>
                ) : (
                  'You '
                )}
                completed {challenge.shortTitle ? 'the' : 'a'} challenge{' '}
                <span className="core-highlight core-highlight--positive">
                  {challenge.shortTitle ? `${challenge.shortTitle} ` : ''}
                </span>
                &ndash; {otherUser ? 'go team!' : 'well done!'}
              </>
            )}
          </div>
        </>
      );
      break;
    }

    case 'topOfLeaderboard':
      if (isTeamEvent) {
        sentiment = otherTeam ? 'warning' : 'positive';
        content = (
          <div className="info">
            {otherTeam || 'Your team'} went to the top of the leaderboard
            {!otherTeam && '!'}
          </div>
        );
        break;
      }

      sentiment = otherUser ? 'warning' : 'positive';
      content = (
        <div className="info">
          {otherUser || 'You'} went to the top of the leaderboard
          {!otherUser && '!'}
        </div>
      );

      break;

    case 'eventStarted':
      sentiment = 'positive';
      content = (
        <>
          <div className="info">
            The event{' '}
            <span className="core-highlight core-highlight--positive">
              {event.name ? `${event.name} ` : ''}
            </span>
            has started &ndash; go, go, go!
          </div>
        </>
      );
      break;

    case 'eventPaused':
      sentiment = 'warning';
      content = (
        <div className="info">
          The event has been paused &ndash; it will continue shortly
        </div>
      );
      break;
    default:
      break;
  }

  const classes = classNames({
    update: true,
    [`update--${sentiment}`]: sentiment,
  });

  return content ? <div className={classes}>{content}</div> : null;
};
Update.propTypes = {
  update: PropTypes.object,
};

export default Update;
