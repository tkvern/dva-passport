import qs from 'qs';
import request from '../utils/request';
import config from '../config';

export async function query(params) {
  return request(`${config.domain}/api/users?${qs.stringify(params)}`);
}

export async function create(params) {
  return request(`${config.domain}/api/users`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function remove(params) {
  return request(`${config.domain}/api/users`, {
    method: 'DELETE',
  });
}

export async function update(params) {
  return request(`${config.domain}/api/users`, {
    method: 'PATCH',
    body: JSON.stringify(params),
  });
}

export async function deny(params) {
  return request(`${config.domain}/api/users/${params.id}/action/deny`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}
