import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Field from '../Field';
import Switch from '../../Switch';
import { usePermissions } from '../../../pages/newManageEvent/PermissionsContext';
import { eventCodeMode } from '../../../common/enums';
import CoreColors from '../../../common/coreColors';

const EventCode = styled.div`
  background: ${CoreColors.greyuberdark};
  border-radius: 3px;
  margin: 8px 0;
  padding: 2px 10px;
  width: 100%;
`;

function InviteCode({ originalData, code }) {
  const [codeMode, setCodeMode] = useState(originalData);
  const [status, setStatus] = useState('');
  const permissions = usePermissions();

  function submit() {
    setStatus('LOADING');

    setTimeout(() => {
      setStatus('ERROR');
      setCodeMode(originalData);
    }, 3000);
  }

  function handleChange(e) {
    const { checked } = e.target;
    const value = checked ? eventCodeMode.OPEN : eventCodeMode.INVITE_ONLY;

    setCodeMode(value);
    submit();
  }

  return (
    <Field {...{ status, showStatus: false, formWrap: 'wrap' }}>
      <Switch
        {...{
          id: 'invite_code',
          name: 'invite_code',
          label: 'Generate an invite code?',
          isOn: codeMode === eventCodeMode.OPEN,
          handleChange,
          disabled:
            !permissions.includes('organisation.schedule') ||
            status === 'LOADING',
          status,
        }}
      />
      {!!code && (
        <EventCode>
          <span className="core-text core-text--tertiary core-text--warning">
            {code}
          </span>
        </EventCode>
      )}
    </Field>
  );
}

InviteCode.propTypes = {
  originalData: PropTypes.number,
  code: PropTypes.string,
};

export default InviteCode;
