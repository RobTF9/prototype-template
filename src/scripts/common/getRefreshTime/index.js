export default (players, config) =>
  config.find(bucket => {
    const { min, max } = bucket;

    if (players >= min && players <= max) {
      return true;
    }

    return false;
  }).time;
