import request from '@/utils/request'


export function addBuilding(data){
  return request({
    url: '/dorm/building/add',
    method:'post',
    data
  })
}
export function addDorm(data){
  return request({
    url: '/dorm/add',
    method:'post',
    data
  })
}

export function listBuildings(){
  return request({
    url: '/dorm/building/list',
    method: 'get'
  })
}
export function listSimpleBuildings(){
  return request({
    url: '/dorm/building/simpleList',
    method: 'get'
  })
}
export function listDorms(buildingID){
  return request({
    url: '/dorm/list',
    method: 'get',
    params:{buildingID}
  })
}
export function listStudentsInDorm(dormName){
  return request({
    url: '/dorm/student/list',
    method: 'get',
    params:{dormName}
  })
}


