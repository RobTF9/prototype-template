/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import InlineField from '../../InlineField';
import NumberInput from '../../InlineField/NumberInput';
import { usePermissions } from '../../../pages/newManageEvent/PermissionsContext';

function MaxTeams({ originalData }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [cleared] = useState(false);
  const { register, handleSubmit, setValue, errors, clearError } = useForm();
  const permissions = usePermissions();

  function setOriginalValue() {
    setValue('maximum_team_count', originalData);
  }

  function submit(formData) {
    const { maximum_team_count } = formData;
    console.log({ formData });

    if (!maximum_team_count) {
      setValue('maximum_team_count', '');
    }

    setOpen(false);
    setStatus('LOADING');

    setTimeout(() => {
      setOriginalValue();
      setStatus('ERROR');
    }, 3000);
  }

  return (
    <InlineField
      {...{
        open,
        setOpen,
        setOriginalValue,
        status,
        submit: handleSubmit(submit),
        errors,
        name: 'maximum_team_count',
        label: <label className="label">Max no. of teams</label>,
        actionVariants: {
          visible: { opacity: 1, height: 'auto', marginTop: '10px' },
          hidden: { opacity: 0, height: 0, marginTop: 0 },
        },
        validateMessageVariants: {
          visible: {
            opacity: 1,
            height: 'auto',
            marginBottom: 0,
            marginTop: '5px',
          },
          hidden: { opacity: 0, height: 0 },
        },
        clearError,
        noValidate: true,
        customValidationMessages: {
          min: 'Minimum value is 1',
          max: 'Maximum value is 1,000,000',
        },
      }}
    >
      <NumberInput
        {...{
          open,
          setOpen,
          status,
          register,
          originalData,
          name: 'maximum_team_count',
          submit: handleSubmit(submit),
          disabled: !permissions.includes('organisation.schedule'),
          customValidators: {
            min: value => (value ? parseInt(value) >= 1 : true),
            max: value => (value ? parseInt(value) <= 1000000 : true),
          },
          onClear: () => {
            clearError();
            submit({ formData: {} });
          },
        }}
      />
      <motion.p
        {...{
          className: 'core-text core-text--tertiary core-text--warning',
          initial: 'hidden',
          animate: cleared ? 'visible' : 'hidden',
          variants: {
            hidden: { opacity: 0, height: 0, marginBottom: 0 },
            visible: { opacity: 1, height: 'auto' },
          },
          transition: {
            type: 'spring',
            damping: 300,
            stiffness: 550,
          },
        }}
      >
        Participation limit removed
      </motion.p>
    </InlineField>
  );
}

MaxTeams.propTypes = {
  originalData: PropTypes.number,
};

export default MaxTeams;
