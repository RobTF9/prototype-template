import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';
import Checkbox from '../../Checkbox';
import { usePermissions } from '../../../pages/newManageEvent/PermissionsContext';

function PublicLeaderboard({ originalData }) {
  const [isPublic, setIsPublic] = useState(originalData);
  const [status, setStatus] = useState('');
  const permissions = usePermissions();

  function submit() {
    setStatus('LOADING');

    setTimeout(() => {
      setStatus('ERROR');
      setIsPublic(originalData);
    }, 3000);
  }

  function handleChange(e) {
    const { checked } = e.target;

    setIsPublic(!!checked);
    submit();
  }

  return (
    <Field {...{ status }}>
      <Checkbox
        {...{
          id: 'visibility',
          name: 'visibility',
          label: 'Public leaderboard',
          value: 1,
          checked: isPublic,
          handleChange,
          disabled:
            !permissions.includes('organisation.schedule') ||
            status === 'LOADING',
        }}
      />
    </Field>
  );
}

PublicLeaderboard.propTypes = {
  originalData: PropTypes.bool,
};

export default PublicLeaderboard;
