const mixedLeaderboard = [
  {
    id: '12345',
    name: 'Jane Jones',
    running_position: 1,
    percent: 100,
    points: 10000,
  },
  {
    id: '23456',
    name: 'John Smith',
    running_position: 2,
    percent: 75,
    points: 7500,
  },
  {
    id: '34567',
    name: 'The Hacker Collective',
    running_position: 3,
    percent: 32,
    points: 2500,
    team: [
      { id: '12345', name: 'Captain Fantastic', points: 1500 },
      { id: '23456', name: "$('Alert!');", points: 1000 },
    ],
  },
  {
    id: '45678',
    name: 'Anthony C',
    running_position: 4,
    percent: 50,
    points: 5000,
  },
  {
    id: '56789',
    name: 'Null Bites',
    running_position: 5,
    percent: 2,
    points: 200,
    team: [
      { id: '12345', name: 'Foobaa', points: 100 },
      { id: '23456', name: 'Hashbang', points: 100 },
    ],
  },
  {
    id: '67890',
    name: 'James P',
    running_position: 6,
    percent: 10,
    points: 1000,
    you: true,
  },
  {
    id: '78901',
    name: 'Other Team Member',
    running_position: 7,
    percent: 9,
    points: 900,
  },
  {
    id: '89012',
    name: 'Another Team Member',
    running_position: 99,
    percent: 1,
    points: 100,
  },
];

export { mixedLeaderboard };
