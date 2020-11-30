import request from '@/utils/request'

// 查询备案方案列表
export function listProgramme(query) {
  return request({
    url: '/programme/programme/list',
    method: 'get',
    params: query
  })
}

// 查询备案方案详细
export function getProgramme(id) {
  return request({
    url: '/programme/programme/' + id,
    method: 'get'
  })
}

// 新增备案方案
export function addProgramme(data) {
  return request({
    url: '/programme/programme',
    method: 'post',
    data: data
  })
}

// 修改备案方案
export function updateProgramme(data) {
  return request({
    url: '/programme/programme',
    method: 'put',
    data: data
  })
}

// 删除备案方案
export function delProgramme(id) {
  return request({
    url: '/programme/programme/' + id,
    method: 'delete'
  })
}

// 导出备案方案
export function exportProgramme(query) {
  return request({
    url: '/programme/programme/export',
    method: 'get',
    params: query
  })
}