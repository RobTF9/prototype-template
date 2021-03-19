/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InlineField from '../../InlineField';
import Radios from '../../InlineField/Radios';
import { usePermissions } from '../../../pages/newManageEvent/PermissionsContext';
import {
  participationMode as pModeEnum,
  eventMembershipMode,
} from '../../../common/enums';

function getOriginalData(participation_mode, membership_mode) {
  if (participation_mode === pModeEnum.TEAM) {
    return '2';
  }

  if (membership_mode === eventMembershipMode.LIMITED) {
    return '3';
  }

  return '1';
}

function ParticipationMode({ participation_mode, membership_mode }) {
  const originalData = getOriginalData(participation_mode, membership_mode);
  const [pMode, setPMode] = useState(originalData);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [warning, setWarning] = useState('');
  const permissions = usePermissions();

  useEffect(() => {
    if (open) {
      setStatus('READY');
    }

    if (!open) {
      setWarning('');
    }
  }, [open]);

  function submit(e) {
    e.preventDefault();

    setOpen(false);
    setStatus('LOADING');

    setTimeout(() => {
      setPMode(originalData);
      setStatus('ERROR');
    }, 3000);
  }

  function setOriginalValue() {
    setPMode(originalData);
  }

  const options = [
    {
      value: '1',
      label: 'Individual',
      id: 'participation-individual',
    },
    { value: '2', label: 'Teams', id: 'participation-teams' },
    {
      value: '3',
      label: 'Individual limited',
      id: 'participation-individual-limited',
    },
  ];

  return (
    <InlineField
      {...{
        open,
        setOpen,
        setOriginalValue,
        status,
        submit,
        errors: {},
        name: 'participation_mode',
        label: <label className="label">Participation Mode</label>,
        actionVariants: {
          visible: { opacity: 1, height: 'auto', marginTop: '10px' },
          hidden: { opacity: 0, height: 0, marginTop: 0 },
        },
      }}
    >
      <Radios
        {...{
          name: 'participation_mode',
          open,
          setOpen,
          status,
          options,
          value: pMode,
          setValue: setPMode,
          disabled: !permissions.includes('organisation.schedule'),
          handleChange: ({ target: { value: inputValue } }) => {
            // Set warning if they are switching from team to individial
            if (
              parseInt(originalData) === pModeEnum.TEAM &&
              parseInt(inputValue) !== pModeEnum.TEAM
            ) {
              setWarning(
                "Switching participation mode to individual will delete all teams you've added."
              );
            } else {
              setWarning('');
            }

            setPMode(inputValue);
          },
          warning,
        }}
      />
    </InlineField>
  );
}

ParticipationMode.propTypes = {
  participation_mode: PropTypes.number,
  membership_mode: PropTypes.number,
};

export default ParticipationMode;
