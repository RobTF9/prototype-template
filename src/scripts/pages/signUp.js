/* global captchaEnabled, captchaKey, grecaptcha */
import handlePasswordKeyUp from '../common/handlePasswordKeyUp';
import { track } from '../common/analytics';
import limiter from '../common/limiter';

// Run limiter function to set limits on inputs
limiter();

const passwordInput = document.querySelector(
  '.javascript-create-password-field input'
);

passwordInput.addEventListener('keyup', handlePasswordKeyUp);
track('SignUp Viewed');

// Google recaptcha
if (captchaEnabled) {
  const signUpForm = document.getElementById('js-sign-up-form');
  const tokenInput = document.querySelector("[name='captcha_token']");

  const handleSubmit = e => {
    e.preventDefault();

    grecaptcha.ready(function() {
      grecaptcha
        .execute(captchaKey, { action: 'signUp' })
        .then(function(token) {
          tokenInput.value = token;
          signUpForm.submit();
        });
    });
  };

  signUpForm.addEventListener('submit', handleSubmit);
}

try {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezoneEl = document.querySelector('.js-timezone');
  timezoneEl.value = timezone;
} catch (e) {
  // Intl is not supported, ignore
}
