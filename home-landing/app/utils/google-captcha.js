/* istanbul ignore file */
const PropTypes = require('prop-types');
const logger = require('nordic/logger')('captcha-validation');
const createRestclient = require('nordic/restclient');
const restclientConfig = require('../../config/browser/restclient');
const {
  googleCaptcha: { SITE_KEY },
} = require('../constants');

const restclient = createRestclient(restclientConfig);

const getCaptchaToken = (expectedAction) =>
  window.grecaptcha.enterprise.execute(SITE_KEY, { action: expectedAction });
const validateCaptchaToken = (token, expectedAction) =>
  restclient.post('google-captcha', { data: { token, expectedAction } });
const validate = (expectedAction) =>
  getCaptchaToken(expectedAction).then((token) =>
    validateCaptchaToken(token, expectedAction)
  );
const validateWithCaptcha = (captchaExpectedAction) =>
  new Promise((resolve) => {
    window.grecaptcha.enterprise.ready(() =>
      validate(captchaExpectedAction)
        .then(({ data: { isCaptchaValid } }) => resolve(isCaptchaValid))
        .catch((error) => {
          logger.error(error.message, {
            action: captchaExpectedAction,
          });
          resolve(false);
        })
    );
  });

module.exports = validateWithCaptcha;

validateWithCaptcha.propTypes = {
  captchaExpectedAction: PropTypes.string,
};

validateWithCaptcha.defaultProps = {
  captchaExpectedAction: '',
};
