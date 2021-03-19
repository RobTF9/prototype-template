import React from 'react';
import PropTypes from 'prop-types';
import { QueryClient, QueryClientProvider } from 'react-query';
import ManageEvent from '../../components/ManageEvent';
import { PermissionsProvider } from './PermissionsContext';

const queryClient = new QueryClient();

export default function AppWrapper({
  organisation,
  event,
  challenges,
  players,
  stats,
  instructors,
  packages,
  user: { displayName },
  config,
  links,
  permissions,
  wsEndpoint,
  jwt,
  timezonesGroupedByOffset,
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <PermissionsProvider {...{ initialPermissions: permissions }}>
        <ManageEvent
          {...{
            organisation,
            event,
            challenges,
            players,
            stats,
            instructors,
            packages,
            displayName,
            config,
            links,
            wsEndpoint,
            jwt,
            timezonesGroupedByOffset,
          }}
        />
      </PermissionsProvider>
    </QueryClientProvider>
  );
}

AppWrapper.propTypes = {
  organisation: PropTypes.object,
  event: PropTypes.object,
  challenges: PropTypes.object,
  players: PropTypes.object,
  stats: PropTypes.object,
  instructors: PropTypes.array,
  packages: PropTypes.array,
  user: PropTypes.object,
  config: PropTypes.object,
  links: PropTypes.object,
  permissions: PropTypes.array,
  wsEndpoint: PropTypes.string,
  jwt: PropTypes.string,
  timezonesGroupedByOffset: PropTypes.array,
};
