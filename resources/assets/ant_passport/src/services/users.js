import qs from 'qs';
import request from '../utils/request';
import config from '../config';

export async function query(params) {
  return request(`${config.domain}/api/users?${qs.stringify(params)}`);
}

export async function create(params) {
  return request(`${config.domain}/api/users`, {
    method: 'post',
    body: qs.stringify(params),
  });
}

export async function remove(params) {
  return request(`${config.domain}/api/users`, {
    method: 'delete',
    body: qs.stringify(params),
  });
}

export async function update(params) {
  return request(`${config.domain}/api/users`, {
    method: 'put',
    body: qs.stringify(params),
  });
}
