/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from 'react';
import InlineField from '.';
import Radios from './Radios';

export default {
  title: 'Inline Field/Radio Buttons',
  decorators: [
    storyFn => (
      <div className="core-form" style={{ padding: '20px' }}>
        {storyFn()}
      </div>
    ),
  ],
};

const instructors = [
  {
    display_name: 'jrp90',
    id: '12345',
  },
  {
    display_name: 'ntzm',
    id: '23456',
  },
  {
    display_name: 'robtf9',
    id: '34567',
  },
  {
    display_name: 'achambers',
    id: '45678',
  },
];

export const SuccessOnSave = () => {
  const originalData = instructors[0].display_name;
  const [instructor, setInstructor] = useState(originalData);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');

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
      setStatus('SUCCESS');

      setTimeout(() => {
        setStatus('READY');
      }, 3000);
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
          disabled: false,
        }}
      />
    </InlineField>
  );
};

export const ErrorOnSave = () => {
  const originalData = instructors[0].display_name;
  const [instructor, setInstructor] = useState(originalData);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');

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
          disabled: false,
        }}
      />
    </InlineField>
  );
};
