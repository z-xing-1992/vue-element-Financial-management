import request from '@/utils/request'

// 查询备案债务单列表
export function listDebtForm(query) {
  return request({
    url: '/records/debtForm/list',
    method: 'get',
    params: query
  })
}

// 查询备案债务单详细
export function getDebtForm(id) {
  return request({
    url: '/records/debtForm/' + id,
    method: 'get'
  })
}

// 新增备案债务单
export function addDebtForm(data) {
  return request({
    url: '/records/debtForm',
    method: 'post',
    data: data
  })
}

// 修改备案债务单
export function updateDebtForm(data) {
  return request({
    url: '/records/debtForm',
    method: 'put',
    data: data
  })
}

// 删除备案债务单
export function delDebtForm(id) {
  return request({
    url: '/records/debtForm/' + id,
    method: 'delete'
  })
}

// 导出备案债务单
export function exportDebtForm(query) {
  return request({
    url: '/records/debtForm/export',
    method: 'get',
    params: query
  })
}