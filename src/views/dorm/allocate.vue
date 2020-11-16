<template>
  <div style="float: left;width:600px">
    <div style="width: 290px;height: 240px; margin-left: 80px; margin-top: 100px; float:left;
    border: 1px solid rgba(43,43,43,0.3);
    border-radius: 5px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    padding-top: 30px;padding-bottom: 30px">
      <el-input v-model="studentID" placeholder="输入学号"
                style="width: 250px; margin-left: 20px;margin-right: 20px;margin-bottom: 20px"></el-input>
      <el-input v-model="dormName" placeholder="输入宿舍号"
                style="width: 250px; margin-left: 20px;margin-right: 20px;margin-bottom: 20px"></el-input>
      <el-button @click="allocateDorm" type="primary" style="width: 250px; margin-left: 20px;margin-right: 20px;margin-bottom: 20px">分配宿舍
      </el-button>
    </div>
    <div style="width: 290px;height: 240px; float:left; margin-top: -240px;margin-left: 370px;
    border: 1px solid rgba(43,43,43,0.3);
    border-radius: 5px;
    border-left: 0px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;">
      <p style="color: rgba(60,60,60);margin-top: 50px;margin-left: 45px;width: 200px;font-size: 18px;line-height: 30px;text-align: center">
        为所有无宿舍的学生分配宿舍</p>
      <el-button type="success" style="width: 250px; margin-left: 20px;margin-right: 20px;margin-top: 23px">一键分配
      </el-button>

    </div>
  </div>
</template>

<script>
export default {
  name: "allocate",
  data() {
    return {
      studentID: '',
      dormName: '',
    }
  },
  methods:{
    allocateDorm(){
      if (this.studentID==='' || this.dormName === ''){
        this.$message({
          message: '信息不能为空',
          type: 'warning'
        });
      }else{
        this.$store.dispatch('allocate',{studentID: this.studentID, dormName:this.dormName}).then(()=>{
          this.$message({
            message: '宿舍分配成功！',
            type: 'success'
          });
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
