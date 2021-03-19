import React from 'react';
import Table from '.';

export default {
  title: 'Table',
  component: Table,
  argTypes: {},
};

const Template = args => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Players',
      accessor: 'players',
    },
  ],
  data: [
    {
      name: 'Team A',
      players: 1,
    },
    {
      name: 'Team B',
      players: 3,
    },
    {
      name: 'Team C',
      players: 5,
    },
    {
      name: 'Team D',
      players: 7,
    },
  ],
};
