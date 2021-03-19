import '@testing-library/jest-dom/extend-expect';
import { getByLabelText } from '@testing-library/dom';
import addDays from 'date-fns/addDays';
import eventDates from './index';
import getHTML from './eventDates.fixture';

describe('eventDates', () => {
  test('it initialises flatpickr inputs', async () => {
    document.body.innerHTML = getHTML({});
    eventDates();

    const flatpickrCals = document.querySelectorAll('.flatpickr-calendar');

    // Expect 2 flatpickr calenders
    expect(flatpickrCals.length).toBe(2);
  });

  test('it sets minDate of the end input when start date is changed', async () => {
    document.body.innerHTML = getHTML({});
    eventDates();

    const start = getByLabelText(document, 'Starts at')._flatpickr;
    const end = getByLabelText(document, 'Ends at')._flatpickr;

    const startDate = addDays(new Date(), 1);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    start.setDate(startDate, true);

    // Expect end min date to equal new start date
    expect(end.config._minDate).toEqual(startDate);
  });

  test('it sets the default end date when start date is changed (and end date not already set)', async () => {
    document.body.innerHTML = getHTML({});
    eventDates();

    const start = getByLabelText(document, 'Starts at')._flatpickr;
    const end = getByLabelText(document, 'Ends at')._flatpickr;

    // Set start date to tomorrow at 9
    const startDate = addDays(new Date(), 1);
    startDate.setHours(9);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    start.setDate(startDate, true);

    // Expected end date should default to the same day at 5pm
    const expectedEndDate = startDate;
    expectedEndDate.setHours(17);

    expect(end.selectedDates[0]).toEqual(expectedEndDate);
  });

  test('it sets the end date to the start date if the start date changes and it is after the end date.', async () => {
    document.body.innerHTML = getHTML({});
    eventDates();

    const start = getByLabelText(document, 'Starts at')._flatpickr;
    const end = getByLabelText(document, 'Ends at')._flatpickr;

    // Set end date to tomorrow at 9
    const endDate = addDays(new Date(), 1);
    endDate.setHours(9);
    endDate.setMinutes(0);
    endDate.setSeconds(0);
    endDate.setMilliseconds(0);
    end.setDate(endDate);

    // Set start date to tomorrow at 10
    const startDate = addDays(new Date(), 1);
    startDate.setHours(10);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    start.setDate(startDate, true);

    // Expect end date to update to start date
    expect(end.selectedDates[0]).toEqual(startDate);
  });

  test('it sets the start date to the end date if the end date changes and it is before the start date.', async () => {
    document.body.innerHTML = getHTML({});
    eventDates();

    const start = getByLabelText(document, 'Starts at')._flatpickr;
    const end = getByLabelText(document, 'Ends at')._flatpickr;

    // Set start date to tomorrow at 10
    const startDate = addDays(new Date(), 1);
    startDate.setHours(10);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    start.setDate(startDate);

    // Set end date to tomorrow at 9
    const endDate = addDays(new Date(), 1);
    endDate.setHours(9);
    endDate.setMinutes(0);
    endDate.setSeconds(0);
    endDate.setMilliseconds(0);
    end.setDate(endDate, true);

    // Expect end date to update to start date
    expect(start.selectedDates[0]).toEqual(endDate);
  });

  test('it sets the duration on load when there is a value for both inputs initially', async () => {
    document.body.innerHTML = getHTML({
      startDate: '2019-01-01 09:00',
      endDate: '2019-01-03 18:00',
    });

    eventDates(true);

    const duration = document.querySelector('.js-duration');
    expect(duration.textContent).toBe('2 days, 9 hours');
  });
});
