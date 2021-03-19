import 'unfetch/polyfill/index.js';

export default function jsonRequest(url, options = {}) {
  options.credentials = 'same-origin';
  options.headers = options.headers || {};
  options.headers.Accept = 'application/json';

  return fetch(url, options);
}
