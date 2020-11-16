import request from '@/utils/request'


export function addBuilding(data){
  return request({
    url: '/dorm/building/add',
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
