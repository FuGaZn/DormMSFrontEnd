import {addStudent, getBackInfo, getStudent, listStudents, randomCreate, stuLogin, submit} from '@/api/student'

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
  },
  submit({commit}, submitForm){
    return new Promise((resolve, reject)=>{
      submit(submitForm).then(response => {
        resolve(response)
      })
    })
  },
  getBackInfo({commit},studentID) {
    return new Promise((resolve, reject) =>{
      getBackInfo(studentID).then(response => {
        resolve(response)
      })
    })
  },
}

export default {
  namespace:true,
  actions
}

