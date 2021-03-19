/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';
import { usePermissions } from '../../../pages/newManageEvent/PermissionsContext';
import TimezoneSelect from '../../TimezoneSelect';

function Timezone({ event, timezonesGroupedByOffset }) {
  function getGroupAndTimezoneIndex() {
    for (let i = 0; i < timezonesGroupedByOffset.length; i += 1) {
      const group = timezonesGroupedByOffset[i];

      for (let j = 0; j < group.options.length; j += 1) {
        const tz = group.options[j];
        if (tz.value === event.timezone) {
          return [i, j];
        }
      }
    }

    return null;
  }

  const indexes = useMemo(getGroupAndTimezoneIndex, [
    event.timezone,
    timezonesGroupedByOffset,
  ]);

  const [timezone, setTimezone] = useState(
    indexes ? timezonesGroupedByOffset[indexes[0]].options[indexes[1]] : null
  );
  const [status, setStatus] = useState('');
  const permissions = usePermissions();

  function submit() {
    setStatus('LOADING');

    setTimeout(() => {
      setStatus('SUCCESS');

      setTimeout(() => {
        setStatus('READY');
      }, 3000);
    }, 3000);
  }

  return (
    <Field
      {...{
        label: 'Timezone',
        status,
      }}
    >
      <TimezoneSelect
        {...{
          onMenuOpen: () => {
            setStatus('READY');
          },
          options: timezonesGroupedByOffset,
          timezone,
          setTimezone,
          disabled:
            !permissions.includes('organisation.schedule') ||
            status === 'LOADING',
          submit,
        }}
      />
    </Field>
  );
}

Timezone.propTypes = {
  event: PropTypes.object,
  timezonesGroupedByOffset: PropTypes.array,
};

export default Timezone;
