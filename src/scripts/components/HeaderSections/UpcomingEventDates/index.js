/* global USER_TIMEZONE */

import React from 'react';
import PropTypes from 'prop-types';
import useScrollInfo from 'react-element-scroll-hook';
import { format, utcToZonedTime } from 'date-fns-tz';
import getStartFormatString from '../../../common/getStartFormatString';
import { Wrapper, DateText } from './styles';

const UpcomingEventDates = ({ start, end, waiting }) => {
  const [scrollInfo, setRef] = useScrollInfo();

  const startsAt = utcToZonedTime(start, USER_TIMEZONE);
  const endsAt = utcToZonedTime(end, USER_TIMEZONE);

  return (
    <Wrapper className={scrollInfo.x.className}>
      <p className="core-text core-text--tertiary">Date</p>
      <DateText className="core-text core-text--secondary" ref={setRef}>
        {waiting
          ? 'Waiting to start'
          : format(startsAt, getStartFormatString(startsAt, endsAt), {
              timeZone: USER_TIMEZONE,
            })}{' '}
        -{' '}
        {format(endsAt, 'HH:mm do LLL yyyy zzz', {
          timeZone: USER_TIMEZONE,
        })}
      </DateText>
    </Wrapper>
  );
};

UpcomingEventDates.propTypes = {
  start: PropTypes.instanceOf(Date),
  end: PropTypes.instanceOf(Date),
  waiting: PropTypes.bool,
};

export default UpcomingEventDates;
