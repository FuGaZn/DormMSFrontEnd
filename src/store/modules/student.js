import {addStudent, getStudent, listStudents, randomCreate} from '@/api/student'
import {addBuilding} from "@/api/dorm";

const actions = {
  listStudents({commit}){
    return new Promise((resolve, reject) =>{
      listStudents().then(response=>{
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addStudent({commit}, studentVO){
    return new Promise((resolve, reject) =>{
      addStudent(studentVO).then(response=>{
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  randomCreate({commit}){
    return new Promise((resolve, reject) =>{
      randomCreate().then()
    })
  },
  getStudent({commit},studentID) {
    return new Promise((resolve, reject) =>{
      getStudent(studentID).then(response => {
        resolve(response)
      })
    })
  }
}

export default {
  namespace:true,
  actions
}

