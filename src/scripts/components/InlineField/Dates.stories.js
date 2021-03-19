/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import InlineField from '.';
import Dates from './Dates';

export default {
  title: 'Inline Field/Dates',
};

export const SuccessOnSave = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');

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

  function setOriginalValue() {
    setStartDate(null);
    setEndDate(null);
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
        name: 'date',
        label: <label className="label">Date</label>,
        actionVariants: {
          visible: { opacity: 1, height: 'auto', marginTop: '10px' },
          hidden: { opacity: 0, height: 0, marginTop: 0 },
        },
      }}
    >
      <Dates
        {...{ open, setOpen, startDate, setStartDate, endDate, setEndDate }}
      />
    </InlineField>
  );
};
