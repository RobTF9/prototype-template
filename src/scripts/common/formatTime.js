export default t => {
  if (t.total <= 0) {
    return '00:00:00';
  }

  return (
    `${t.days ? `${t.days}d ` : ''}` +
    `${t.hours.toString().padStart(2, '0')}:` +
    `${t.minutes.toString().padStart(2, '0')}:` +
    `${t.seconds.toString().padStart(2, '0')}`
  );
};
