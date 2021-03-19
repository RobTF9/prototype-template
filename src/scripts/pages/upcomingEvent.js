/* global eventData, USER_TIMEZONE, doNotPoll */

import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import format from 'date-fns-tz/format';
import countdown, { stopCountdown } from '../common/countdown';
import { eventStatus } from '../common/enums';
import jsonRequest from '../common/jsonRequest';

const stopPolling = typeof doNotPoll !== 'undefined' && doNotPoll;
let eventName = eventData.name;
let eventStartsAt = eventData.startsAt;
let eventEndsAt = eventData.endsAt;
const startsAtElement = document.querySelector('#js-event-starts-at');

// Start countdown
const countdownElement = document.querySelector('.js-countdown');
const waitMessage = document.querySelector('.js-wait-message');
const onEnd = () => {
  countdownElement.classList.add('helper-hidden');
  waitMessage.classList.remove('helper-hidden');
  startsAtElement.textContent = 'Waiting to start';
};

countdown(countdownElement, onEnd);

// Event polling
const getEvent = async () => {
  if (stopPolling) {
    return;
  }

  const response = await jsonRequest(`/api/event/${eventData.id}`);
  const event = await response.json();

  // If event is now in progress, reload the page to get live event
  if (event.status === eventStatus.STARTED) {
    window.location.reload(true);
  }

  // Update name if changed
  if (eventName !== event.name) {
    // Save new name
    eventName = event.name;

    // Update on page
    const nameElement = document.querySelector('.js-event-name');
    nameElement.textContent = eventName;
  }

  // Update countdown if start time changed
  if (eventStartsAt !== event.startsAt) {
    // Save new start date
    eventStartsAt = event.startsAt;

    const startsAt = utcToZonedTime(
      new Date(eventStartsAt * 1000),
      USER_TIMEZONE
    );
    const now = utcToZonedTime(new Date(), USER_TIMEZONE);

    // Update start date on page
    startsAtElement.textContent = format(startsAt, 'HH:mm d MMMM yyyy zzz');

    // Stop current countdown, set new countdown time and restart countdown
    stopCountdown();

    if (now < startsAt) {
      // Make sure countdown is visible and wait message is not
      countdownElement.classList.remove('helper-hidden');
      waitMessage.classList.add('helper-hidden');

      // Restart countdown
      countdownElement.dataset.time = event.startsAt;
      countdown(countdownElement, onEnd);
    }
  }

  // Update countdown if end time changed
  if (eventEndsAt !== event.endsAt) {
    // Save new end date
    eventEndsAt = event.endsAt;

    const endsAt = utcToZonedTime(new Date(eventEndsAt * 1000), USER_TIMEZONE);

    // Update start date on page
    const endsAtElement = document.querySelector('#js-event-ends-at');
    endsAtElement.textContent = format(endsAt, 'HH:mm d MMMM yyyy zzz');
  }

  // Poll again after delay
  setTimeout(getEvent, 30000);
};

getEvent();
