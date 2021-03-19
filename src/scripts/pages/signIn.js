/* global captchaEnabled, captchaKey, grecaptcha */

// Google recaptcha
if (captchaEnabled) {
  const signInForm = document.getElementById('js-sign-in-form');
  const tokenInput = document.querySelector("[name='captcha_token']");

  const handleSubmit = e => {
    e.preventDefault();

    grecaptcha.ready(function() {
      grecaptcha
        .execute(captchaKey, { action: 'signIn' })
        .then(function(token) {
          tokenInput.value = token;
          signInForm.submit();
        });
    });
  };

  signInForm.addEventListener('submit', handleSubmit);
}
