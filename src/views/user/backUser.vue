<template>
  <div>
    <div style="position: absolute; left: 70px; top: 40px">
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="">添加</el-button>
    </div>
    <div style="position: absolute;right: 60px; top: 40px">
      <el-input size="mini" v-model="searchWord" style="width: 260px" placeholder="请输入内容">
        <el-button size="mini" slot="append" icon="el-icon-search" @click="search(searchWord)">搜索</el-button>
      </el-input>
    </div>
    <div style="margin-left: 70px;margin-top: 80px">
      <el-table :data="users" style="width: 100%" :default-sort="{prop: 'name'}">
        <el-table-column prop="workerID" label="工号" sortable width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" sortable width="180">
        </el-table-column>
        <el-table-column prop="roleString" label="角色" sortable width="180"
                         :filters="roleList"
                         :filter-method="filterRole">
        </el-table-column>
        <el-table-column prop="lastLoginTime" label="最近登录时间" sortable width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑用户" :visible.sync='editDialogVisible'>
      <el-form style="margin-left: 50px" :model="editUser" size="small">
        <el-form-item label="工号">
          {{ editUser.workerID }}
        </el-form-item>
        <el-form-item label="姓名">
          {{ editUser.name }}
        </el-form-item>
        <el-form-item label="角色">
          <el-checkbox-group v-model="editUser.roles">
            <el-checkbox label="高级管理员"></el-checkbox>
            <el-checkbox label='宿舍管理员'></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditForm">确认修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
  },
  data() {
    return {
      searchWord: '',
      roleList: [{text: '高级管理员', value: "高级管理员"}, {text: '宿舍管理员', value: '宿舍管理员'}, {text: '其他', value: ''}],
      editDialogVisible: false,
      editUser: {},
      users: [
        {
          uid: 0,
          workerID: '200101',
          name: 'admin',
          roles: ['高级管理员', '宿舍管理员'],
          roleString: '高级管理员/宿舍管理员',
          lastLoginTime: '2020/11/13 20:28:32',
          dialogVisible: false
        },
        {
          uid: 1,
          workerID: '200102',
          name: 'fjx',
          roles: ['宿舍管理员'],
          roleString: '宿舍管理员',
          lastLoginTime: '2020/11/13 20:28:32'
        },
      ]
    }
  },
  methods: {
    filterRole(value, row) {
      return row.roles.includes(value)
    },
    search(word) {
      console.log(word)
    },
    refreshTable() {

    },
    submitEditForm() {
      this.refreshTable()
    },
    handleDelete(index, row) {
      this.$prompt('请输入密码', '确定要删除该用户吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'password'
      }).then(({value}) => {
        const {workerID} = row
        // console.log(value+workerID)
        //param: workerID, passwd=>deleteUser
      })
    },
    handleEdit(index, row) {
      this.editDialogVisible = true;
      this.editUser = this.copy(row)
    },
    copy(obj1) {
      var obj2 = {};
      for (var i in obj1) {
        obj2[i] = obj1[i];
      }
      return obj2;
    }
  }
}
</script>

<style scoped>

</style>
