export default () => {
  const limitInputs = document.querySelectorAll('.javascript-limiter-input');

  // Set the counter
  const setCount = (target, limiterCounter) => {
    let chars;
    const limit = parseInt(target.dataset.limit);

    // Once characters find how many.
    if (target) {
      chars = target.value.length;
    }

    // Block additional input once limit is reached.
    if (chars >= limit) {
      target.value = target.value.substr(0, limit);
      chars = limit;
    }

    // Warn when they are close.
    const warningLimit = Math.min(limit / 2, 25); // Show warning at 50% or 25 chars remanining, whichever is smaller

    if (limit - chars <= warningLimit) {
      limiterCounter.classList.add('limiter-count--warning');
    } else {
      limiterCounter.classList.remove('limiter-count--warning');
    }

    // Show when limit reached.
    if (chars === limit) {
      limiterCounter.classList.add('limiter-count--danger');
    } else {
      limiterCounter.classList.remove('limiter-count--danger');
    }

    // Refresh count number.
    limiterCounter.textContent = limit - chars;
  };

  // Apply limiter to all elements with class.
  [...limitInputs].forEach(limitInput => {
    // Create and add counter
    const limiterCounter = document.createElement('div');
    limiterCounter.className = 'limiter-count';
    limitInput.parentNode.insertBefore(limiterCounter, limitInput.nextSibling);

    // Add event listeners to update count
    limitInput.addEventListener('keyup', ({ target }) => {
      setCount(target, limiterCounter);
    });

    limitInput.addEventListener('focus', ({ target }) => {
      setCount(target, limiterCounter);
    });

    // Set initial count
    setCount(limitInput, limiterCounter);
  });
};
