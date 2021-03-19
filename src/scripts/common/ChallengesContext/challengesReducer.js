import randomiseChallenges from './randomiseChallenges';
import transposeChallengeList from './transposeChallengeList';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'FETCH_SUCCESS': {
      return {
        ...state,
        loading: false,
        error: false,
        data: randomiseChallenges({
          ...payload,
          challengeGroups: transposeChallengeList({
            challengeList: payload.challengeGroups,
            completed: [],
          }),
        }),
        total: payload.challengeGroups.reduce(
          (acc, group) => acc + group.challenges.length,
          0
        ),
      };
    }
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'REFRESH_CHALLENGES':
      return {
        ...state,
        refresh: !state.refresh,
      };
    case 'CHALLENGE_COMPLETE':
      return {
        ...state,
        data: transposeChallengeList({
          challengeList: state.data,
          ...payload,
        }),
      };
    case 'UNLOCK_GROUP':
      return {
        ...state,
        data: state.data.map(group => ({
          ...group,
          locked: group.id === payload ? false : group.locked,
        })),
      };
    case 'LOCK_CHALLENGE':
      return {
        ...state,
        data: state.data.map(group => ({
          ...group,
          challenges: group.challenges.map(challenge => ({
            ...challenge,
            locked: challenge.id === payload ? true : challenge.locked,
          })),
        })),
      };
    default:
      throw new Error();
  }
};
