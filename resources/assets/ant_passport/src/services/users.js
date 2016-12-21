import qs from 'qs';
import request from '../utils/request';
import config from '../config';

export async function query(params) {
  return request(`${config.domain}/api/users?${qs.stringify(params)}`);
}

export async function update(params) {
  return request(`${config.domain}/api/users/${params.id}`, {
    method: 'PATCH',
    body: JSON.stringify(params),
  });
}

export async function deny(params) {
  return request(`${config.domain}/api/users/${params.id}/action/deny`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function grant(params) {
  return request(`${config.domain}/api/users/${params.id}/action/onroles`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
