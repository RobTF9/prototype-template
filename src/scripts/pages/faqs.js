const containers = document.getElementsByClassName('js-faq-group');

containers.forEach(container => {
  const toggle = container.querySelector('.js-faq-toggle');
  const content = container.querySelector('.js-faq-content');

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
