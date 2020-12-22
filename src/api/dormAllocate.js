import request from '@/utils/request'

export function allocate(studentID, dormName) {
  return request({
    url: '/dorm/allocate',
    method: 'post',
    params: {studentID, dormName}
  })
}

export function remove(studentID) {
  return request({
    url: '/dorm/remove',
    method: 'post',
    params: {studentID}
  })
}
export function exchange(id1, id2) {
  return request({
    url: '/dorm/exchange',
    method: 'post',
    params: {id1, id2}
  })
}
export function change(studentID, dormName) {
  return request({
    url: '/dorm/change',
    method: 'post',
    params: {studentID, dormName}
  })
}

