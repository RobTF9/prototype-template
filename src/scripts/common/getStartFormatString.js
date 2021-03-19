import { isSameDay, isSameMonth, isSameYear } from 'date-fns';

export default (s, e) => {
  if (isSameDay(s, e) && isSameMonth(s, e) && isSameYear(s, e)) {
    return 'HH:mm';
  }

  if (isSameMonth(s, e) && isSameYear(s, e)) {
    return 'HH:mm do';
  }

  if (isSameYear(s, e)) {
    return 'HH:mm do LLL';
  }

  return 'HH:mm do LLL yyyy';
};
