import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import Challenge from './Challenge';
import UnlockMessage from './UnlockMessage';
import { EventContext } from '../../common/EventContext';
import parseMarkdown from '../../common/parseMarkdown';
import { eventStatus } from '../../common/enums';

const ChallengeList = ({ data, challengeRefs, view, groupView }) => {
  const {
    event: { status },
  } = useContext(EventContext);

  challengeRefs.current = [];

  return data.map((challengeGroup, challengeGroupIndex) => {
    const {
      challenges,
      id,
      label,
      locked,
      unlock,
      unlockData,
      intro,
    } = challengeGroup;
    let previousGroupLabel = null;

    if (challengeGroupIndex >= 1) {
      previousGroupLabel = data[challengeGroupIndex - 1].label;
    }

    return (
      !!challenges.length && (
        <Fragment key={id}>
          <div className="heading">
            <h2 className="core-heading core-heading--quaternary">{label}</h2>
          </div>

          {groupView !== 'difficulty' && locked && (
            <UnlockMessage
              {...{ unlock, unlockData, previousGroupLabel, id }}
            />
          )}

          {intro && !locked && (
            <div
              className="info"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: parseMarkdown(intro) }}
            />
          )}

          <div
            className={`group ${
              view === 'grid' ? 'group--grid' : 'group--list'
            }`}
            data-testid="group-view"
          >
            {challenges.map(challenge => {
              if (
                view === 'grid' &&
                !locked &&
                !challenge.locked &&
                status !== eventStatus.PAUSED
              ) {
                return (
                  <Challenge
                    {...{
                      key: challenge.id,
                      challenge,
                      view,
                      ref: ref => {
                        challengeRefs.current.push(ref);
                      },
                    }}
                  />
                );
              }

              return (
                <Challenge
                  {...{
                    key: challenge.id,
                    challenge,
                    view,
                    ref: ref => {
                      challengeRefs.current.push(ref);
                    },
                  }}
                />
              );
            })}
          </div>
        </Fragment>
      )
    );
  });
};
ChallengeList.propTypes = {
  data: PropTypes.array,
  challengeRefs: PropTypes.object,
  view: PropTypes.string,
  groupView: PropTypes.string,
};

export default ChallengeList;
