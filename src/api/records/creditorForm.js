import request from '@/utils/request'

// 查询备案债权单列表
export function listCreditorForm(query) {
  return request({
    url: '/records/creditorForm/list',
    method: 'get',
    params: query
  })
}

// 查询备案债权单详细
export function getCreditorForm(id) {
  return request({
    url: '/records/creditorForm/' + id,
    method: 'get'
  })
}

// 新增备案债权单
export function addCreditorForm(data) {
  return request({
    url: '/records/creditorForm',
    method: 'post',
    data: data
  })
}

// 修改备案债权单
export function updateCreditorForm(data) {
  return request({
    url: '/records/creditorForm',
    method: 'put',
    data: data
  })
}

// 删除备案债权单
export function delCreditorForm(id) {
  return request({
    url: '/records/creditorForm/' + id,
    method: 'delete'
  })
}

// 导出备案债权单
export function exportCreditorForm(query) {
  return request({
    url: '/records/creditorForm/export',
    method: 'get',
    params: query
  })
}