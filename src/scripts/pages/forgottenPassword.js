/* global captchaEnabled, captchaKey, grecaptcha */

// Google recaptcha
if (captchaEnabled) {
  const forgottenPasswordForm = document.getElementById(
    'js-forgotten-password-form'
  );
  const tokenInput = document.querySelector("[name='captcha_token']");

  const handleSubmit = e => {
    e.preventDefault();

    grecaptcha.ready(function() {
      grecaptcha
        .execute(captchaKey, { action: 'forgottenPassword' })
        .then(function(token) {
          tokenInput.value = token;
          forgottenPasswordForm.submit();
        });
    });
  };

  forgottenPasswordForm.addEventListener('submit', handleSubmit);
}
