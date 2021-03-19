const basic = [
  {
    challenges: [
      {
        completed: false,
        id: '12345',
        locked: false,
        points: 100,
        title: 'Challenge 1',
        difficulty: 'Easy',
      },
    ],
    id: '12345',
    label: 'Group 1',
    locked: false,
    unlock: 'unlocked',
    unlockData: {
      percentage: null,
      timed: null,
    },
  },
];

const basicCompleted = [
  {
    challenges: [
      {
        completed: true,
        id: '12345',
        locked: false,
        points: 100,
        title: 'Challenge 1',
        difficulty: 'Easy',
      },
    ],
    id: '12345',
    label: 'Group 1',
    locked: false,
    unlock: 'unlocked',
    unlockData: {
      percentage: null,
      timed: null,
    },
  },
];

const basicLocked = [
  {
    challenges: [
      {
        completed: false,
        id: '12345',
        locked: true,
        points: 100,
        title: 'Challenge 1',
        difficulty: 'Easy',
      },
    ],
    id: '12345',
    label: 'Group 1',
    locked: true,
    unlock: 'progressive',
    unlockData: {
      percentage: 50,
      timed: null,
      groupInclusion: 2,
      groupsToInclude: [
        {
          id: '00000000-0000-0000-0000-000000000000',
          name: 'Previous Group',
        },
      ],
    },
  },
];

const multipleGroups = [
  {
    challenges: [
      {
        completed: false,
        id: '12345',
        locked: false,
        points: 100,
        title: 'Challenge 1',
        difficulty: 'Easy',
      },
    ],
    id: '12345',
    label: 'Group 1',
    locked: false,
    unlock: 'unlocked',
    unlockData: {
      percentage: null,
      timed: null,
    },
  },
  {
    challenges: [
      {
        completed: false,
        id: '23456',
        locked: true,
        points: 500,
        title: 'Challenge 2',
        difficulty: 'Hard',
      },
      {
        completed: false,
        id: '34567',
        locked: true,
        points: 250,
        title: 'Challenge 3',
        difficulty: 'Medium',
      },
      {
        completed: false,
        id: '45678',
        locked: true,
        points: 1000,
        title: 'Challenge 4',
        difficulty: 'Extreme',
      },
    ],
    id: '23456',
    label: 'Group 2',
    locked: true,
    unlock: 'progressive',
    unlockData: {
      percentage: 50,
      timed: null,
      groupInclusion: 2,
      groupsToInclude: [
        {
          id: '00000000-0000-0000-0000-000000000000',
          name: 'Previous Group',
        },
      ],
    },
  },
];

const difficultyGroups = [
  {
    challenges: [
      {
        completed: false,
        id: '12345',
        locked: false,
        points: 100,
        title: 'Challenge 5',
        difficulty: 'Introductory',
      },
    ],
    id: 'introductory',
    label: 'Introductory',
  },
  {
    challenges: [
      {
        completed: false,
        id: '12345',
        locked: false,
        points: 100,
        title: 'Challenge 1',
        difficulty: 'Easy',
      },
    ],
    id: 'easy',
    label: 'Easy',
  },
  {
    challenges: [
      {
        completed: false,
        id: '23456',
        locked: true,
        points: 250,
        title: 'Challenge 2',
        difficulty: 'Medium',
      },
    ],
    id: 'medium',
    label: 'Medium',
  },
  {
    challenges: [
      {
        completed: false,
        id: '34567',
        locked: true,
        points: 500,
        title: 'Challenge 3',
        difficulty: 'Hard',
      },
    ],
    id: 'hard',
    label: 'Hard',
  },
  {
    challenges: [
      {
        completed: false,
        id: '45678',
        locked: true,
        points: 1000,
        title: 'Challenge 4',
        difficulty: 'Extreme',
      },
    ],
    id: 'extreme',
    label: 'Extreme',
  },
];

export { basic, basicCompleted, basicLocked, multipleGroups, difficultyGroups };
