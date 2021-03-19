import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { ChallengesEmptyState } from './styles';
import { usePermissions } from '../../pages/newManageEvent/PermissionsContext';
import Signal from '../Signal';

function EmptyChallenges({ availablePackages }) {
  const permissions = usePermissions();
  const selectedIndex = availablePackages.findIndex(pack => pack.selected);
  const options = availablePackages.map(availablePackage => ({
    value: availablePackage.id,
    label: availablePackage.name,
  }));
  const [value, setValue] = useState(options[selectedIndex]);

  const submit = e => {
    e.preventDefault();

    // TODO come back and write this when PATCH endpoint done
    console.log({ value });
  };

  return (
    <ChallengesEmptyState>
      <div className="wrapper">
        <h2 className="core-heading core-heading--secondary">
          No package selected
        </h2>
        {!permissions.includes('organisation.schedule') && (
          <Signal
            {...{
              reasons: [`You don’t have permission to change the package`],
              center: true,
              severity: 'warning',
            }}
          />
        )}
        <p className="core-text core-text--secondary sub-text">
          You will not be able to mark this event ready until a package has been
          selected.
        </p>
        <form className="core-form" onSubmit={e => submit(e)}>
          <fieldset disabled={!permissions.includes('organisation.schedule')}>
            <div className="field">
              <label className="label" htmlFor="package">
                Package
              </label>
              <div className="select">
                <Select
                  {...{
                    id: 'package',
                    name: 'package',
                    classNamePrefix: 'react-select',
                    options,
                    value,
                    onChange: val => setValue(val),
                    isDisabled: !permissions.includes('organisation.schedule'),
                  }}
                />
              </div>
            </div>
            <div className="actions">
              <input
                type="submit"
                value="Update package"
                className="core-button"
              />
            </div>
          </fieldset>
        </form>
      </div>
    </ChallengesEmptyState>
  );
}

EmptyChallenges.propTypes = {
  availablePackages: PropTypes.array,
};

export default EmptyChallenges;
