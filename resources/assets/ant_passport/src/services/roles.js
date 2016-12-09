import qs from 'qs';
import request from '../utils/request';
import config from '../config';

export async function query(params) {
  return request(`${config.domain}/api/roles?${qs.stringify(params)}`);
}

export async function create(params) {
  return request(`${config.domain}/api/roles`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function remove(params) {
  return request(`${config.domain}/api/roles/${params.id}`, {
    method: 'DELETE',
  });
}

export async function update(params) {
  return request(`${config.domain}/api/roles/${params.id}`, {
    method: 'PATCH',
    body: JSON.stringify(params),
  });
}

export async function grant(params) {
  return request(`${config.domain}/api/roles/${params.id}/action/onpermissions`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export async function rolePermissions(params) {
  return request(`${config.domain}/api/roles/${params.id}/permissions`);
}