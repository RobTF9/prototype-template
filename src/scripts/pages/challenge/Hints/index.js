/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { Wrapper, AddButton } from './styles';
import Hint from './Hint';
import hintsReducer from './hintsReducer';

function Hints({ initialHints, initialPenalty, cannotModify }) {
  const [hints, dispatch] = useReducer(hintsReducer, initialHints);

  const onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    dispatch({
      type: 'REORDER',
      payload: result,
    });
  };

  return (
    <>
      {!!hints.length && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="hints">
            {provided => (
              <Wrapper
                ref={provided.innerRef}
                {...provided.droppableProps}
                bottomMargin={cannotModify}
              >
                {hints.map((hint, index) => (
                  <Hint
                    {...{
                      ...hint,
                      index,
                      dispatch,
                      key: `hint-${index}`,
                      length: hints.length,
                      cannotModify,
                    }}
                  />
                ))}
                {provided.placeholder}
              </Wrapper>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {hints.length === 0 && cannotModify && (
        <p className="core-text">No hints have been saved for this challenge</p>
      )}

      {!cannotModify && (
        <AddButton
          className="core-button core-button--quiet-emphasis"
          type="button"
          onClick={() => dispatch({ type: 'ADD_HINT' })}
          margin={!!hints.length}
        >
          Add a{hints.length ? 'nother' : ''} hint
        </AddButton>
      )}

      {!!hints.length && (
        <div className="field">
          <label htmlFor="hint_penalty" className="label">
            Penalty per hint
          </label>
          <input
            id="hint_penalty"
            className="input-text"
            type="number"
            name="hint_penalty"
            autoComplete="off"
            defaultValue={initialPenalty}
            readOnly={cannotModify}
          />
        </div>
      )}
    </>
  );
}

Hints.propTypes = {
  initialHints: PropTypes.array,
  initialPenalty: PropTypes.number,
  cannotModify: PropTypes.bool,
};

export default Hints;
