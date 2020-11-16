<template>
  <div>
    <div style="margin-left: 50px;margin-top: 50px">
      <h2>退宿</h2>
      <el-input style="width: 400px" v-model="removedStudentID" placeholder="输入学号"></el-input>
      <el-button @click="removeDorm()" type="primary">确定</el-button>
    </div>
    <div style="margin-top: 60px;margin-left: 50px">
      <h2>更改宿舍</h2>
      <el-input auto-complete="off" style="width: 190px;margin-right: 10px" v-model="changeStudentID"
                placeholder="学号"></el-input>
      <el-input auto-complete="off" style="width: 190px;" v-model="changeDorm" placeholder="宿舍号"></el-input>
      <el-button @click="handleChangeDorm" type="primary" style="margin-left: 10px">确定</el-button>
    </div>
    <div style="margin-top: 60px;margin-left: 50px">
      <h2>调换宿舍</h2>
      <el-input auto-complete="off" style="width: 200px;margin-right: 10px" v-model="exchangeStudents.id1"
                placeholder="学号"></el-input>
      <el-button @click="exchangeDorm" type="primary" icon="el-icon-refresh" round></el-button>
      <el-input auto-complete="off" style="width: 200px;margin-left: 10px" v-model="exchangeStudents.id2"
                placeholder="学号"></el-input>
    </div>

  </div>
</template>

<script>
//退宿or调换宿舍
export default {
  name: "changeDorm",
  data() {
    return {
      removedStudentID: '',
      exchangeStudents: {
        id1: '',
        id2: ''
      },
      changeStudentID: '',
      changeDorm: ""
    }
  },
  methods: {
    handleChangeDorm() {
      if (this.changeDorm == '' ) {
        this.$message({
          type: 'warning',
          message: '请填入宿舍号'
        });
      } else if (this.changeStudentID == '' ) {
        this.$message({
          type: 'warning',
          message: '请填入学号'
        });
      } else {
        this.$store.dispatch('changeDorm', {studentID: this.changeStudentID,dormName: this.changeDorm}).then(() => {
          this.$message({
            type: 'success',
            message: '宿舍调换成功！'
          });
        })
      }
    },
    removeDorm() {
      if (this.removedStudentID == '') {
        this.$message({
          type: 'warning',
          message: '请填入学号'
        });
      } else {
        this.$store.dispatch('removeDorm', this.removedStudentID).then(() => {
          this.$message({
            type: 'success',
            message: '退宿成功！'
          });
        })
      }
    },
    exchangeDorm() {
      if (this.exchangeStudents.id1 == '' || this.exchangeStudents.id2 == '') {
        this.$message({
          type: 'warning',
          message: '请填入学号'
        });
      } else {
        this.$store.dispatch('exchangeDorm', this.exchangeStudents).then(() => {
          this.$message({
            type: 'success',
            message: '宿舍调换成功！'
          });
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
