import { request } from '@/utils/request'
import formatParam from '@/utils/formatParam'

export async function getCategoryList() {
  return request('/api/admin/getCategoryList')
}

export async function register(params) {
    return request('/api/admin/register', {
      method: 'POST',
      body: {
        ...params
      }
    })
  }
export async function login(params) {
    return request('/api/admin/login', {
      method: 'POST',
      body: {
        ...params
      }
    })
  }
  export async function sendCode(params) {
    return request('/api/admin/sendCode', {
      method: 'POST',
      body: {
        ...params
      }
    })
  }
  export async function getUserList(params) {
    return request('/api/admin/getUserList', {
      method: 'POST',
      body: {
        ...params
      }
    })
  }