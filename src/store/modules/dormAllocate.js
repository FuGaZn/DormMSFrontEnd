import {modifyPwd} from "@/api/user";
import {allocate, change, exchange, remove} from "@/api/dormAllocate";


const actions={
  allocate({commit}, data) {
    const {studentID, dormName} = data
    return new Promise((resolve, reject) => {
      allocate(studentID, dormName).then(() => {
        resolve()
      }).catch(error =>{
        reject(error)
      })
    })
  },
  removeDorm({commit}, studentID) {
    return new Promise((resolve, reject) => {
      remove(studentID).then(() => {
        resolve()
      }).catch(error =>{
        reject(error)
      })
    })
  },
  exchangeDorm({commit}, data) {
    const {id1, id2} = data
    return new Promise((resolve, reject) => {
      exchange(id1, id2).then(() => {
        resolve()
      }).catch(error =>{
        reject(error)
      })
    })
  },
  changeDorm({commit}, data) {
    const {studentID, dormName} = data
    return new Promise((resolve, reject) => {
      change(studentID, dormName).then(() => {
        resolve()
      }).catch(error =>{
        reject(error)
      })
    })
  },
}

export default {
  namespace:true,
  actions
}
