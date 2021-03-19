import { track } from '../common/analytics';

// Track sign up button click
const signUpButton = document.querySelector('.javascript-sign-up-button');

if (signUpButton) {
  signUpButton.addEventListener('click', e => {
    e.preventDefault();
    const { href } = e.target;
    track('Home SignUpButtonClicked');
    window.location.href = href;
  });
}

// Track page view
track('Home Viewed');
