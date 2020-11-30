import request from '@/utils/request'

// 查询分销模块分销数据列表
export function listUser(query) {
  return request({
    url: '/distribution/user/list',
    method: 'get',
    params: query
  })
}

// 查询分销模块分销数据详细
export function getUser(id) {
  return request({
    url: '/distribution/user/' + id,
    method: 'get'
  })
}

// 新增分销模块分销数据
export function addUser(data) {
  return request({
    url: '/distribution/user',
    method: 'post',
    data: data
  })
}

// 修改分销模块分销数据
export function updateUser(data) {
  return request({
    url: '/distribution/user',
    method: 'put',
    data: data
  })
}

// 删除分销模块分销数据
export function delUser(id) {
  return request({
    url: '/distribution/user/' + id,
    method: 'delete'
  })
}

// 导出分销模块分销数据
export function exportUser(query) {
  return request({
    url: '/distribution/user/export',
    method: 'get',
    params: query
  })
}