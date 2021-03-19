/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import InlineField from '../../InlineField';
import Dates from '../../InlineField/Dates';
import { usePermissions } from '../../../pages/newManageEvent/PermissionsContext';

function EventDates({ startsAt, endsAt }) {
  const [startDate, setStartDate] = useState(new Date(startsAt * 1000));
  const [endDate, setEndDate] = useState(new Date(endsAt * 1000));
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const permissions = usePermissions();

  function submit(e) {
    e.preventDefault();

    setOpen(false);
    setStatus('LOADING');

    setTimeout(() => {
      setStatus('SUCCESS');

      setTimeout(() => {
        setStatus('READY');
      }, 3000);
    }, 3000);
  }

  const setOriginalValue = useCallback(() => {
    setStartDate(new Date(startsAt * 1000));
    setEndDate(new Date(endsAt * 1000));
  }, [endsAt, startsAt]);

  useEffect(() => {
    setOriginalValue();
  }, [startsAt, endsAt, setOriginalValue]);

  return (
    <InlineField
      {...{
        open,
        setOpen,
        setOriginalValue,
        status,
        submit,
        errors: {},
        name: 'date',
        label: <label className="label">Date</label>,
        actionVariants: {
          visible: { opacity: 1, height: 'auto', marginTop: '10px' },
          hidden: { opacity: 0, height: 0, marginTop: 0 },
        },
      }}
    >
      <Dates
        {...{
          open,
          setOpen,
          startDate,
          setStartDate,
          endDate,
          setEndDate,
          disabled: !permissions.includes('organisation.schedule'),
        }}
      />
    </InlineField>
  );
}

EventDates.propTypes = {
  startsAt: PropTypes.number,
  endsAt: PropTypes.number,
};

export default EventDates;
