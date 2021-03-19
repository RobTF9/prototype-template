import React, { useContext, Fragment } from 'react';
import { ChallengesContext } from '../../../common/ChallengesContext';
import LoadingEllipsis from '../../LoadingEllipses';
import Card from '../../Card';
import { GroupHeader, Cards } from './styles';

const Challenges = () => {
  const {
    challenges: { error, loading, data },
  } = useContext(ChallengesContext);

  if (data.length === 0 && error) {
    return (
      <p className="core-text">
        There was an error fetching the challenges. Please try again.
      </p>
    );
  }

  if (loading) {
    return Array.from(Array(2)).map((_, index) => (
      <Fragment key={index}>
        <GroupHeader className="core-heading core-heading--quinary">
          <LoadingEllipsis />
        </GroupHeader>
        <Cards>
          {Array.from(Array(8)).map((loadingCard, idx) => (
            <Card
              {...{
                border: 'greydarkest',
                loading,
                key: idx,
              }}
            />
          ))}
        </Cards>
      </Fragment>
    ));
  }

  return data.map(challengeGroup => {
    const { challenges, id, label } = challengeGroup;

    if (challenges.length) {
      return (
        <Fragment key={id}>
          <GroupHeader className="core-heading core-heading--quinary">
            {label}
          </GroupHeader>
          <Cards>
            {challenges.map(challenge => (
              <Card
                {...{
                  key: challenge.id,
                  border: challenge.completed ? 'greenprime' : 'redprime',
                  header: {
                    title: challenge.title,
                    subTitle: `${challenge.points.toLocaleString()}pts`,
                    swapOrder: true,
                  },
                  link: {
                    text: challenge.completed ? 'Completed' : 'Incomplete',
                    color: challenge.completed ? 'greenprime' : 'redprime',
                  },
                }}
              />
            ))}
          </Cards>
        </Fragment>
      );
    }

    return null;
  });
};

export default Challenges;
