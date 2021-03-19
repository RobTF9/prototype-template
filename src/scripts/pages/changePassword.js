import handlePasswordKeyUp from '../common/handlePasswordKeyUp';

const passwordInput = document.querySelector(
  '.javascript-create-password-field input'
);

passwordInput.addEventListener('keyup', handlePasswordKeyUp);
