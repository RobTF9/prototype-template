import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import jsonRequest from '../../common/jsonRequest';
import Table from '../Table';
import SuccessRateCellRender from './SuccessRateCellRender';
import TimeSinceCellRender from './TimeSinceCellRender';
import FlagCellRender from './FlagCellRender';
import Signal from '../Signal';
import { SignalWrapper } from './styles';
import { usePermissionsDispatch } from '../../pages/newManageEvent/PermissionsContext';
import EmptyChallenges from './EmptyChallenges';

export default function Challenges({ event, challenges, availablePackages }) {
  const { id: eventId, status } = event;

  const dispatch = usePermissionsDispatch();
  const noPackageSelected = availablePackages.find(
    pack => pack.id === '00000000-0000-0000-0000-000000000000'
  ).selected;

  const difficultyGroups = [
    'Introductory',
    'Easy',
    'Medium',
    'Hard',
    'Extreme',
  ];

  const { error, data } = useQuery(
    'challenges',
    async () => {
      const response = await jsonRequest(
        `/api/event/${eventId}/challenges/stats`
      );
      return response.json();
    },
    {
      initialData: challenges,
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
        case 'attempt_success_rate':
        case 'player_success_rate':
          return {
            ...col,
            Cell: SuccessRateCellRender,
          };
        case 'correct_attempts':
        case 'total_attempts':
          return {
            ...col,
            Cell: ({ value }) =>
              value !== null ? parseInt(value).toLocaleString() : '0',
          };
        case 'number_of_active_players':
          return {
            ...col,
            Cell: ({ value }) =>
              value !== null ? parseInt(value).toLocaleString() : '0',
          };
        case 'last_correct_attempt':
        case 'last_attempt':
          return {
            ...col,
            eventStatus: status,
            Cell: TimeSinceCellRender,
          };
        case 'points':
          return {
            ...col,
            Cell: ({ value }) =>
              value !== null ? parseInt(value).toLocaleString() : '0',
          };
        case 'difficulty':
          return {
            ...col,
            Cell: ({ value }) => value || '-',
            sortType: (a, b) => {
              const difficultyA = a.original.difficulty;
              const difficultyB = b.original.difficulty;

              if (
                difficultyGroups.findIndex(d => d === difficultyA) >
                difficultyGroups.findIndex(d => d === difficultyB)
              ) {
                return 1;
              }

              if (
                difficultyGroups.findIndex(d => d === difficultyA) <
                difficultyGroups.findIndex(d => d === difficultyB)
              ) {
                return -1;
              }

              return 0;
            },
          };
        case 'flag':
          return {
            ...col,
            Cell: FlagCellRender,
          };
        case 'unlocked_by_default':
          return {
            ...col,
            Cell: ({ value }) => (value ? 'Yes' : 'No'),
          };

        default:
          return { ...col, Cell: ({ value }) => value || '-' };
      }
    });
  }, [data, difficultyGroups, status]);
  const challengesData = useMemo(() => (data ? data.data : null), [data]);

  if (!noPackageSelected && challengesData.length) {
    return (
      <>
        {error && (
          <SignalWrapper {...{ breakpoint: 960 }}>
            <Signal
              {...{
                reasons: [
                  'An unexpected error occurred getting the most recent challenges information - we will try again shortly',
                ],
                center: true,
                severity: 'warning',
                shallow: true,
              }}
            />
          </SignalWrapper>
        )}
        <Table {...{ columns, data: challengesData }} />
      </>
    );
  }

  return <EmptyChallenges {...{ availablePackages }} />;
}

Challenges.propTypes = {
  event: PropTypes.object,
  challenges: PropTypes.object,
  availablePackages: PropTypes.array,
};
