import {addStudent, listStudents} from '@/api/student'
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
    console.log(studentVO)
    return new Promise((resolve, reject) =>{
      addStudent(studentVO).then(response=>{
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespace:true,
  actions
}

