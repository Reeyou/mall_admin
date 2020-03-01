import { request } from '@/utils/request'
import formatParam from '@/utils/formatParam'

export async function test() {
  return request('/api/admin/test')
}