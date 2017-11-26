import axios from 'axios'
import { store } from '@/store'
import {
  getToken
} from './auth'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 500
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => response,
  error => {
    console.log('error:' + error)
    return Promise.reject(error)
  }
)

export default service
