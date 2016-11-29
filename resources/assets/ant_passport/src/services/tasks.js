import request from '../utils/request';
import qs from 'qs';
export async function query(params) {
  return request(`/api/tasks?${qs.stringify(params)}`);
}

export async function create(params) {
  return request('/api/tasks', {
    method: 'post',
    body: qs.stringify(params),
  });
}

export async function remove(params) {
  return request('/api/tasks', {
    method: 'delete',
    body: qs.stringify(params),
  });
}

export async function update(params) {
  return request('/api/tasks', {
    method: 'put',
    body: qs.stringify(params),
  });
}