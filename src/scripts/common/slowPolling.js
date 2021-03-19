export default (config, refreshTime) => {
  const currentIndex = config.findIndex(bucket => bucket.time === refreshTime);

  // If at max polling time already, stop polling
  if (config.length === currentIndex + 1) {
    return null;
  }

  return config[currentIndex + 1].time;
};
