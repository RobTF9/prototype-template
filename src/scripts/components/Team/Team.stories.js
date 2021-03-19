/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Team from '.';
import { EventProvider } from '../../common/EventContext';

export default {
  title: 'Team',
  component: Team,
};

const Template = args => <Team {...args} />;

const InviteOnlyEventDecorator = Story => (
  <EventProvider {...{ eventData: { isInviteOnly: true } }}>
    <Story />
  </EventProvider>
);

const OpenEventDecorator = Story => (
  <EventProvider {...{ eventData: { isInviteOnly: false } }}>
    <Story />
  </EventProvider>
);

export const YourTeamPreCreated = Template.bind({});
YourTeamPreCreated.args = {
  id_hash: 'yourTeamId',
  name: 'H4ckers',
  membershipTeam: { id_hash: 'yourTeamId' },
  players: [{}],
  permissions: { can_edit: false, can_join: false },
};
YourTeamPreCreated.decorators = [InviteOnlyEventDecorator];

export const YourTeamOpen = Template.bind({});
YourTeamOpen.args = {
  id_hash: 'yourTeamId',
  name: 'H4ckers',
  membershipTeam: { id_hash: 'yourTeamId', accessCode: 'access code' },
  players: [{}],
  permissions: { can_edit: false, can_join: false },
};
YourTeamOpen.decorators = [OpenEventDecorator];

export const YourTeamOpenCanEdit = Template.bind({});
YourTeamOpenCanEdit.args = {
  id_hash: 'yourTeamId',
  name: 'H4ckers',
  membershipTeam: { id_hash: 'yourTeamId', accessCode: 'access-code' },
  players: [{}],
  permissions: { can_edit: true, can_join: false },
};
YourTeamOpenCanEdit.decorators = [InviteOnlyEventDecorator];

export const TeamPreCreated = Template.bind({});
TeamPreCreated.args = {
  id_hash: 'anotherTeamId',
  name: 'H4ckers',
  membershipTeam: { id_hash: 'yourTeamId' },
  players: [{}, {}],
  permissions: { can_edit: false, can_join: false },
};
TeamPreCreated.decorators = [InviteOnlyEventDecorator];

export const TeamOpenCanJoin = Template.bind({});
TeamOpenCanJoin.args = {
  id_hash: 'anotherTeamId',
  name: 'H4ckers',
  membershipTeam: { id_hash: 'yourTeamId' },
  players: [{}, {}],
  permissions: { can_edit: false, can_join: true },
};
TeamOpenCanJoin.decorators = [OpenEventDecorator];
