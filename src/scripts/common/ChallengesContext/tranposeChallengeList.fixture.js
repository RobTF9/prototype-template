exports.oneGroupOneChallenge = [
  {
    id: 'ef0328c0-98e1-11e9-bde6-636437363238',
    label: 'Group 1',
    locked: false,
    unlock: 'unlocked',
    unlockData: { percentage: null, unlockAt: null },
    challenges: [
      {
        id: '8faacb0c-98e2-11e9-84b6-323835316431',
        title: 'mv',
        points: 250,
        completed: false,
        locked: false,
        difficulty: 'Medium',
      },
    ],
  },
];

exports.twoGroupsTwoChallenges = [
  {
    id: 'ef0328c0-98e1-11e9-bde6-636437363238',
    label: 'Group 1',
    locked: false,
    unlock: 'unlocked',
    unlockData: { percentage: null, unlockAt: null },
    challenges: [
      {
        id: '8faacb0c-98e2-11e9-84b6-323835316431',
        title: 'mv',
        points: 250,
        completed: false,
        locked: false,
        difficulty: 'Medium',
      },
      {
        id: '407c63f6-98e2-11e9-8b8d-646235336131',
        title: 'cp',
        points: 100,
        completed: false,
        locked: false,
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: '12d74dd0-98e2-11e9-8d3a-353430623636',
    label: 'Group 2',
    locked: true,
    unlock: 'progressive',
    unlockData: {
      percentage: 50,
      unlockAt: null,
      groupInclusion: 2,
      groupsToInclude: [
        { id: 'ef0328c0-98e1-11e9-bde6-636437363238', name: 'Group 1' },
      ],
    },
    challenges: [
      {
        id: 'dd171576-98e2-11e9-94db-643066363033',
        title: 'scp 2',
        points: 500,
        completed: false,
        locked: false,
        difficulty: 'Hard',
      },
      {
        id: '8faad05c-98e2-11e9-9e6d-323835316431',
        title: 'scp 1',
        points: 1000,
        completed: false,
        locked: false,
        difficulty: 'Extreme',
      },
    ],
  },
];

exports.timed2ndGroup = [
  {
    id: 'ef0328c0-98e1-11e9-bde6-636437363238',
    label: 'Group 1',
    locked: false,
    unlock: 'unlocked',
    unlockData: { percentage: null, unlockAt: null },
    challenges: [
      {
        id: '8faacb0c-98e2-11e9-84b6-323835316431',
        title: 'mv',
        points: 250,
        completed: false,
        locked: false,
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: '12d74dd0-98e2-11e9-8d3a-353430623636',
    label: 'Group 2',
    locked: true,
    unlock: 'timed',
    unlockData: { percentage: null, unlockAt: 1587559080 },
    challenges: [
      {
        id: 'dd171576-98e2-11e9-94db-643066363033',
        title: 'scp 2',
        points: 500,
        completed: false,
        locked: false,
        difficulty: 'Hard',
      },
    ],
  },
];

exports.manualSequential = [
  {
    id: 'ef0328c0-98e1-11e9-bde6-636437363238',
    label: 'Group 1',
    locked: false,
    unlock: 'unlocked',
    unlockData: { percentage: null, unlockAt: null },
    order: 'manual sequential',
    challenges: [
      {
        id: '8faacb0c-98e2-11e9-84b6-323835316431',
        title: '1',
        points: 250,
        completed: false,
        locked: false,
        difficulty: 'Medium',
      },
      {
        id: '8faacb0c-98e2-11e9-84b6-323835316432',
        title: '2',
        points: 250,
        completed: false,
        locked: true,
        difficulty: 'Medium',
      },
      {
        id: '8faacb0c-98e2-11e9-84b6-323835316433',
        title: '3',
        points: 250,
        completed: false,
        locked: true,
        difficulty: 'Medium',
      },
      {
        id: '8faacb0c-98e2-11e9-84b6-323835316434',
        title: '4',
        points: 250,
        completed: false,
        locked: true,
        difficulty: 'Medium',
      },
    ],
  },
];
