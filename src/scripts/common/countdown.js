let timeInterval = null;

const getTimeRemaining = time => {
  const now = new Date();
  const t = Date.parse(time) - Date.parse(now);
  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days,
    hours,
    minutes,
    seconds,
  };
};

const stopCountdown = () => {
  clearInterval(timeInterval);
};

export default (countdown, onEnd) => {
  const countdownEndTime = new Date(countdown.dataset.time * 1000);
  const [dayBlock, hourBlock, minuteBlock, secondBlock] = countdown.children;
  const dayEl = dayBlock.querySelector('.number');
  const hourEl = hourBlock.querySelector('.number');
  const minuteEl = minuteBlock.querySelector('.number');
  const secondEl = secondBlock.querySelector('.number');

  const updateCountdown = () => {
    const t = getTimeRemaining(countdownEndTime);

    if (t.total <= 0) {
      dayEl.textContent = 0;
      hourEl.textContent = 0;
      minuteEl.textContent = 0;
      secondEl.textContent = 0;

      onEnd();
      stopCountdown();
      return;
    }

    dayEl.textContent = t.days;
    hourEl.textContent = t.hours;
    minuteEl.textContent = t.minutes;
    secondEl.textContent = t.seconds;
  };

  updateCountdown();
  timeInterval = setInterval(updateCountdown, 1000);
};

export { getTimeRemaining, stopCountdown };
