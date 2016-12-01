import fetch from 'dva/fetch';
import { getCookie } from '../utils/helper';
import { getAuthHeader } from '../utils/auth';
import config from '../config';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const sso_token = getCookie('sso_token');
  const authHeader = getAuthHeader(sso_token);
  return fetch(url, { ...options, ...authHeader })
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}
