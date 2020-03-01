import { request } from '@/utils/request'
import formatParam from '@/utils/formatParam'

export async function getCategoryList() {
  return request('/api/admin/getCategoryList')
}
export async function addCategory(params) {
  return request('/api/admin/addCategory', {
    method: 'POST',
    body: {
      ...params
    }
  })
}
export async function createSku(params) {
  return request('/api/admin/createSku', {
    method: 'POST',
    body: {
      ...params
    }
  })
}