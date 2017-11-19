import request from '../utils/request';
import qs from 'qs';

export async function query(url, params) {
  if (!params) return request(url);
  return request(`${url}?${qs.stringify(params)}`);
}

export async function create(url, params) {
  alert(params.user_name);
  return request(url, {
    method: 'post',
    body: qs.stringify(params)
  });
}

export async function update(url, params) {
  return request(url, {
    method: 'put',
    body: qs.stringify(params)
  });
}

export async function remove(url, params) {
  return request(url, {
    method: 'delete',
    body: qs.stringify(params)
  });
}
