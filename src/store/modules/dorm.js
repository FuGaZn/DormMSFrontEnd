import { resetRouter } from '@/router'
import {addBuilding, listBuildings, listDorms,addDorm,listStudentsInDorm} from '@/api/dorm'

const actions = {
  addBuilding({commit}, building){
    return new Promise((resolve, reject) =>{
      addBuilding(building).then(response=>{
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addDorm({commit}, dormVO){
 //   console.log(dormVO)
    return new Promise((resolve, reject) =>{
      addDorm(dormVO).then(response=>{
        console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  listBuildings({commit}){
    return new Promise((resolve, reject) =>{
      listBuildings().then(response=>{
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  listDorms({commit}, buildingID){
    return new Promise((resolve, reject) =>{
      listDorms(buildingID).then(response=>{
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  listStudentsInDorm({commit}, dormName){
    return new Promise((resolve, reject) =>{
      listStudentsInDorm(dormName).then(response=>{
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespace:true,
  actions
}
