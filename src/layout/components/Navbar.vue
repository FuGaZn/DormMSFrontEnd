<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <el-button style="border:0px; border-radius: 0px" @click="modify_password.dialogVisible=true">
            修改密码
          </el-button>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="修改密码" :visible.sync="modify_password.dialogVisible" width="290px">
      <el-form :model="modify_password">
        <el-form-item>
          <el-input type="password" v-model="modify_password.oldPassword" style="width: 240px" placeholder="输入旧密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="modify_password.newPassword" placeholder="输入新密码" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="modifyPassword" type="primary" style="width: 240px">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  data(){
    return{
      modify_password:{
        newPassword:"",
        oldPassword:"",
        dialogVisible:false
      },
    }
  },
  methods: {
    info(type, content){
      if(type === 0){   //normal info
        this.$message(content)
      }else if(type === 1){
        this.$message({
          message: content,
          type : 'success'
        })
      }else if(type === 2){
        this.$message({
          message: content,
          type: 'warning'
        });
      }else if(type === 3){
        this.$message.error(content);
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    modifyPassword(){
      var oldPasswd = this.modify_password.oldPassword
      var newPasswd = this.modify_password.newPassword
      if(oldPasswd == ''){
        this.info(2,'请填入旧密码')
        return
      }
      if (newPasswd == ''){
        this.info(2,'请填入新密码')
        return
      }
      if (newPasswd === oldPasswd){
        this.info(2,'新密码不能与原密码相同')
        return
      }
      var _this = this
      console.log("navbar")
      this.$store.dispatch('user/modifyPwd', this.modify_password).then(() => {
        this.info(1,'修改成功，请重新登录')
        this.modify_password.dialogVisible=false
        this.logout()
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
