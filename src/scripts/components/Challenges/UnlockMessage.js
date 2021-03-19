import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ChallengesContext } from '../../common/ChallengesContext';
import { getTimeRemaining } from '../../common/countdown';
import { groupUnlockInclusion } from '../../common/enums';
import Locked from '../Icons/Locked';

const UnlockMessage = ({ unlock, unlockData, previousGroupLabel, id }) => {
  const REFRESH_TIME = 30000;
  const PREVIOUS_GROUP = '00000000-0000-0000-0000-000000000000';
  const { percentage, unlockAt, groupInclusion, groupsToInclude } = unlockData;
  const [duration, setDuration] = useState(null);

  const { challengesDispatch } = useContext(ChallengesContext);

  const groupNames = names => {
    if (names.length === 2) {
      return names.join(
        groupInclusion === groupUnlockInclusion.ANY ? ' or ' : ' and '
      );
    }

    const last = names.pop();
    return `${names.join(', ')}${
      groupInclusion === groupUnlockInclusion.ANY ? ' or ' : ' and '
    }${last}`;
  };

  const progressiveUnlockText = () => {
    const names =
      typeof groupsToInclude !== 'undefined'
        ? groupsToInclude.map(grp => grp.name)
        : [previousGroupLabel];

    if (names.length === 1) {
      return `This group unlocks when ${percentage}% of ${
        typeof groupsToInclude === 'undefined' ||
        groupsToInclude[0].id === PREVIOUS_GROUP
          ? previousGroupLabel
          : groupsToInclude[0].name
      } has been completed.`;
    }

    return `This group unlocks when ${percentage}% of ${
      groupInclusion === groupUnlockInclusion.ANY ? 'any' : 'all'
    } challenges from ${groupNames(names)} have been completed.`;
  };

  useEffect(() => {
    let timeout = null;

    const unlockAtTime = () => {
      const unlockAtDate = new Date(unlockAt * 1000);
      const timeRemaining = getTimeRemaining(unlockAtDate);
      const { days, hours, minutes, total } = timeRemaining;

      if (total <= 0) {
        challengesDispatch({ type: 'UNLOCK_GROUP', payload: id });
        return;
      }

      if (total <= 60000) {
        setDuration('less than a minute');
        timeout = setTimeout(unlockAtTime, REFRESH_TIME);
        return;
      }

      const durationText =
        (days ? `${days} day${days > 1 ? 's' : ''}, ` : '') +
        (hours ? `${hours} hour${hours > 1 ? 's' : ''}, ` : '') +
        (minutes ? `${minutes} minute${minutes > 1 ? 's' : ''}` : '');

      // Set duration and remove any trailing comma
      setDuration(durationText.replace(/,\s*$/, ''));
      timeout = setTimeout(unlockAtTime, REFRESH_TIME);
    };

    if (unlockAt) {
      unlockAtTime();
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [challengesDispatch, id, unlockAt]);

  if (unlock !== 'unlocked') {
    switch (unlock) {
      case 'progressive':
        return (
          <div className="unlock-message">
            <Locked />
            <p className="core-text">{progressiveUnlockText()}</p>
          </div>
        );
      case 'timed':
        if (duration) {
          return (
            <div className="unlock-message">
              <Locked />
              <p className="core-text">Unlocks in {duration}.</p>
            </div>
          );
        }
        return null;
      default:
        return null;
    }
  }

  return null;
};

UnlockMessage.propTypes = {
  unlock: PropTypes.string,
  unlockData: PropTypes.object,
  previousGroupLabel: PropTypes.string,
  id: PropTypes.string,
};

export default UnlockMessage;
