import flatpickr from 'flatpickr';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc';

export default (useExistingDatesAsMinDate = false) => {
  const [startDateInput, endDateInput] = document.querySelectorAll(
    '.js-flatpickr'
  );
  const timezoneInput = document.querySelector('.js-timezone');
  const commonOptions = {
    enableTime: true,
    altInput: true,
    altFormat: 'F j, Y H:i',
    dateFormat: 'Y-m-d H:i',
    time_24hr: true,
    locale: {
      firstDayOfWeek: 1,
    },
    allowInput: true,
  };

  const setDuration = () => {
    const timezone = timezoneInput.value;

    // Get difference in minutes
    let diffInMinutes = Math.abs(
      differenceInMinutes(
        zonedTimeToUtc(startDateInput._flatpickr.selectedDates[0], timezone),
        zonedTimeToUtc(endDateInput._flatpickr.selectedDates[0], timezone)
      )
    );
    let days = 0;
    let hours = 0;
    let minutes = 0;

    // If more than a day, calculate days and remaining minutes
    if (diffInMinutes >= 60 * 24) {
      days = Math.floor(diffInMinutes / (60 * 24));
      diffInMinutes %= 60 * 24;
    }

    // If more than an hour, calculate hours and remaining minutes
    if (diffInMinutes >= 60) {
      hours = Math.floor(diffInMinutes / 60);
      diffInMinutes %= 60;
    }

    minutes = diffInMinutes;

    // Create duration text
    let durationText = 'Select a different start and end time.';

    if (days || hours || minutes) {
      durationText =
        (days ? `${days} day${days > 1 ? 's' : ''}, ` : '') +
        (hours ? `${hours} hour${hours > 1 ? 's' : ''}, ` : '') +
        (minutes ? `${minutes} minute${minutes > 1 ? 's' : ''}` : '');
    }

    // Remove trailing comma
    durationText = durationText.replace(/,\s*$/, '');

    // Set duration text in element
    document.querySelector('.js-duration').textContent = durationText;
  };

  const onStartChange = (_, dateStr) => {
    const start = new Date(dateStr);
    const end = endDateInput._flatpickr.selectedDates[0];
    const endMin = new Date(dateStr);

    // If there is an end date
    if (end) {
      // Check if start is after end, if so, update end date to selected start date
      if (isAfter(start, end)) {
        endDateInput._flatpickr.setDate(start);
      }
    } else {
      // else set a default end date of 17:00 the same day
      start.setHours(17);
      start.setMinutes(0);
      endDateInput._flatpickr.setDate(start);
    }

    // Set minDate of end date to selected start date
    endDateInput._flatpickr.set('minDate', endMin);

    if (startDateInput.value && endDateInput.value) {
      setDuration();
    }
  };

  const onEndChange = (_, dateStr) => {
    // if selected date is before start date, update start date to selected end date
    if (
      isBefore(
        new Date(dateStr),
        new Date(startDateInput._flatpickr.selectedDates[0])
      )
    ) {
      startDateInput._flatpickr.setDate(dateStr);
    }

    if (startDateInput.value && endDateInput.value) {
      setDuration();
    }
  };

  const now = new Date();

  const startDate = new Date(startDateInput.value);
  const minStartDate =
    useExistingDatesAsMinDate && startDate < now ? startDate : 'today';

  // Initialise flatpickr on start date element
  flatpickr(startDateInput, {
    ...commonOptions,
    onChange: onStartChange,
    minDate: minStartDate,
    defaultHour: 9,
  });

  startDateInput._flatpickr._input.disabled = startDateInput.readOnly;

  const endDate = new Date(endDateInput.value);
  const minEndDate =
    useExistingDatesAsMinDate && endDate < now ? endDate : 'today';

  // Initialise flatpickr on end date element
  flatpickr(endDateInput, {
    ...commonOptions,
    onChange: onEndChange,
    minDate: minEndDate,
    defaultHour: 17,
  });

  endDateInput._flatpickr._input.disabled = endDateInput.readOnly;

  timezoneInput.addEventListener('change', () => {
    setDuration();
  });

  // Set duration if there is a start date and end date
  if (startDateInput.value && endDateInput.value) {
    setDuration();
  }
};
