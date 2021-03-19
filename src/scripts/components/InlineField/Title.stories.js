import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InlineField from '.';
import Title from './Title';

const Lorum = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in sem eget
    felis varius posuere eu ut neque. Interdum et malesuada fames ac ante ipsum
    primis in faucibus. In purus felis, placerat id eros nec, suscipit efficitur
    risus. Nam posuere gravida faucibus. Curabitur porta vel odio quis
    porttitor. Donec urna diam, aliquam sit amet nunc cursus, pellentesque
    luctus nulla. Etiam molestie lorem justo, a fermentum tellus commodo quis.
    Morbi sagittis ipsum et nisi lobortis placerat. Pellentesque enim magna,
    aliquam ut convallis non, porttitor sed nibh. Nulla volutpat ante sit amet
    diam pharetra suscipit. Nullam auctor, felis ut interdum rutrum, augue nisl
    tincidunt lorem, vel blandit erat diam id lacus. Vivamus sem massa,
    tincidunt a vehicula egestas, scelerisque in urna. Nullam interdum diam
    ligula, quis sagittis mi ultrices at. Phasellus non ex sed lacus iaculis
    interdum eu a diam. Cras et condimentum sem, ut fermentum libero.
  </p>
);

export default {
  title: 'Inline Field/Title',
};

export const SuccessOnSave = () => {
  const originalData = 'Event title';
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const { register, watch, handleSubmit, setValue, errors } = useForm();

  function submit(formData) {
    console.log({ formData });

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
    setValue('title', originalData);
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          height: '60px',
          padding: '10px',
        }}
      >
        <InlineField
          {...{
            open,
            setOpen,
            setOriginalValue,
            status,
            submit: handleSubmit(submit),
            errors,
            name: 'title',
          }}
        >
          <Title
            {...{
              open,
              setOpen,
              status,
              register,
              watch,
              originalData,
              name: 'title',
              submit: handleSubmit(submit),
            }}
          />
        </InlineField>
      </div>

      <p style={{ fontWeight: '700' }}>
        The following content is to check the overlay covers the rest of the
        page and scrolling is disabled
      </p>
      {[...Array(10).keys()].map(lorum => (
        <Lorum key={lorum} />
      ))}
    </div>
  );
};

export const ErrorOnSave = () => {
  const originalData = 'Event title';
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const { register, watch, handleSubmit, setValue, errors } = useForm();

  function submit(formData) {
    console.log({ formData });

    setOpen(false);
    setStatus('LOADING');

    setTimeout(() => {
      setStatus('ERROR');
    }, 3000);
  }

  function setOriginalValue() {
    setValue('title', originalData);
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          height: '60px',
          padding: '10px',
        }}
      >
        <InlineField
          {...{
            open,
            setOpen,
            setOriginalValue,
            status,
            submit: handleSubmit(submit),
            errors,
            name: 'title',
          }}
        >
          <Title
            {...{
              open,
              setOpen,
              status,
              register,
              watch,
              originalData,
              name: 'title',
              submit: handleSubmit(submit),
            }}
          />
        </InlineField>
      </div>

      <p style={{ fontWeight: '700' }}>
        The following content is to check the overlay covers the rest of the
        page and scrolling is disabled
      </p>
      {[...Array(10).keys()].map(lorum => (
        <Lorum key={lorum} />
      ))}
    </div>
  );
};
