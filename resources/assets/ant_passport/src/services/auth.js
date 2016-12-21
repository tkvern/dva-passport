import qs from 'qs';
import request from '../utils/request';
import config from '../config';

export async function query(params) {
  return request(`${config.domain}/api/user`);
}

export async function update(params) {
  return request(`${config.domain}/api/user`, {
    method: 'PATCH',
    body: JSON.stringify(params),
  });
}

export async function password(params) {
  return request(`${config.domain}/api/user/password`, {
    method: 'PATCH',
    body: JSON.stringify(params),
  });
}
