/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-expanding-textarea';
import { Draggable } from 'react-beautiful-dnd';
import parseMarkdown from '../../../common/parseMarkdown';
import { HintWrapper, Grabber, Header, Actions, Body } from './styles';

function Hint({
  title,
  content,
  show,
  tab = 'write',
  preview = 'Preview content here',
  index,
  dispatch,
  length,
  cannotModify,
}) {
  const id = `hint-${index}`;

  const handlePreview = ({ target: { value } }) => {
    dispatch({
      type: 'UPDATE_HINT',
      payload: { index, name: 'tab', value },
    });

    if (value === 'preview' && content) {
      dispatch({
        type: 'UPDATE_HINT',
        payload: { index, name: 'preview', value: parseMarkdown(content) },
      });
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <HintWrapper
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Grabber {...provided.dragHandleProps} {...{ show: length > 1 }}>
            ::
          </Grabber>
          <Header>
            <div className="detail core-text">{title}</div>
            <Actions>
              <button
                type="button"
                className={`core-link${
                  show ? ' core-link--quiet-emphasis' : ''
                }`}
                onClick={() =>
                  dispatch({
                    type: 'TOGGLE_SHOW_HINT',
                    payload: { index },
                  })
                }
              >
                {show ? 'Hide' : 'Edit'}
              </button>
              <button
                type="button"
                className={`core-link core-link--danger ${
                  cannotModify ? 'core-link--disabled' : ''
                }`}
                onClick={() => {
                  dispatch({
                    type: 'UPDATE_HINT',
                    payload: { index, name: 'show', value: false },
                  });
                  dispatch({ type: 'REMOVE_HINT', payload: index });
                }}
              >
                Remove
              </button>
            </Actions>
          </Header>
          <Body {...{ show }}>
            <div className="field">
              <label htmlFor={`hints[${index}][title]`} className="label">
                Title
              </label>

              <input
                id={`hints[${index}][title]`}
                className="input-text"
                type="text"
                name={`hints[${index}][title]`}
                autoComplete="off"
                value={title}
                onChange={e =>
                  dispatch({
                    type: 'UPDATE_HINT',
                    payload: {
                      index,
                      name: 'title',
                      value: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="tabs">
              <label className="label" htmlFor={`hints[${index}][content]`}>
                Content
              </label>

              <div className="tab tab--write">
                <input
                  type="radio"
                  className="radio-input"
                  name={`tab-${id}`}
                  id={`tab-write-${id}`}
                  value="write"
                  checked={tab === 'write'}
                  onChange={e => handlePreview(e)}
                />

                <label htmlFor={`tab-write-${id}`} className="radio-label">
                  Write
                </label>

                <div className="content">
                  <Textarea
                    id={`hints[${index}][content]`}
                    name={`hints[${index}][content]`}
                    className="input-textarea"
                    onChange={e =>
                      dispatch({
                        type: 'UPDATE_HINT',
                        payload: {
                          index,
                          name: 'content',
                          value: e.target.value,
                        },
                      })
                    }
                    value={content}
                    rows={2}
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
                  name={`tab-${id}`}
                  id={`tab-preview-${id}`}
                  value="preview"
                  checked={tab === 'preview'}
                  onChange={e => handlePreview(e)}
                />

                <label htmlFor={`tab-preview-${id}`} className="radio-label">
                  Preview
                </label>

                <div className="content content--preview">
                  <div
                    className="preview"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: preview }}
                  />
                </div>
              </div>
            </div>
          </Body>
        </HintWrapper>
      )}
    </Draggable>
  );
}

Hint.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  show: PropTypes.bool,
  tab: PropTypes.string,
  preview: PropTypes.string,
  index: PropTypes.number,
  dispatch: PropTypes.func,
  length: PropTypes.number,
  cannotModify: PropTypes.bool,
};

export default Hint;
