import React, { useState, useMemo, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Signal from '../Signal';
import ChallengeList from './ChallengeList';
import Links from './Links';
import { EventContext } from '../../common/EventContext';
import { ChallengesContext } from '../../common/ChallengesContext';
import { eventStatus } from '../../common/enums';

const Challenges = ({ challengeRefs, lastChallengeVisited }) => {
  const initialView = localStorage.getItem('challenge-view') || 'list';
  const initialGroupView = sessionStorage.getItem('group-view') || 'group';
  const [view, setView] = useState(initialView);
  const [groupView, setGroupView] = useState(initialGroupView);

  const {
    challenges: { error, loading, data },
  } = useContext(ChallengesContext);

  const {
    event: { status },
  } = useContext(EventContext);

  useEffect(() => {
    if (lastChallengeVisited) {
      const challengeIndex = challengeRefs.current.findIndex(
        ref => ref.id === lastChallengeVisited
      );

      if (challengeIndex >= 0) {
        challengeRefs.current[challengeIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        challengeRefs.current[challengeIndex].focus();
      }
    }
  }, [challengeRefs, lastChallengeVisited]);

  const toggleView = e => {
    if (e.target.hasAttribute('disabled')) {
      return;
    }

    setView(prev => {
      if (prev === 'grid') {
        localStorage.setItem('challenge-view', 'list');
        return 'list';
      }
      localStorage.setItem('challenge-view', 'grid');
      return 'grid';
    });
  };

  const toggleGroupView = e => {
    if (e.target.hasAttribute('disabled')) {
      return;
    }

    setGroupView(prev => {
      if (prev === 'group') {
        sessionStorage.setItem('group-view', 'difficulty');
        return 'difficulty';
      }
      sessionStorage.setItem('group-view', 'group');
      return 'group';
    });
  };

  const difficultyGroups = useMemo(() => {
    const groups = [
      { id: 'introductory', label: 'Introductory', challenges: [] },
      { id: 'easy', label: 'Easy', challenges: [] },
      { id: 'medium', label: 'Medium', challenges: [] },
      { id: 'hard', label: 'Hard', challenges: [] },
      { id: 'extreme', label: 'Extreme', challenges: [] },
    ];

    if (data) {
      data.forEach(challengeGroup => {
        challengeGroup.challenges.forEach(challenge => {
          switch (challenge.difficulty) {
            case 'Introductory':
              groups[0].challenges.push(challenge);
              break;
            case 'Easy':
              groups[1].challenges.push(challenge);
              break;
            case 'Medium':
              groups[2].challenges.push(challenge);
              break;
            case 'Hard':
              groups[3].challenges.push(challenge);
              break;
            case 'Extreme':
              groups[4].challenges.push(challenge);
              break;
            default:
              console.error(`Unknown difficulty ${challenge.difficulty}`);
              break;
          }
        });
      });
    }

    return groups;
  }, [data]);

  const createSignal = () => {
    let reason = '';
    let severity = '';

    if (status === eventStatus.PAUSED) {
      reason = 'This event is currently paused';
      severity = 'warning';
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
    <div className="atom atom-challenges-list">
      <header className="header">
        <h2 className="core-heading core-heading--quinary">Challenges</h2>
        <Links {...{ groupView, view, toggleGroupView, toggleView }} />
      </header>

      {data.length === 0 && error && (
        <p className="core-text">
          There was an error fetching the challenges. Please try again.
        </p>
      )}

      {createSignal()}
      {loading && (
        <div className="loading-wrapper">
          <img
            src="/assets/images/spinner.svg"
            alt="Loading Spinner"
            className="image"
          />
        </div>
      )}

      {!loading && data && (
        <ChallengeList
          {...{
            data: groupView === 'group' ? data : difficultyGroups,
            challengeRefs,
            view,
            groupView,
          }}
        />
      )}
    </div>
  );
};

Challenges.propTypes = {
  challengeRefs: PropTypes.object,
  lastChallengeVisited: PropTypes.string,
};

export default Challenges;
