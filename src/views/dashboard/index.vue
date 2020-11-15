<template>
  <div class="dashboard-container">
    <h1>{{name}}，欢迎回到&nbsp睡了么&nbsp宿舍后台管理系统</h1>
    <div>
      <h2>您大概想要？</h2>
      <el-tag type="success" style="margin: 10px" ><a @click="dormManage">宿舍管理</a></el-tag>
      <el-tag v-permission="['senior']" type="warning" style="margin: 10px"><a @click="userBack">后台用户管理</a></el-tag>
      <el-tag v-permission="['senior']" type="danger" style="margin: 10px"><a @click="userStudent">学生管理</a></el-tag>
      <el-tag v-permission="['ordinary']" type="warning" style="margin: 10px"><a @click="allocate">分配宿舍</a></el-tag>
      <el-tag v-permission="['ordinary']" type="success" style="margin: 10px"><a @click="changeDorm">退宿</a></el-tag>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import permission from "@/directive/index";
export default {
  name: 'Dashboard',
  directives:{
    permission
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods:{
    allocate(){
      this.$router.push(`/dorm/allocate`)
    },
    changeDorm(){
      this.$router.push(`/dorm/change`)
    },
    dormManage(){
      this.$router.push(`/dorm/manage`)
    },
    dormData(){
      this.$router.push(`/dorm/data`)
    },
    userBack(){
      this.$router.push(`/user/back`)
    },
    userStudent(){
      this.$router.push(`/user/student`)
    },

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
