const links = document.querySelector('.account-links');
const button = document.querySelector('.account-button');

if (button) {
  button.addEventListener('click', () => {
    links.classList.toggle('visible');
  });

  window.addEventListener('click', e => {
    if (button.contains(e.target) || links.contains(e.target)) return;
    links.classList.remove('visible');
  });
}
