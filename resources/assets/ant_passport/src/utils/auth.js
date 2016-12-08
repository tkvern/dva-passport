import { query } from '../services/auth';
import config from '../config';
import { getCookie, delCookie, getLocalStorage } from './helper';

// Auth
export function getAuthHeader(sso_token) {
  return ({
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sso_token,
      'Content-Type': 'application/json',
    },
  });
}

export function redirectLogin() {
  window.location.href = config.redirectUrl + window.location.origin;
}

export function errorHandle(error) {
  const response = error.response;
  if (response && response.status === 401) {
    redirectLogin();
  }
}

export function authenticated() {
  const sso_token = getCookie('sso_token');
  if (!sso_token) {
    localStorage.clear();
    redirectLogin();
  }
}

export function logOut() {
  delCookie({
    name: 'sso_token',
    path: '/',
    domain: '.corp.visiondk.com',
  });
  authenticated();
}
