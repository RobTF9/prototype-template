import eventMarkdown from '../common/eventMarkdown';
import limiter from '../common/limiter';

// Run limiter function to set limits on inputs
limiter();

const openingParent = document.querySelector('.js-opening');
const progressiveOptions = document.querySelector('.js-progressive-options');
const timedOptions = document.querySelector('.js-timed-options');

const handleChange = ({ target: { value } }) => {
  progressiveOptions.classList.add('helper-hidden');
  timedOptions.classList.add('helper-hidden');

  const progressive = '2';
  const timed = '3';

  if (value === progressive) {
    progressiveOptions.classList.remove('helper-hidden');
  }

  if (value === timed) {
    timedOptions.classList.remove('helper-hidden');
  }
};

openingParent.addEventListener('change', handleChange);
progressiveOptions.addEventListener('change', e => e.stopPropagation());
timedOptions.addEventListener('change', e => e.stopPropagation());

eventMarkdown();
