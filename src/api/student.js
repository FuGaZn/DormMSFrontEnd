import request from '@/utils/request'

export function listStudents(){
  return request({
    url: '/user/student/list',
    method: 'get'
  })
}
export function randomCreate(){
  return request({
    url: '/user/student/random',
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
export function getStudent(studentID){
  return request({
    url: '/user/student/get',
    method: 'get',
    params:{studentID}
  })
}
export function getBackInfo(studentID){
  return request({
    url: '/stu/back',
    method: 'get',
    params:{studentID}
  })
}
export function submit(data) {
  return request({
    url: '/user/student/submit',
    method: 'post',
    data
  })
}
export function stuLogin(id, code) {
  return request({
    url: '/stu/login',
    method: 'post',
    params:{id, code}
  })
}

