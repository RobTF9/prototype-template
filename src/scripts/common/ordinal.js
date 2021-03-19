export default number => {
  const j = number % 10;
  const k = number % 100;
  if (j === 1 && k !== 11) {
    return `${number.toLocaleString()}st`;
  }
  if (j === 2 && k !== 12) {
    return `${number.toLocaleString()}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${number.toLocaleString()}rd`;
  }
  return `${number.toLocaleString()}th`;
};
