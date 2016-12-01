import { query } from '../services/auth';
import config from '../config';
import { getCookie, getLocalStorage } from './helper';

// Auth
export function getAuthHeader(sso_token) {
  return ({
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sso_token,
    }
  });
}

export function redirectLogin() {
  return window.location.href = config.redirectUrl + window.location.href;
}

export function errorHandle(error) {
  const response = error.response;
  if (response.status === 401) {
    redirectLogin();
  }
}

export function authenticated() {
  const sso_token = getCookie('sso_token');
  if (!sso_token) {
    redirectLogin();
  }
}