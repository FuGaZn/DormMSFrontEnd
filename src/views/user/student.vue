<template>
  <div>
    <div style="position: absolute; left: 50px; top: 40px">
      <el-button-group>
        <el-tooltip class="item" effect="dark" content="Excel标题请与列表保持一致" placement="top">
          <el-button size="mini" type="primary" icon="el-icon-upload">上传Excel</el-button>
        </el-tooltip>
        <el-button size="mini" type="primary" icon="el-icon-download">导出Excel</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addDialogVisible=true">添加</el-button>
      </el-button-group>
    </div>
    <div style="position: absolute;right: 60px; top: 40px">
      <el-input size="mini" v-model="searchWord" style="width: 260px" placeholder="请输入内容">
        <el-button size="mini" slot="append" icon="el-icon-search" @click="search(searchWord)">搜索</el-button>
      </el-input>
    </div>
    <div style="margin-left: 50px;margin-top: 90px">
      <el-table :data="students" style="width: 100%" :default-sort="{prop: 'studentID'}">
        <el-table-column prop="studentID" label="学号" sortable width="150">
        </el-table-column>
        <el-table-column prop="name" label="姓名" sortable width="120">
        </el-table-column>
        <el-table-column prop="genderShow" label="性别" sortable width="120"
                         :filters="genderList"
                         :filter-method="filterGender">
        </el-table-column>
        <el-table-column prop="dormName" label="宿舍" sortable width="120">
        </el-table-column>
        <el-table-column prop="building" label="宿舍楼" sortable width="120"
                         :filters="buildingList"
                         :filter-method="filterBuilding">
        </el-table-column>
        <el-table-column prop="floor" label="楼层" sortable width="120">
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
    <el-dialog title="编辑学生信息" :visible.sync='editDialogVisible'>
      <el-form style="margin-left: 50px" :model="editStudent" size="small">
        <el-form-item label="学号">
          {{ editStudent.studentID }}
        </el-form-item>
        <el-form-item label="姓名">
          {{ editStudent.name }}
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="editStudent.genderShow" label="男">男</el-radio>
          <el-radio v-model="editStudent.genderShow" label="女">女</el-radio>
        </el-form-item>
        <!--
        <el-form-item label="宿舍">
          <el-input v-model="modifiedDorm.dormName" style="width: 150px"></el-input>
        </el-form-item>
        -->
        <el-form-item>
          <el-button type="primary" @click="submitEditForm">确认修改</el-button>
          <!--
          <el-button type="danger" @click="removeDorm(editStudent.studentID)">退宿</el-button>
          -->
          <el-button @click="editDialogVisible=false">取消</el-button>

        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="添加学生信息" :visible.sync='addDialogVisible'>
      <el-form style="margin-left: 50px" :model="addStudent" size="small" :rules="addFormRules" ref="addStudent" label-width="100px" label-position="right">
        <el-form-item label="学号" required prop="studentID">
          <el-input v-model="addStudent.studentID" style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item label="姓名" required prop="name">
          <el-input v-model="addStudent.name" style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item label="性别" required>
          <el-radio v-model="addStudent.genderShow" label="男">男</el-radio>
          <el-radio v-model="addStudent.genderShow" label="女">女</el-radio>
        </el-form-item>
        <!--
        <el-form-item label="宿舍">
          <el-input v-model="addStudent.dormName" style="width: 150px"></el-input>
        </el-form-item>
        -->
        <el-form-item>
          <el-button type="primary" @click="submitAddForm(addStudent)">添加</el-button>
          <el-button @click="addDialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "student",
  data() {
    return {
      addDialogVisible: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        studentID: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
      },
      addStudent: {
        studentID: '',
        name: '',
        gender: 1,
        genderShow: '男',
        dormName: '',
        building: '',
        floor: 0
      },
      genderList: [{text: '男', value: 1}, {text: '女', value: 0}],
      buildingList: [],
      searchWord: '',
      editDialogVisible: false,
      modifiedDorm: {
        dormName: 'E3524'
      },
      editStudent: {
        studentID: '2001210241',
        name: 'fjx',
        gender: '1',
        genderShow: '男',
        dormName: 'E3524',
        building: '13',
        floor: 5

      },
      students: []
    }
  },
  created() {
    this.refreshStudentTable()
  },
  methods: {
    refreshStudentTable(){
      this.$store.dispatch("listStudents").then(response=>{
        const {data} = response
        const {students} = data
        this.students = students

        for (let i in students){
          let item = {
            text:students[i].building,
            value:students[i].building
          }
          if (!this.buildingList.includes(item)){
            this.buildingList.push(item)
          }
        }
      })
    },
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
    submitAddForm(formName){
      if (formName.name == '' || formName.studentID==''){
        this.info(3,'信息不能为空')
      }else{
        this.addDialogVisible = false
        this.students.push(this.addStudent)
        this.$store.dispatch("addStudent",formName).then(()=>{
          this.$message({
            type: 'success',
            message: '成功!'
          });
        })
      }
    },
    //退宿
    removeDorm(){
      this.$confirm('确认为这位学生退宿?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功!'
        });
      }).catch(() => {
      });
    },
    filterBuilding(value, row) {
      return row.building == value
    },
    filterGender(value, row) {
      return row.gender == value
    },
    search(word) {
      console.log(word)
    },
    refreshTable() {

    },
    submitEditForm() {
      this.editDialogVisible = false
      this.refreshTable()
    },
    handleDelete(index, row) {
      this.$prompt('请输入密码', '确定要删除该用户吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'password'
      }).then(({value}) => {
        const {studentID} = row
        // console.log(value+workerID)
        //param: workerID, passwd=>deleteUser
      })
    },
    handleEdit(index, row) {
      this.editDialogVisible = true;
      this.editStudent = this.copy(row)
      this.modifiedDorm = this.copy(row.dorm)
    },
    copy(obj1) {
      let obj2 = {};
      for (let i in obj1) {
        obj2[i] = obj1[i];
      }
      return obj2;
    }
  }
}
</script>

<style scoped>

</style>
