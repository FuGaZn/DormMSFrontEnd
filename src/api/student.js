import request from '@/utils/request'

export function listStudents(){
  return request({
    url: '/user/student/list',
    method: 'get'
  })
}
export function addStudent(data){
  return request({
    url: '/user/student/add',
    method: 'post',
    data
  })
}
