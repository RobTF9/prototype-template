import React, { useContext } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EventContext } from '../../common/EventContext';
import { eventStatus } from '../../common/enums';
import Locked from '../Icons/Locked';

const Challenge = React.forwardRef(({ challenge, view }, ref) => {
  const {
    event: { status, end, isScored },
  } = useContext(EventContext);
  const now = new Date();
  const finished = end < now;

  const locked = challenge.groupLocked || challenge.locked;

  const classes = classNames({
    challenge: true,
    'challenge--grid': view === 'grid',
    'challenge--row': view === 'list',
    'challenge--scored': isScored,
    'challenge--completed': challenge.completed,
    'challenge--locked': locked || (!challenge.completed && finished),
    'challenge--disabled': status === eventStatus.PAUSED,
    'core-link': !finished,
    'core-link--invisible': finished,
    'js-tilt': view === 'grid' && !challenge.completed && !locked,
  });

  const textClasses = classNames({
    action: true,
    'action--completed': challenge.completed,
    'action--locked': locked || (!challenge.completed && finished),
    'core-text': true,
  });

  let text = 'View';
  if (locked) {
    text = 'Locked';
  }
  if (challenge.completed) {
    text = 'Completed!';
  }

  const Content = () => (
    <div ref={ref} id={challenge.id}>
      {isScored && (
        <span className="points core-text">{challenge.points}pts</span>
      )}
      <h3 className="title core-text core-text--primary">{challenge.title}</h3>
      <span className={textClasses}>
        {locked && <Locked />}
        {text}
      </span>
    </div>
  );

  if (!finished && !locked && status !== eventStatus.PAUSED) {
    return (
      <Link to={`challenge/${challenge.id}`} className={classes}>
        <Content />
      </Link>
    );
  }

  return (
    <span className={classes}>
      <Content />
    </span>
  );
});

Challenge.propTypes = {
  challenge: PropTypes.object,
  view: PropTypes.string,
};

export default Challenge;
