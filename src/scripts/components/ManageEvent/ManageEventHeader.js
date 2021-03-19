import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import Header from '../Header';
import InlineField from '../InlineField';
import Title from '../InlineField/Title';
import Stats from '../HeaderSections/Stats';
import ManageEventStatus from '../HeaderSections/ManageEventStatus';
import { eventStatus } from '../../common/enums';
import jsonRequest from '../../common/jsonRequest';
import {
  usePermissions,
  usePermissionsDispatch,
} from '../../pages/newManageEvent/PermissionsContext';

function ManageEventHeader({ eventData, stats }) {
  const queryClient = useQueryClient();
  const { data } = eventData;
  const { id, name, status: eStatus } = data;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    errors,
    clearError,
  } = useForm();
  const permissions = usePermissions();
  const dispatch = usePermissionsDispatch();

  function submit(formData) {
    console.log({ formData });

    setOpen(false);
    setStatus('LOADING');

    setTimeout(() => {
      setValue('title', name);
      setStatus('ERROR');
    }, 3000);
  }

  function setOriginalValue() {
    setValue('title', name);
  }

  useEffect(() => {
    setValue('title', name);
  }, [name, setValue]);

  const { data: statsData } = useQuery(
    'stats',
    async () => {
      const response = await jsonRequest(`/api/event/${id}/stats`);
      return response.json();
    },
    {
      refetchInterval: 30000,
      initialData: stats,
      onSuccess: newData => {
        dispatch({
          type: 'UPDATE',
          payload: newData.permissions,
        });
      },
    }
  );

  // Invalidate challenges query when attempts change
  useEffect(() => {
    queryClient.invalidateQueries('challenges');
  }, [queryClient, statsData.challenge_attempts]);

  // Invalidate players query when attempts, invites or players change
  useEffect(() => {
    queryClient.invalidateQueries('players');
  }, [
    queryClient,
    statsData.challenge_attempts,
    statsData.number_of_invites,
    statsData.number_of_players,
  ]);

  return (
    <Header
      {...{
        title: (
          <InlineField
            {...{
              open,
              setOpen,
              setOriginalValue,
              status,
              submit: handleSubmit(submit),
              errors,
              name: 'title',
              actionVariants: {
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: -20 },
              },
              clearError,
              formAlign: 'center',
            }}
          >
            <Title
              {...{
                open,
                setOpen,
                status,
                register,
                watch,
                originalData: name,
                name: 'title',
                submit: handleSubmit(submit),
                disabled: !permissions.includes('organisation.schedule'),
              }}
            />
          </InlineField>
        ),
        scrollableInfo: false,
        breakpoint: 960,
      }}
    >
      {(eStatus === eventStatus.STARTED ||
        eStatus === eventStatus.PAUSED ||
        eStatus === eventStatus.FINISHED) && (
        <Stats
          {...{
            headers: ['Active players', 'Correct attempts', 'Total attempts'],
            data: [
              statsData ? statsData.active_players : null,
              statsData ? statsData.successful_attempts : null,
              statsData ? statsData.challenge_attempts : null,
            ],
            hideMobile: true,
          }}
        />
      )}
      <ManageEventStatus {...{ status: eStatus, noBorderMobile: true }} />
    </Header>
  );
}

ManageEventHeader.propTypes = {
  eventData: PropTypes.object,
  stats: PropTypes.object,
};

export default ManageEventHeader;
