/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InlineField from '../../InlineField';
import Radios from '../../InlineField/Radios';
import { usePermissions } from '../../../pages/newManageEvent/PermissionsContext';

function Instructors({ originalData, instructors }) {
  const [instructor, setInstructor] = useState(originalData);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const permissions = usePermissions();

  useEffect(() => {
    if (open) {
      setStatus('READY');
    }
  }, [open]);

  function submit(e) {
    e.preventDefault();

    setOpen(false);
    setStatus('LOADING');

    setTimeout(() => {
      setInstructor(originalData);
      setStatus('ERROR');
    }, 3000);
  }

  function setOriginalValue() {
    setInstructor(originalData);
  }

  return (
    <InlineField
      {...{
        open,
        setOpen,
        setOriginalValue,
        status,
        submit,
        errors: {},
        name: 'instructor',
        label: <label className="label">Instructor</label>,
        actionVariants: {
          visible: { opacity: 1, height: 'auto', marginTop: '10px' },
          hidden: { opacity: 0, height: 0, marginTop: 0 },
        },
      }}
    >
      <Radios
        {...{
          name: 'instructor',
          open,
          setOpen,
          status,
          options: instructors.map(inst => ({
            label: inst.display_name,
            id: inst.id,
            value: inst.display_name,
          })),
          value: instructor,
          setValue: setInstructor,
          disabled: !permissions.includes('organisation.schedule'),
        }}
      />
    </InlineField>
  );
}

Instructors.propTypes = {
  originalData: PropTypes.string,
  instructors: PropTypes.array,
};

export default Instructors;
