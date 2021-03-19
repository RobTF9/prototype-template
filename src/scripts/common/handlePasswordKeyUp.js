import zxcvbn from 'zxcvbn';

export default () => {
  const MAX_LENGTH = 72;

  const passwordField = document.querySelector(
    '.javascript-create-password-field'
  );
  const input = passwordField.querySelector('input');
  const power = passwordField.querySelector('.power');

  // Get button and create class
  const actions = document.querySelector('.js-submit-button');
  const button = actions.querySelector('input');
  const buttonClass = 'core-button--disabled';

  // Get password value
  const password = input.value.substring(0, MAX_LENGTH);

  // Get password strength
  const strength = zxcvbn(password, ['tomahawque']);

  // Reset classname on every keypress
  power.className = 'power';

  // Work out class to add based on password strength score
  let powerClass = '';

  switch (strength.score) {
    case 4:
      powerClass = 'power--four';
      break;
    case 3:
      powerClass = 'power--three';
      break;
    case 2:
      powerClass = 'power--two';
      break;
    case 1:
      powerClass = 'power--one';
      break;
    default:
      powerClass = '';
  }

  // If a class exists, add it to the power element
  if (powerClass) {
    power.classList.add(powerClass);
  }

  // If score is 4 then enable button
  if (strength.score === 4) {
    button.classList.remove(buttonClass);
    button.disabled = false;
  } else {
    button.classList.add(buttonClass);
    button.disabled = true;
  }

  // Reset/clear any suggestions
  const suggestions = passwordField.querySelectorAll('.tip--warning');
  [...suggestions].forEach(suggestion => {
    passwordField.removeChild(suggestion);
  });

  // Add latest suggestions
  [...strength.feedback.suggestions].forEach(suggestion => {
    const el = document.createElement('div');
    el.className = 'tip tip--warning';
    el.textContent = suggestion;
    passwordField.insertBefore(el, null);
  });
};
