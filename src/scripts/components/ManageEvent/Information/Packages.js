/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InlineField from '../../InlineField';
import Radios from '../../InlineField/Radios';
import { usePermissions } from '../../../pages/newManageEvent/PermissionsContext';

function Packages({ originalData, packages }) {
  const [selectedPackage, setSelectedPackage] = useState(originalData);
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
      setSelectedPackage(originalData);
      setStatus('ERROR');
    }, 3000);
  }

  function setOriginalValue() {
    setSelectedPackage(originalData);
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
        name: 'package',
        label: <label className="label">Package</label>,
        actionVariants: {
          visible: { opacity: 1, height: 'auto', marginTop: '10px' },
          hidden: { opacity: 0, height: 0, marginTop: 0 },
        },
      }}
    >
      <Radios
        {...{
          name: 'package',
          open,
          setOpen,
          status,
          options: packages.map(pack => ({
            label:
              pack.name === 'No package selected'
                ? 'Choose package later'
                : pack.name,
            id: pack.id,
            value: pack.name,
          })),
          value: selectedPackage,
          setValue: setSelectedPackage,
          disabled: !permissions.includes('organisation.schedule'),
          selectedOptionWarning: selectedPackage === 'No package selected',
        }}
      />
    </InlineField>
  );
}

Packages.propTypes = {
  originalData: PropTypes.string,
  packages: PropTypes.array,
};

export default Packages;
