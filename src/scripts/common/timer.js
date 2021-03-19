/* global USER_TIMEZONE */
import format from 'date-fns-tz/format';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import { getTimeRemaining } from './countdown';
import formatTime from './formatTime';
import closestPolyfill from './closestPolyfill';

closestPolyfill();

export default () => {
  const timers = document.querySelectorAll('.js-timer');

  [...timers].forEach(timer => {
    const { start, end } = timer.dataset;

    if (start && end) {
      const ONE_WEEK = 604800;
      const timeEl = timer.querySelector('.time');
      const eventCardEl = timeEl.closest('.event-card');
      const progressEl = timer.querySelector('.completed');
      const startDate = new Date(start * 1000);
      const endDate = new Date(end * 1000);
      const duration = differenceInSeconds(endDate, startDate);

      if (timeEl.textContent === 'PAUSED') {
        return;
      }

      const intervalId = setInterval(() => {
        // Get time remaining
        const t = getTimeRemaining(endDate);

        // Set progress bar
        const progress = (t.total / 1000 / duration) * 100;
        progressEl.style.width = `${progress}%`;

        const percentageDiff = (duration / 100) * 20;
        const limit = Math.min(percentageDiff, ONE_WEEK);
        const warning = Date.now() > end * 1000 - limit * 1000;

        if (warning) {
          progressEl.parentNode.classList.add('core-bar--warning');
          if (eventCardEl) {
            timeEl.closest('.event-card').classList.add('event-card--warning');
          }
        }

        // Set time
        timeEl.textContent = `${formatTime(t)}${
          eventCardEl && warning ? ' ENDS SOON!' : ''
        }`;

        if (t.total <= 0) {
          if (eventCardEl) {
            const timerEl = timeEl.closest('.entity');
            const textTimeEl = eventCardEl.querySelector('.js-text-time');

            // Remove timer
            timerEl.parentNode.removeChild(timerEl);

            // Remove classes to change border colour
            eventCardEl.classList.remove('event-card--warning');
            eventCardEl.classList.remove('event-card--live');

            // Add finished time
            textTimeEl.textContent = `Finished at ${format(
              endDate,
              "HH:mm' on 'd LLL yyyy z",
              {
                timeZone: USER_TIMEZONE,
              }
            )}`;
          }

          // Clear interval
          clearInterval(intervalId);
        }
      }, 1000);
    }
  });
};
