import request from '@/utils/request'

// 查询备案系统工作流列表
export function listTask(query) {
  return request({
    url: '/records/task/list',
    method: 'get',
    params: query
  })
}
// 查询备案系统工作流列表
export function listUserByRoleKey(query) {
  return request({
    url: '/records/task/getUsersByRoleKey',
    method: 'get',
    params: query
  })
}

// 查询备案系统工作流详细
export function getTask(id) {
  return request({
    url: '/records/task/' + id,
    method: 'get'
  })
}

// 新增备案系统工作流
export function addTask(data) {
  return request({
    url: '/records/task',
    method: 'post',
    data: data
  })
}

// 修改备案系统工作流
export function updateTask(data) {
  return request({
    url: '/records/task',
    method: 'put',
    data: data
  })
}

// 指派债管家
export function editZGJ(data) {
  return request({
    url: '/records/task/editZGJ',
    method: 'post',
    data: data
  })
}

// 删除备案系统工作流
export function delTask(id) {
  return request({
    url: '/records/task/' + id,
    method: 'delete'
  })
}

// 导出备案系统工作流
export function exportTask(query) {
  return request({
    url: '/records/task/export',
    method: 'get',
    params: query
  })
}
