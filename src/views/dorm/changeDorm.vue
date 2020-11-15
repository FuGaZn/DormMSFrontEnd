<template>
  <div>
    <div style="margin-left: 50px;margin-top: 50px">
      <h2>退宿</h2>
      <el-input style="width: 400px" v-model="exitStudentID" placeholder="输入学号"></el-input>
      <el-button type="primary">确定</el-button>
    </div>
    <div style="margin-top: 60px;margin-left: 50px">
      <h2>调换宿舍</h2>
      <el-input auto-complete="off" style="width: 200px;margin-right: 10px" v-model="exchangeStudents.id1" placeholder="学号"></el-input>
      <el-button type="primary" icon="el-icon-refresh" round></el-button>
      <el-input auto-complete="off" style="width: 200px;margin-left: 10px" v-model="exchangeStudents.id2" placeholder="学号"></el-input>
    </div>
  </div>
</template>

<script>
//退宿or调换宿舍
export default {
  name: "changeDorm",
  data() {
    return {
      exitStudentID:'',
      exchangeStudents:{
        id1:'',
        id2:''
      }
    }
  }
}
</script>

<style scoped>

</style>
