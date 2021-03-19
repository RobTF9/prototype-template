import shuffleSeed from 'shuffle-seed';

export default ({
  challengeGroups,
  isTeamEvent,
  hashedTeamId,
  hashedUserId,
}) => {
  const newGroups = challengeGroups.map(group => ({
    ...group,
    challenges:
      group.order && group.order === 'random'
        ? shuffleSeed.shuffle(
            group.challenges,
            isTeamEvent ? hashedTeamId : hashedUserId
          )
        : group.challenges,
  }));

  return newGroups;
};
