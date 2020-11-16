import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function modifyPwd(oldPassword, newPassword) {
  return request({
    url: '/user/modify/pwd',
    method: 'post',
    params: { oldPassword, newPassword }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function modifyRole(data) {
  return request({
    url: '/user/back/modify',
    method: 'post',
    data
  })
}
export function listUser() {
  return request({
    url: '/user/back/list',
    method: 'get'
  })
}

export function addUser(data){
  return request({
    url: '/user/back/add',
    method: 'post',
    data
  })
}
