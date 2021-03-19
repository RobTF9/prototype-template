/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import Signal from '../Signal';
import { usePermissions } from '../../pages/newManageEvent/PermissionsContext';
import Limit from '../Limit';

function AddPlayer({
  submit,
  status,
  serverErrors,
  errors,
  register,
  actions,
  watch,
  setValue,
}) {
  const permissions = usePermissions();
  const REAL_NAME_LIMIT = 100;

  const realNameMask = realName => realName.substr(0, REAL_NAME_LIMIT);

  return (
    <form className="core-form" onSubmit={submit} noValidate>
      <fieldset
        disabled={
          status === 'LOADING' || !permissions.includes('event.player.add')
        }
        aria-busy={status === 'LOADING'}
      >
        {status === 'ERROR' && (
          <Signal
            {...{
              reasons: [
                `There was a problem - ${
                  Object.entries(serverErrors).length !== 0
                    ? 'please fix the errors below'
                    : 'please try adding this player again'
                }`,
              ],
              center: true,
              severity: 'danger',
              shallow: true,
            }}
          />
        )}
        <div className="field">
          <label htmlFor="real_name" className="label">
            Real name
          </label>
          <input
            type="text"
            name="real_name"
            id="real_name"
            className={`input-text ${(errors.real_name ||
              serverErrors.real_name) &&
              'input-text--danger'}`}
            ref={register({
              minLength: 1,
              maxLength: {
                value: REAL_NAME_LIMIT,
                message: `Real name must not be more than ${REAL_NAME_LIMIT} characters`,
              },
            })}
            onChange={e => setValue('real_name', realNameMask(e.target.value))}
          />
          <Limit
            {...{ limit: REAL_NAME_LIMIT, value: watch('real_name') || '' }}
          />
          {errors.real_name && (
            <div className="tip tip--danger">{errors.real_name.message}</div>
          )}
          {typeof serverErrors.real_name !== 'undefined' &&
            serverErrors.real_name.map(serverError => (
              <div className="tip tip--danger" key={serverError}>
                {serverError}
              </div>
            ))}
          <div className="tip">
            Note that this will be overwritten by the real name the account
            holder with the below email has added
          </div>
        </div>
        <div className="field">
          <label htmlFor="email_address" className="label label--required">
            Email
          </label>
          <input
            type="email"
            name="email_address"
            id="email_address"
            className={`input-text ${(errors.email_address ||
              serverErrors.email_address) &&
              'input-text--danger'}`}
            ref={register({
              required: "Please enter the player's email address",
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Please enter a valid email address',
              },
              maxLength: {
                value: 128,
                message: 'Email Address must not be more than 128 characters',
              },
            })}
          />
          {errors.email_address && (
            <div className="tip tip--danger">
              {errors.email_address.message}
            </div>
          )}
          {typeof serverErrors.email_address !== 'undefined' &&
            serverErrors.email_address.map(serverError => (
              <div className="tip tip--danger" key={serverError}>
                {serverError}
              </div>
            ))}
        </div>
        <div className="field">
          <label htmlFor="user_reference" className="label">
            Reference
          </label>
          <input
            type="text"
            name="user_reference"
            id="user_reference"
            className={`input-text ${(errors.user_reference ||
              serverErrors.user_reference) &&
              'input-text--danger'}`}
            ref={register({
              maxLength: {
                value: 255,
                message: 'User reference must not be more than 255 characters',
              },
            })}
          />
          {errors.user_reference && (
            <div className="tip tip--danger">
              {errors.user_reference.message}
            </div>
          )}
          {typeof serverErrors.user_reference !== 'undefined' &&
            serverErrors.user_reference.map(serverError => (
              <div className="tip tip--danger" key={serverError}>
                {serverError}
              </div>
            ))}
        </div>
        <div className="actions">{actions}</div>
      </fieldset>
    </form>
  );
}

AddPlayer.propTypes = {
  submit: PropTypes.func,
  status: PropTypes.string,
  serverErrors: PropTypes.object,
  errors: PropTypes.object,
  register: PropTypes.func,
  actions: PropTypes.object,
  watch: PropTypes.func,
  setValue: PropTypes.func,
};

export default AddPlayer;
