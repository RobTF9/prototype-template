import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';
import Checkbox from '../../Checkbox';
import { usePermissions } from '../../../pages/newManageEvent/PermissionsContext';
import { statusUpdateMode } from '../../../common/enums';

function StartAutomatically({ originalData }) {
  const [autoStart, setAutoStart] = useState(originalData);
  const [status, setStatus] = useState('');
  const permissions = usePermissions();

  function submit() {
    setStatus('LOADING');

    setTimeout(() => {
      setStatus('ERROR');
      setAutoStart(originalData);
    }, 3000);
  }

  function handleChange(e) {
    const { checked } = e.target;
    const value = checked ? statusUpdateMode.AUTO : statusUpdateMode.MANUAL;

    setAutoStart(value);
    submit();
  }

  return (
    <Field {...{ status }}>
      <Checkbox
        {...{
          id: 'status-update-mode',
          name: 'status_update_mode',
          label: 'Start automatically',
          value: 1,
          checked: autoStart === statusUpdateMode.AUTO,
          handleChange,
          disabled:
            !permissions.includes('organisation.schedule') ||
            status === 'LOADING',
        }}
      />
    </Field>
  );
}

StartAutomatically.propTypes = {
  originalData: PropTypes.number,
};

export default StartAutomatically;
