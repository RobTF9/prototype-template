import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import classNames from 'classnames';
import BriefingSignal from './BriefingSignal';
import Hints from './Hints';
import DataList from '../DataList';
import ArrowLeft from '../Icons/ArrowLeft';
import ArrowRight from '../Icons/ArrowRight';
import submissionStates from './submissionStates';
import {
  BriefingContent,
  BriefingContentGroup,
  BriefingWrapper,
  BriefingFixedFooter,
  BriefingScrollable,
  BriefingInfo,
  BriefingMultipleChoice,
  BriefingSection,
  BriefingContainer,
  BriefingControls,
} from './styles';

const Briefing = ({
  data,
  error,
  hintError,
  rateLimit,
  submissionState,
  signalEl,
  isScored,
  submit,
  register,
  handleSubmit,
  errors,
  multipleChoiceFlagMode,
  acknowledgedFlagMode,
  url,
  setData,
  setHintError,
  previousChallenge,
  nextChallenge,
}) => {
  const disabledStates = [
    submissionStates.LOADING,
    submissionStates.CORRECT,
    submissionStates.ALREADY_COMPLETE,
  ];

  const previousLinkClasses = classNames({
    'core-link ': true,
    'core-link--flying': true,
    'core-link--disabled':
      previousChallenge === '' || submissionState === submissionStates.LOADING,
  });

  const nextLinkClasses = classNames({
    'core-link ': true,
    'core-link--flying': true,
    'core-link--disabled':
      nextChallenge === '' || submissionState === submissionStates.LOADING,
  });

  const footerMarkup = () => {
    if (data.flagMode === acknowledgedFlagMode) {
      return (
        <form className="core-form" onSubmit={handleSubmit(submit)}>
          <input type="hidden" name="flag" value="1" ref={register()} />
          <input
            type="submit"
            value={data.flagMetadata.text}
            className="core-button acknowledge-button"
            disabled={
              disabledStates.includes(submissionState) || data.challengeComplete
            }
          />
        </form>
      );
    }
    if (data.flagMode !== multipleChoiceFlagMode) {
      return (
        <form className="core-form" onSubmit={handleSubmit(submit)}>
          <div className="field">
            <label className="label" htmlFor="flag">
              Enter flag
            </label>
            <input
              id="flag"
              className={`input-text ${
                errors.flag ? 'input-text--danger' : ''
              }`}
              aria-label="Enter flag"
              type="text"
              name="flag"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              disabled={
                disabledStates.includes(submissionState) ||
                data.challengeComplete
              }
              ref={register({
                required: true,
                pattern: data.flagValidation
                  ? new RegExp(data.flagValidation.pattern)
                  : null,
              })}
            />
          </div>
          <input
            type="submit"
            value={
              submissionState === submissionStates.LOADING
                ? 'Checking...'
                : 'Try flag'
            }
            className="core-button"
            disabled={
              disabledStates.includes(submissionState) || data.challengeComplete
            }
          />
          {data.flagValidation ? (
            <div className={`tip ${errors.flag && 'tip--danger'}`}>
              {errors.flag
                ? data.flagValidation.errorMessage
                : data.flagValidation.tip}
            </div>
          ) : null}
        </form>
      );
    }
  };

  if (data) {
    return (
      <BriefingContainer>
        <BriefingWrapper>
          <BriefingScrollable>
            {!data && error && (
              <BriefingInfo>
                <p className="core-text">
                  There was an error fetching the challenge. Please try again.
                </p>
              </BriefingInfo>
            )}

            <BriefingInfo>
              {isScored && (
                <div className="points">
                  <span className={data.penalty ? 'strike' : ''}>
                    {data.points.toLocaleString()}pts
                  </span>
                  {!!data.penalty && (
                    <span className="penalty">
                      {' '}
                      {(data.points - data.penalty).toLocaleString()}pts with
                      hint penalty
                    </span>
                  )}
                </div>
              )}
              <h2 className="title core-heading core-heading--secondary">
                {data.title}
              </h2>
              <BriefingSignal
                {...{
                  data,
                  error,
                  hintError,
                  rateLimit,
                  submissionState,
                  signalEl,
                }}
              />
            </BriefingInfo>
            <BriefingContent>
              <h2 className="core-heading core-heading--fieldset">Briefing</h2>
              {data.groupIntro && (
                <BriefingContentGroup
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: data.groupIntro }}
                />
              )}
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: data.details }}
              />
            </BriefingContent>

            {data.flagMode === multipleChoiceFlagMode && (
              <BriefingMultipleChoice
                className="core-form"
                onSubmit={handleSubmit(submit)}
              >
                <div className="field">
                  <legend className="label">Select one answer</legend>
                  {data.flagMetadata.choices.map((choice, index) => (
                    <div key={choice + index} className="radio">
                      <input
                        className="radio-input"
                        id={`choice-${index}`}
                        value={choice}
                        type="radio"
                        name="flag"
                        ref={register()}
                        disabled={
                          disabledStates.includes(submissionState) ||
                          data.challengeComplete
                        }
                      />
                      <label
                        className="radio-label"
                        htmlFor={`choice-${index}`}
                      >
                        {choice}
                      </label>
                    </div>
                  ))}
                </div>
                <input
                  type="submit"
                  value={
                    submissionState === submissionStates.LOADING
                      ? 'Checking...'
                      : 'Submit answer'
                  }
                  className="core-button"
                  disabled={
                    disabledStates.includes(submissionState) ||
                    data.challengeComplete
                  }
                />
              </BriefingMultipleChoice>
            )}

            {(!!data.files[0].data.length || !!data.files[1].data.length) && (
              <BriefingSection>
                <DataList
                  {...{
                    classes: 'layout layout--top-padding',
                    title: 'Downloads',
                    headingLevel: 2,
                    groups: data.files,
                  }}
                />
              </BriefingSection>
            )}

            {!!data.hints.totalHints && (
              <BriefingSection>
                <Hints
                  {...{
                    hints: data.hints,
                    url,
                    setData,
                    setHintError,
                    complete:
                      submissionState === submissionStates.CORRECT ||
                      submissionState === submissionStates.ALREADY_COMPLETE ||
                      data.challengeComplete,
                    penalty: data.penalty,
                  }}
                />
              </BriefingSection>
            )}
          </BriefingScrollable>

          {isScored && (
            <BriefingFixedFooter
              grid={data.flagMode === acknowledgedFlagMode ? '1fr' : '2fr 1fr'}
            >
              {footerMarkup()}
              <BriefingControls
                tipSpace={
                  !!data.flagValidation &&
                  data.flagMode !== acknowledgedFlagMode
                }
              >
                <Link to={previousChallenge} className={previousLinkClasses}>
                  <ArrowLeft /> Previous
                </Link>
                <Link
                  to="../../"
                  className="core-link core-link--flying core-link--warning"
                >
                  Close
                </Link>
                <Link to={nextChallenge} className={nextLinkClasses}>
                  Next <ArrowRight />
                </Link>
              </BriefingControls>
            </BriefingFixedFooter>
          )}
        </BriefingWrapper>
      </BriefingContainer>
    );
  }

  return (
    <div className="loading-wrapper">
      <img
        src="/assets/images/spinner.svg"
        alt="Loading Spinner"
        className="image"
      />
    </div>
  );
};

Briefing.propTypes = {
  data: PropTypes.object,
  error: PropTypes.any,
  hintError: PropTypes.any,
  rateLimit: PropTypes.number,
  submissionState: PropTypes.number,
  signalEl: PropTypes.any,
  isScored: PropTypes.bool,
  loading: PropTypes.bool,
  submit: PropTypes.func,
  register: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  multipleChoiceFlagMode: PropTypes.number,
  acknowledgedFlagMode: PropTypes.number,
  url: PropTypes.string,
  setData: PropTypes.func,
  setHintError: PropTypes.func,
  previousChallenge: PropTypes.string,
  nextChallenge: PropTypes.string,
};

export default Briefing;
