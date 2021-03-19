const groups = document.getElementsByClassName('js-preview-group');
const challenges = document.getElementsByClassName('js-challenge');

groups.forEach(group => {
  const toggle = group.querySelector('.js-group-header');
  const content = group.querySelector('.js-group-body');

  toggle.addEventListener('click', () => {
    content.classList.toggle('helper-hidden');
    toggle.querySelector('.atom-icon').classList.toggle('atom-icon--open');
  });
});

challenges.forEach(challenge => {
  const toggle = challenge.querySelector('.js-challenge-header button');
  const content = challenge.querySelector('.js-challenge-body');

  toggle.addEventListener('click', () => {
    content.classList.toggle('helper-hidden');
    toggle.classList.toggle('core-link--quiet-emphasis');

    if (toggle.innerText === 'Hide') {
      toggle.innerText = 'Show';
    } else {
      toggle.innerText = 'Hide';
    }
  });
});
