import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import jsonRequest from '../../common/jsonRequest';
import ordinal from '../../common/ordinal';
import Table from '../Table';
import Signal from '../Signal';
import TimeSinceCellRender from './TimeSinceCellRender';
import { Actions, SignalWrapper } from './styles';
import EmptyPlayers from './EmptyPlayers';
import {
  usePermissions,
  usePermissionsDispatch,
} from '../../pages/newManageEvent/PermissionsContext';

export default function Players({
  event,
  players,
  orgId,
  setAddPlayerModalOpen,
  config,
}) {
  const { id, status } = event;
  const dispatch = usePermissionsDispatch();
  const permissions = usePermissions();

  const { error, data } = useQuery(
    'players',
    async () => {
      const response = await jsonRequest(`/api/event/${id}/players/manage`);
      return response.json();
    },
    {
      initialData: players,
      initialStale: true,
      onSuccess: newData => {
        dispatch({
          type: 'UPDATE',
          payload: newData.permissions,
        });
      },
    }
  );

  const columns = useMemo(() => {
    if (!data) return null;

    return data.columns.map(col => {
      switch (col.accessor) {
        case 'joined_event_at':
        case 'role_starts_at':
        case 'role_ends_at':
          return {
            ...col,
            Cell: ({ value }) =>
              value === null
                ? '-'
                : format(new Date(value * 1000), 'HH:mm do LLL yyyy'),
            width: 190,
          };
        case 'email_address':
          return {
            ...col,
            Cell: ({ value }) => value || '-',
            width: 300,
          };
        case 'status':
          return {
            ...col,
            Cell: ({ value }) => value || '-',
            width: 100,
          };
        case 'points':
          return {
            ...col,
            Cell: ({ value }) =>
              typeof value === 'number' ? value.toLocaleString() : '0',
            width: 92,
          };
        case 'position':
          return {
            ...col,
            Cell: ({ value }) => (value ? ordinal(value) : '-'),
            width: 105,
          };
        case 'challenges_completed':
          return {
            ...col,
            Cell: ({ value }) => value || '-',
            width: 188,
          };
        case 'challenges_attempted':
          return {
            ...col,
            Cell: ({ value }) => value || '-',
            width: 188,
          };
        case 'last_capture':
          return {
            ...col,
            eventStatus: status,
            Cell: TimeSinceCellRender,
            width: 190,
          };

        default:
          return { ...col, Cell: ({ value }) => value || '-' };
      }
    });
  }, [data, status]);
  const playersData = useMemo(() => (data ? data.data : null), [data]);

  if (playersData.length) {
    return (
      <>
        <Actions>
          {permissions.includes('event.player.add') && (
            <button
              type="button"
              className="core-button core-button--smallest add-player-button"
              onClick={() => setAddPlayerModalOpen(true)}
            >
              Add player
            </button>
          )}
          {permissions.includes('event.csv.manage') && (
            <a
              href={`/organisation/${orgId}/event/${id}/manage/players/csv`}
              className="core-button core-button--smallest core-button--quiet-emphasis manage-csv-button"
            >
              Manage with CSV
            </a>
          )}
        </Actions>
        {error && (
          <SignalWrapper {...{ breakpoint: 960 }}>
            <Signal
              {...{
                reasons: [
                  'An unexpected error occurred getting the most recent player information - we will try again shortly',
                ],
                center: true,
                severity: 'warning',
                shallow: true,
              }}
            />
          </SignalWrapper>
        )}
        <Table {...{ columns, data: playersData, virtualisedList: true }} />
      </>
    );
  }

  return <EmptyPlayers {...{ orgId, eventId: id, config }} />;
}

Players.propTypes = {
  event: PropTypes.object,
  players: PropTypes.object,
  orgId: PropTypes.string,
  setAddPlayerModalOpen: PropTypes.func,
  config: PropTypes.object,
};
