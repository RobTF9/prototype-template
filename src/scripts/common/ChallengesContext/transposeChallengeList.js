/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const { groupUnlockInclusion } = require('../../common/enums');

const checkProgressiveGroupUnlock = ({ challenges, percentage }) => {
  const totalChallenges = challenges.length;
  const completedChallenges = challenges.reduce(
    (acc, chal) => acc + (chal.completed ? 1 : 0),
    0
  );
  const percentComplete = (completedChallenges / totalChallenges) * 100;

  return percentComplete < percentage;
};

const checkManualSequentialUnlock = ({
  challenge,
  challengeIndex,
  challengeCompleted,
  prevChallenge,
}) => {
  if (challengeIndex === 0) {
    return false;
  }

  return (
    !challengeCompleted && !challenge.completed && !prevChallenge.completed
  );
};

const transposeChallengeList = ({ challengeList, completed }) => {
  challengeList.forEach((group, index) => {
    let newLocked = group.locked;
    const {
      percentage,
      unlockAt,
      groupInclusion,
      groupsToInclude,
    } = group.unlockData;

    // If the group unlocks by progression
    if (group.unlock === 'progressive') {
      // If it's not using the new properties for unlock data
      if (
        typeof groupInclusion === 'undefined' &&
        challengeList[index - 1] &&
        challengeList[index - 1].challenges.length
      ) {
        const challenges = challengeList[index - 1].challenges;
        newLocked = checkProgressiveGroupUnlock({ challenges, percentage });
      }

      // If the group unlocks by completing a % in ANY of the specified groups
      if (groupInclusion === groupUnlockInclusion.ANY) {
        const groups = challengeList.filter(grp =>
          groupsToInclude.find(groupToInclude => groupToInclude.id === grp.id)
        );

        const groupPass = groups.some(
          grp =>
            !checkProgressiveGroupUnlock({
              challenges: grp.challenges,
              percentage,
            })
        );

        newLocked = !groupPass;
      }

      // If the group unlocks by completing a % of all challenges in specified groups
      if (groupInclusion === groupUnlockInclusion.ALL) {
        // Get all the challenges from specified groups
        const challenges = challengeList.reduce((acc, grp) => {
          if (
            groupsToInclude.find(groupToInclude => groupToInclude.id === grp.id)
          ) {
            return [...acc, ...grp.challenges];
          }

          return acc;
        }, []);

        newLocked = checkProgressiveGroupUnlock({ challenges, percentage });
      }
    }

    if (group.unlock === 'timed') {
      newLocked = Date.now() < unlockAt * 1000;
    }

    let prevChallenge = {};
    challengeList[index] = {
      ...group,
      challenges: group.challenges.map((challenge, challengeIndex) => {
        const challengeCompleted = completed.find(
          chal => chal.challenge_id === challenge.id
        );

        const newChallenge = {
          ...challenge,
          completed: challengeCompleted ? true : challenge.completed,
          locked:
            group.order === 'manual sequential'
              ? checkManualSequentialUnlock({
                  challenge,
                  challengeIndex,
                  challengeCompleted,
                  prevChallenge,
                })
              : challenge.locked,
          groupLocked: newLocked,
        };

        prevChallenge = newChallenge;
        return newChallenge;
      }),
      locked: newLocked,
    };
  });

  return challengeList;
};

export default transposeChallengeList;
