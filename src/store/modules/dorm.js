import { resetRouter } from '@/router'
import { addBuilding, listBuildings } from '@/api/dorm'

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
  listBuildings({commit}){
    return new Promise((resolve, reject) =>{
      listBuildings().then(response=>{
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
