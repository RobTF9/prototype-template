import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { AddPlayerModalWrapper } from './styles';
import AddPlayer from './AddPlayer';
import { usePermissionsDispatch } from '../../pages/newManageEvent/PermissionsContext';
import jsonRequest from '../../common/jsonRequest';

function AddPlayerModal({ eventId, config, setAddPlayerModalOpen }) {
  const queryClient = useQueryClient();
  const dispatch = usePermissionsDispatch();
  const { register, handleSubmit, errors, reset, watch, setValue } = useForm();
  const [status, setStatus] = useState('READY');
  const [serverErrors, setServerErrors] = useState({});
  const [closeOnSubmit, setCloseOnSubmit] = useState(false);
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

        if (closeOnSubmit) {
          setAddPlayerModalOpen(false);
        } else {
          reset();
          setStatus('READY');
        }
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  return (
    <AddPlayerModalWrapper>
      <div className="core-heading core-heading--tertiary">Add Player</div>
      <AddPlayer
        {...{
          submit: handleSubmit(submit),
          status,
          serverErrors,
          errors,
          register,
          actions: (
            <>
              <button
                type="submit"
                className="core-button"
                onClick={() => {
                  setCloseOnSubmit(false);
                  handleSubmit(submit);
                }}
              >
                Submit and add another
              </button>
              <button
                type="submit"
                className="core-button core-button--quiet-emphasis"
                onClick={() => {
                  setCloseOnSubmit(true);
                  handleSubmit(submit);
                }}
              >
                Submit and close
              </button>
            </>
          ),
          watch,
          setValue,
        }}
      />
    </AddPlayerModalWrapper>
  );
}

AddPlayerModal.propTypes = {
  eventId: PropTypes.string,
  config: PropTypes.object,
  setAddPlayerModalOpen: PropTypes.func,
};

export default AddPlayerModal;
