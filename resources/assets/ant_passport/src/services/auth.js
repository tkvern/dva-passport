import qs from 'qs';
import request from '../utils/request';
import config from '../config';

export async function query(params) {
  return request(`${config.domain}/api/user`);
}
