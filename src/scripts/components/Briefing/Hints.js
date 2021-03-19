import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getHint from './getHint';
import toggleHint from './toggleHint';

const Hints = ({ hints, url, setData, setHintError, complete, penalty }) => {
  const [loading, setLoading] = useState(false);

  const remainingHints = hints.totalHints - hints.viewedHints.length;

  // Cost text
  let costText = `Revealing a hint ${
    hints.penalty === 0
      ? 'has no point penalty.'
      : `will cost you ${hints.penalty} points.`
  }`;
  if (!remainingHints) {
    costText = 'You have revealed all available hints';
  }

  // Remaining Text
  const remainingText = remainingHints
    ? `You have ${remainingHints} hint${
        remainingHints === 1 ? '' : 's'
      } remaining.`
    : '';

  // Reveal text
  const reveal = complete
    ? `Challenge complete, you used ${hints.viewedHints.length} of ${
        hints.totalHints
      } hints.${penalty ? ` Total penalty ${penalty}pts` : ''}`
    : `${costText} ${remainingText}`;

  return (
    <div className="hints">
      <h3 className="core-heading core-heading--quaternary core-heading--fieldset">
        Hints
      </h3>
      <button
        type="button"
        className={`core-link core-link--flying ${
          loading ? 'core-link--disabled' : ''
        }`}
        onClick={() => getHint({ url, setData, setLoading, setHintError })}
        disabled={
          hints.viewedHints.length === hints.totalHints || loading || complete
        }
      >
        Stuck? Reveal a{hints.viewedHints.length ? 'nother' : ''} hint.
      </button>
      {hints.viewedHints.map((hint, index) => (
        <div className="hint" key={hint.title + index}>
          <div
            className={`hint-header ${hint.show ? '' : 'hint-header--hidden'}`}
          >
            <h4 className="core-text core-text--primary">{hint.title}</h4>
            {hint.content && (
              <button
                type="button"
                className={`core-link ${
                  hint.show ? 'core-link--quiet-emphasis' : ''
                }`}
                onClick={() => toggleHint({ index, setData })}
              >
                {hint.show ? 'Hide' : 'Show'}
              </button>
            )}
          </div>
          {hint.show && (
            <div
              className="hint-body"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: hint.content }}
            />
          )}
        </div>
      ))}
      <p className="core-text core-text--tertiary reveal">{reveal}</p>
    </div>
  );
};

Hints.propTypes = {
  hints: PropTypes.object,
  url: PropTypes.string,
  setData: PropTypes.func,
  setHintError: PropTypes.func,
  complete: PropTypes.bool,
  penalty: PropTypes.number,
};

export default Hints;
