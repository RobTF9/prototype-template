import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';
import Checkbox from '../../Checkbox';
import { usePermissions } from '../../../pages/newManageEvent/PermissionsContext';

function AllowJoinAfterStart({ originalData }) {
  const [allowJoin, setAllowJoin] = useState(originalData);
  const [status, setStatus] = useState('');
  const permissions = usePermissions();

  function submit() {
    setStatus('LOADING');

    setTimeout(() => {
      setStatus('ERROR');
      setAllowJoin(originalData);
    }, 3000);
  }

  function handleChange(e) {
    const { checked } = e.target;

    setAllowJoin(!!checked);
    submit();
  }

  return (
    <Field {...{ status }}>
      <Checkbox
        {...{
          id: 'allow_players_to_join_after_start',
          name: 'allow_players_to_join_after_start',
          label: 'Allow joining after event has started',
          value: 1,
          checked: allowJoin,
          handleChange,
          disabled:
            !permissions.includes('organisation.schedule') ||
            status === 'LOADING',
        }}
      />
    </Field>
  );
}

AllowJoinAfterStart.propTypes = {
  originalData: PropTypes.bool,
};

export default AllowJoinAfterStart;
