/* global amplitude */

const track = (name, properties) => {
  if (typeof amplitude !== 'undefined') {
    amplitude.getInstance().logEvent(name, properties);
  }
};

export { track };
