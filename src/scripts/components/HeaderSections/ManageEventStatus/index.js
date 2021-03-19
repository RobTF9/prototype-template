import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useScrollInfo from 'react-element-scroll-hook';
import { Wrapper } from './styles';
import { eventStatus } from '../../../common/enums';

export default function ManageEventStatus({ status }) {
  const [scrollInfo, setRef] = useScrollInfo();

  const allButtons = {
    'core-button': true,
    'core-button--smallest': true,
  };

  const readyButtonClasses = classNames({
    ...allButtons,
    'core-button--positive': status === eventStatus.DRAFT,
    'core-button--quiet': status === eventStatus.READY,
  });

  const startButtonClasses = classNames({
    ...allButtons,
    'core-button--positive': status !== eventStatus.DRAFT,
    'core-button--quiet': status === eventStatus.DRAFT,
  });

  const pauseButtonClasses = classNames({
    ...allButtons,
    'core-button--warning': status !== eventStatus.PAUSED,
    'core-button--quiet':
      status === eventStatus.DRAFT || status === eventStatus.READY,
  });

  const endButtonClasses = classNames({
    ...allButtons,
    'core-button--danger': status !== eventStatus.FINISHED,
    'core-button--quiet':
      status === eventStatus.DRAFT || status === eventStatus.READY,
  });

  return (
    <Wrapper
      {...{
        ref: setRef,
        className: scrollInfo.x.className,
      }}
    >
      {(status === eventStatus.DRAFT || status === eventStatus.READY) && (
        <button
          type="button"
          className={readyButtonClasses}
          disabled={status === eventStatus.READY}
        >
          {status === eventStatus.DRAFT ? 'Mark Ready' : 'Marked Ready'}
        </button>
      )}
      {status !== eventStatus.FINISHED && (
        <button
          type="button"
          className={startButtonClasses}
          disabled={
            status === eventStatus.DRAFT || status === eventStatus.STARTED
          }
        >
          {status === eventStatus.STARTED ? 'Started' : 'Start'}
        </button>
      )}
      {status !== eventStatus.FINISHED && (
        <button
          type="button"
          className={pauseButtonClasses}
          disabled={
            status === eventStatus.DRAFT ||
            status === eventStatus.READY ||
            status === eventStatus.PAUSED
          }
        >
          {status === eventStatus.PAUSED ? 'Paused' : 'Pause'}
        </button>
      )}
      <button
        type="button"
        className={endButtonClasses}
        disabled={
          status === eventStatus.DRAFT ||
          status === eventStatus.READY ||
          status === eventStatus.FINISHED
        }
      >
        {status === eventStatus.FINISHED ? 'Finished' : 'End'}
      </button>
    </Wrapper>
  );
}

ManageEventStatus.propTypes = {
  status: PropTypes.number,
};
