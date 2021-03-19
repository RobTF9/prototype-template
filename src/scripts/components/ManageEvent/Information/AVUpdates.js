import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';
import Switch from '../../Switch';
import { usePermissions } from '../../../pages/newManageEvent/PermissionsContext';

function AVUpdates({ originalData }) {
  const [avUpdates, setAvUpdates] = useState(originalData);
  const [status, setStatus] = useState('');
  const permissions = usePermissions();

  function submit() {
    setStatus('LOADING');

    setTimeout(() => {
      setStatus('ERROR');
      setAvUpdates(originalData);
    }, 3000);
  }

  function handleChange(e) {
    const { checked } = e.target;

    setAvUpdates(checked);
    submit();
  }

  return (
    <Field {...{ status, showStatus: false }}>
      <Switch
        {...{
          id: 'scoring_events_enabled',
          name: 'scoring_events_enabled',
          label: 'Enable updates for the A/V API?',
          isOn: avUpdates,
          handleChange,
          disabled:
            !permissions.includes('organisation.schedule') ||
            status === 'LOADING',
          status,
        }}
      />
    </Field>
  );
}

AVUpdates.propTypes = {
  originalData: PropTypes.bool,
};

export default AVUpdates;
