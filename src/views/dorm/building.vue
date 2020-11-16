<template>
  <div style="margin-left: 50px">
    <h1 style="margin-top: 30px">{{ buildingId }}号楼</h1>
    <div style="position: absolute;right: 60px; top: 40px">
      <el-input size="mini" v-model="searchWord" style="width: 260px" placeholder="请输入宿舍名">
        <el-button size="mini" slot="append" icon="el-icon-search" @click="search(searchWord)">搜索</el-button>
      </el-input>
      <el-button style="margin-left: 20px" size="mini" type="primary" icon="el-icon-plus" @click="addDormVisible=true">
        增加宿舍
      </el-button>
    </div>
    <el-table :data="dorms" style="width: 100%;margin-top: 30px;margin-left: 20px" :default-sort="{prop: 'dormName'}">
      <el-table-column prop="dormName" label="宿舍名" sortable width="120">
      </el-table-column>
      <el-table-column prop="floor" label="楼层" sortable width="120"
                       :filters="floors"
                       :filter-method="filterFloor">
      </el-table-column>
      <el-table-column prop="totalBed" label="总床位" sortable width="120">
      </el-table-column>
      <el-table-column prop="emptyBed" label="空闲床位" sortable width="120">
      </el-table-column>
      <el-table-column label="状态"
                       :filters="[{ text: '已满', value: 0 }, { text: '未满', value: 1 }, { text: '空', value: 2 }]"
                       :filter-method="filterTag" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.totalBed===scope.row.emptyBed" style="color: #009966; font-weight: bold">空</span>
          <span v-if="0===scope.row.emptyBed" style="color: #FF6666; font-weight: bold">已满</span>
          <span v-if="scope.row.emptyBed<scope.row.totalBed && scope.row.emptyBed>0 "
                style="color: #99CCFF;font-weight: bold">未满</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" @click="showDormData(scope.row)">详情</el-button>
            <el-button v-permission="['senior']"
                       size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button v-permission="['senior']"
                       size="mini"
                       type="danger"
                       @click="deleteDorm(scope.$index, scope.row)">删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加宿舍" :visible.sync='addDormVisible'>
      <div>
        <el-form :model="addDormForm" size="small" label-width="100px" label-position="left" style="margin-left: 40px;">
          <el-form-item label="宿舍号" required>
            <el-input style="width: 240px" v-model="addDormForm.dormName"></el-input>
          </el-form-item>
          <el-form-item label="楼层" required>
            <el-input-number style="width: 240px" v-model="addDormForm.floor" controls-position="right" :min="1"
                             :max="buildingData.floors"></el-input-number>
          </el-form-item>
          <el-form-item label="床位数" required>
            <el-input-number style="width: 240px" v-model="addDormForm.totalBed" controls-position="right" :min="1"
            ></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button @click="addDormVisible= false">取消</el-button>
            <el-button type="primary" @click="submitAddDormForm(addDormForm)">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog title="宿舍详情" :visible.sync="dormDialogVisible">
      <el-table :data="dormStudents">
        <el-table-column property="studentID" label=学号 width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="150"></el-table-column>
        <el-table-column property="genderShow" label="性别" width="100"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" v-permission="['ordinary']" @click="removeDorm(scope.row)">
              退宿
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import permission from "@/directive/index";

export default {
  name: "buildingTable",
  directives: {
    permission
  },
  created() {
    let buildingID = this.$route.params.bid
    this.buildingId = buildingID
    this.refreshDormTable()
  },
  data() {
    return {
      addDormVisible: false,
      addDormForm: {
        dormName: '',
        building: '13',
        floor: 1,
        totalBed: 0,
        emptyBed: 0
      },
      buildingData: {
        buildingID: '5',
        floors: 5,
      },
      dormDialogVisible: false,
      dormStudents: [{
        studentID: '2001210241',
        name: 'fjx',
        genderShow: '男'
      },
        {
          studentID: '2001210241',
          name: 'fjx',
          genderShow: '男'
        },
        {
          studentID: '2001210241',
          name: 'fjx',
          genderShow: '男'
        },

      ],
      searchWord: '',
      tagShow: 0,
      buildingId: '',
      floors: [{text: 1, value: 1}, {text: 2, value: 2}, {text: 3, value: 3}, {text: 4, value: 4}, {
        text: 5,
        value: 5
      },],
      dorms: []
    }
  },
  methods: {
    submitAddDormForm(addDormForm) {
      addDormForm.emptyBed = addDormForm.totalBed
      addDormForm.building = this.buildingData.buildingID
      this.$store.dispatch("addDorm", addDormForm).then(() => {
        this.dorms.push(addDormForm)
        this.addDormForm = {}
        this.addDormVisible = false
        this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success'
        });
      })
    },
    refreshDormTable() {
      this.$store.dispatch("listDorms", this.buildingId).then(response => {
        const {data} = response
        const {dorms, buildingData} = data
        this.dorms = dorms
        this.buildingData = buildingData
      }).catch()
    },
    search() {

    },
    filterFloor(value, row) {
      return value === row.floor
    },
    filterTag(value, row) {
      if (value === 0) {
        return 0 === row.emptyBed
      }
      if (value === 1) {
        return row.emptyBed < row.totalBed && row.emptyBed > 0
      }
      if (value === 2) {
        return row.totalBed === row.emptyBed
      }
      //return row.tag === value;
    },
    showDormData(row) {
      this.dormStudents = []
      this.$store.dispatch("listStudentsInDorm", row.dormName).then(response => {
        this.dormStudents = response.data.students
        this.dormDialogVisible = true
      })

    },
    removeDorm(row) {
      let studentID = row.studentID
      this.$store.dispatch('removeDorm', studentID).then(() => {
        this.$message({
          type: 'success',
          message: '退宿成功！'
        });
        this.showDormData(row)
      })

    },
    deleteDorm(index, row) {
      const h = this.$createElement;
      this.$msgbox({
        title: '警告',
        message: h('p', null, [
          h('div', {style: 'color: red'}, '确定要删除该宿舍吗？'),
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {

          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
    }
  }
}
</script>

<style scoped>

</style>
