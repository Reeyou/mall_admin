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
export async function updateCategory(params) {
  return request('/api/admin/updateCategory', {
    method: 'POST',
    body: {
      ...params
    }
  })
}
export async function deleteCategory(params) {
  return request('/api/admin/deleteCategory', {
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

export async function addProduct(params) {
  return request('/api/admin/addProduct', {
    method: 'POST',
    body: {
      ...params
    }
  })
}

export async function getProductList(params) {
  return request('/api/admin/getProductList')
}
export async function getProduct(params) {
  return request(`/api/admin/getProduct?${formatParam(params)}`)
}
export async function getSku(params) {
  return request(`/api/admin/getSku?${formatParam(params)}`)
}