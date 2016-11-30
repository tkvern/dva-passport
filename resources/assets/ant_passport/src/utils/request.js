import fetch from 'dva/fetch';
import { getCookie } from '../utils/helper';
import { getAuthHeader } from '../utils/auth';
import config from '../config';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  console.log(response.status);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status == 401) {
    // throw new Error('未登录');
    // console.log(config.domain + config.ssoLoginUrl + window.location.href.split("?_k")[0]);
    window.location.href = config.domain + config.ssoLoginUrl + window.location.href.split("?_k")[0];
  }


  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

// function parseErrorMessage({ data }) {
//   const { status, message } = data;
//   if (status === 'error') {
//     throw new Error(message);
//   }
//   return { data };
// }

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
    .then((data) => ({ data }));
    // .catch((err) => { throw new Error(err) });
}
