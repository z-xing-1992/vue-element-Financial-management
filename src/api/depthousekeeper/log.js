import request from '@/utils/request'

/** 查询债管家日志列表 */ 
export function listLog(query) {
  return request({
    url: '/depthousekeeper/log/list',
    method: 'get',
    params: query
  })
}

// 查询债管家日志详细
export function getLog(id) {
  return request({
    url: '/depthousekeeper/log/' + id,
    method: 'get'
  })
}

// 新增债管家日志
export function addLog(data) {
  return request({
    url: '/depthousekeeper/log',
    method: 'post',
    data: data
  })
}

// 修改债管家日志
export function updateLog(data) {
  return request({
    url: '/depthousekeeper/log',
    method: 'put',
    data: data
  })
}

// 删除债管家日志
export function delLog(id) {
  return request({
    url: '/depthousekeeper/log/' + id,
    method: 'delete'
  })
}

// 导出债管家日志
export function exportLog(query) {
  return request({
    url: '/depthousekeeper/log/export',
    method: 'get',
    params: query
  })
}