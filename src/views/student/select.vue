<template>
  <div style="margin-left: 100px">
    <h1>选宿舍</h1>
    <span style="font-size: 14px;font-weight: bold;color: #444850;margin-right: 16px">宿舍楼</span><el-select style="margin-bottom: 20px;margin-top: 30px" v-model="selectForm.buildingID" placeholder="请选择宿舍楼">
      <el-option
        v-for="item in buildings"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-form :model="selectForm" style="width: 530px">
      <el-form-item
        v-for="(student, index) in selectForm.students"
        :label="'学生' + (index+1)"
        :key="student.key">
        <el-input @change="verifyStudentID(student.studentID, index)" style="width: 200px;margin-left: 10px"
                  v-model="student.studentID" placeholder="输入学号"></el-input>
        <el-input @change="verifyVerifyCode(student.studentID,student.verifyCode, index)"
                  style="width: 200px;margin-left: 10px" v-model="student.verifyCode" placeholder="输入标识码"></el-input>
        <el-button @click.prevent="removeStudent(student)" style="margin-left: 10px;" size="mini" type="danger" round
                   icon="el-icon-minus"></el-button>
        <span style="color: red; font-size: 12px; margin-left: 60px;" v-show="student.id_Warning.show">{{student.id_Warning.info}}</span>
        <span style="float: right;color: red; font-size: 12px;margin-right: 180px" v-show="student.code_Warning.show">{{student.code_Warning.info}}</span>
      </el-form-item>
      <el-form-item style="float: right;margin-right: 20px">
        <el-button @click="addStudent">新增学生</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {listSimpleBuildings} from "@/api/dorm";

export default {
  name: "select",
  data() {
    return {
      buildings:[],
      selectForm: {
        buildingID:'',
        students: [{
          studentID: '',
          verifyCode: '',
          gender: 0,
          id_Warning:{
            show:false,
            info:''
          },
          code_Warning:{
            show:false,
            info:''
          }
        }],
      }
    }
  },
  created() {
    this.$store.dispatch("listSimpleBuildings").then(response=>{
      const {data} = response
      let buildingVOs = data.buildings
      for (let index in buildingVOs){
        this.buildings.push({
          value:buildingVOs[index].buildingID,
          label:buildingVOs[index].buildingID+'号楼'
        })
      }
    })
  },
  methods: {
    submit(){
      let b = true;
      for (let index in this.selectForm.students){
        b = b && (!this.selectForm.students[index].id_Warning.show) && (!this.selectForm.students[index].code_Warning.show)
      }
      b = b && (this.selectForm.buildingID !== "")
      if (b == false){
        this.$message({
          message: '请检查填写信息',
          showClose: true,
          type: 'warning'
        })
        return
      }else{
        // logic

      }
    },
    async getStudent(studentID) {
      const {data} = await this.$store.dispatch("getStudent", studentID)
  //    console.log(data.student)
      return data.student
    },
    async verifyStudentID(studentID,index) {
      let student = await this.getStudent(studentID)

      if (student == null) {
        this.selectForm.students[index].id_Warning = {
          show:true,
          info:'学生不存在'
        }
        return
      }
      if (student.dormName !== ""){
        this.selectForm.students[index].id_Warning = {
          show:true,
          info:'该学生已被分配宿舍'
        }
        return
      }
      if (!this.verifyGender(student)){
        this.selectForm.students[index].id_Warning = {
          show:true,
          info:'该学生性别和其他学生不同！'
        }
        return
      }
      this.selectForm.students[index].id_Warning = {
        show:false,
        info:''
      }
    },
    verifyGender(student) {
      for (let index in this.selectForm.students){
        if (this.selectForm.students[index].gender !== student.gender){
          return false
        }
      }
      return true;
    },
    async verifyVerifyCode(studentID, code, index) {
      if (studentID === ""){
        this.$message({
          message: '请先填写学号',
          showClose: true,
          type: 'warning'
        })
      }
      let student = await this.getStudent(studentID)
      if (student.verifyCode !== code) {
        this.selectForm.students[index].code_Warning = {
          show: true,
          info: '验证码不正确'
        }
        return
      }
      this.selectForm.students[index].code_Warning = {
        show: false,
        info: ''
      }
    },
    removeStudent(item) {
      if (this.selectForm.students.length == 1) {
        this.$message({
          message: '表单不能为空',
          showClose: true,
          type: 'warning'
        })
        return
      }
      let index = this.selectForm.students.indexOf(item)
      if (index !== -1) {
        this.selectForm.students.splice(index, 1)
      }
    },
    addStudent() {
      if (this.selectForm.students.length == 5) {
        this.$message({
          message: '至多绑定5名学生',
          showClose: true,
          type: 'warning'
        });
        return;
      }
      this.selectForm.students.push({
        studentID: '',
        verifyCode: '',
        gender: 0,
        id_Warning:{
          show:false,
          info:''
        },
        code_Warning:{
          show:false,
          info:''
        },
        key: Date.now()
      })
    }
  }
}
</script>

<style scoped>

</style>
