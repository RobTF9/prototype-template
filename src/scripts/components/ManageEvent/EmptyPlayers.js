import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { PlayerEmptyState } from './styles';
import AddPlayer from './AddPlayer';
import {
  usePermissions,
  usePermissionsDispatch,
} from '../../pages/newManageEvent/PermissionsContext';
import jsonRequest from '../../common/jsonRequest';
import Signal from '../Signal';

function EmptyPlayers({ orgId, eventId, config }) {
  const permissions = usePermissions();
  const queryClient = useQueryClient();
  const dispatch = usePermissionsDispatch();
  const { register, handleSubmit, errors, watch, setValue } = useForm();
  const [status, setStatus] = useState('READY');
  const [serverErrors, setServerErrors] = useState({});
  const { csrfNameKey, csrfValueKey, csrfName, csrfValue } = config;

  const submit = async formData => {
    // Reset state and set to loading
    setServerErrors({});
    setStatus('LOADING');

    try {
      const response = await jsonRequest(`/api/event/${eventId}/players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          [csrfNameKey]: csrfName,
          [csrfValueKey]: csrfValue,
        }),
      });
      const data = await response.json();

      // Update permissions in any case
      if (data.permissions) {
        dispatch({
          type: 'UPDATE',
          payload: data.permissions,
        });
      }

      // Error state
      if (data.errors) {
        setStatus('ERROR');
        setServerErrors(data.errors);
      }

      // Success - so refresh players list
      if (response.status === 201) {
        queryClient.invalidateQueries('players');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  return (
    <PlayerEmptyState>
      <div className="wrapper">
        <h2 className="core-heading core-heading--secondary">Add player</h2>
        {permissions.includes('event.player.add') ? (
          <p className="core-text core-text--secondary add-player-subtext">
            You haven’t added any players yet, you can either add them by using
            the form below or by uploading a CSV. Alternatively, generate an
            event code and send it out.
          </p>
        ) : (
          <Signal
            {...{
              reasons: ['You don’t have permission to add new players'],
              center: true,
              severity: 'warning',
            }}
          />
        )}
        <AddPlayer
          {...{
            submit: handleSubmit(submit),
            status,
            serverErrors,
            errors,
            register,
            actions: (
              <input
                type="submit"
                value={`Add${status === 'LOADING' ? 'ing' : ''} player`}
                className="core-button"
              />
            ),
            watch,
            setValue,
          }}
        />
        {permissions.includes('event.csv.manage') && (
          <div className="csv-link-wrapper">
            <a
              href={`/organisation/${orgId}/event/${eventId}/manage/players/csv`}
              className="core-link"
            >
              Manage with CSV
            </a>
          </div>
        )}
      </div>
    </PlayerEmptyState>
  );
}

EmptyPlayers.propTypes = {
  orgId: PropTypes.string,
  eventId: PropTypes.string,
  config: PropTypes.object,
};

export default EmptyPlayers;
