/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { usePermissions } from '../../../../pages/newManageEvent/PermissionsContext';
import parseMarkdown from '../../../../common/parseMarkdown';
import Modal from '../../../Modal';
import Field from '../../Field';
import { Wrapper } from './styles';

function CodeOfConduct({ originalData }) {
  const [codeOfConduct, setCodeOfConduct] = useState(originalData);
  const [status, setStatus] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const permissions = usePermissions();
  const [tab, setTab] = useState(
    permissions.includes('organisation.schedule') ? 'write' : 'preview'
  );

  function submit(e) {
    e.preventDefault();
    setModalOpen(false);
    setStatus('LOADING');

    setTimeout(() => {
      setStatus('ERROR');
    }, 3000);
  }

  function handleChange(e) {
    setCodeOfConduct(e.target.value);
  }

  function handleTabChange(e) {
    setTab(e.target.value);
  }

  return (
    <Field {...{ status }}>
      <button
        {...{
          type: 'button',
          onClick: () => {
            if (status !== 'LOADING') {
              setModalOpen(!modalOpen);
            }
          },
          className: 'core-link',
        }}
      >
        Code of Conduct
      </button>
      <Modal
        {...{
          open: modalOpen,
          setOpen: setModalOpen,
          portal: 'manage-event-modal',
        }}
      >
        <Wrapper>
          <form className="core-form" onSubmit={e => submit(e)}>
            <div className="core-heading core-heading--quaternary">
              Code of conduct
            </div>
            <div className="tabs">
              <div className="tab tab--write">
                <input
                  type="radio"
                  className="radio-input"
                  name="tabbed"
                  id="tab-write"
                  value="write"
                  checked={tab === 'write'}
                  onChange={e => handleTabChange(e)}
                  disabled={!permissions.includes('organisation.schedule')}
                />

                <label htmlFor="tab-write" className="radio-label">
                  Write
                </label>

                <div className="content">
                  <textarea
                    className="input-textarea"
                    name="code_of_conduct"
                    id="code_of_conduct"
                    value={codeOfConduct}
                    onChange={e => handleChange(e)}
                    required
                  />

                  <div className="tip">
                    This accepts standard markdown for formatting
                  </div>
                </div>
              </div>

              <div className="tab tab--preview">
                <input
                  type="radio"
                  className="radio-input"
                  name="tabbed"
                  id="tab-preview"
                  value="preview"
                  checked={tab === 'preview'}
                  onChange={e => handleTabChange(e)}
                  disabled={!permissions.includes('organisation.schedule')}
                />

                <label htmlFor="tab-preview" className="radio-label">
                  Preview
                </label>

                <div className="content content--preview">
                  <div
                    className="preview"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdown(codeOfConduct),
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="actions-wrapper">
              <AnimatePresence>
                {codeOfConduct !== originalData && (
                  <motion.div
                    {...{
                      className:
                        'unsaved core-text core-text--tertiary core-text--warning',
                      initial: 'hidden',
                      animate: 'visible',
                      exit: 'hidden',
                      variants: {
                        hidden: { opacity: 0, height: 0 },
                        visible: { opacity: 1, height: 'auto' },
                      },
                      transition: {
                        type: 'spring',
                        damping: 300,
                        stiffness: 550,
                      },
                      key: 'unsaved-changes-tip',
                    }}
                  >
                    The code of conduct has unsaved changes
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="actions">
                {permissions.includes('organisation.schedule') && (
                  <input
                    type="submit"
                    className="core-button core-button--primary core-button--smallest"
                    value="Save"
                  />
                )}
                <button
                  type="button"
                  className="core-button core-button--quiet core-button--smallest"
                  onClick={() => setModalOpen(false)}
                >
                  {!permissions.includes('organisation.schedule')
                    ? 'Close'
                    : 'Cancel'}
                </button>
              </div>
            </div>
          </form>
        </Wrapper>
      </Modal>
    </Field>
  );
}

CodeOfConduct.propTypes = {
  originalData: PropTypes.string,
};

export default CodeOfConduct;
