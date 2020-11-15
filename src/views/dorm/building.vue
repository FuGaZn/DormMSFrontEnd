<template>
  <div style="margin-left: 50px">
    <h1 style="margin-top: 30px">{{buildingId}}号楼</h1>
    <div style="position: absolute;right: 60px; top: 40px">
      <el-input size="mini" v-model="searchWord" style="width: 260px" placeholder="请输入宿舍名">
        <el-button size="mini" slot="append" icon="el-icon-search" @click="search(searchWord)">搜索</el-button>
      </el-input>
      <el-button style="margin-left: 20px" size="mini" type="primary" icon="el-icon-plus">增加宿舍</el-button>
    </div>
    <el-table :data="table" style="width: 100%;margin-top: 30px;margin-left: 20px" :default-sort="{prop: 'dormName'}">
      <el-table-column prop="dormName" label="宿舍名" sortable width="120">
      </el-table-column>
      <el-table-column prop="floor" label="楼层" sortable width="120"
                       :filters="floors"
                       :filter-method="filterFloor" >
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
          <span v-if="scope.row.emptyBed<scope.row.totalBed && scope.row.emptyBed>0 " style="color: #99CCFF;font-weight: bold">未满</span>
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

    <el-dialog title="宿舍详情" :visible.sync="dormDialogVisible">
      <el-table :data="dormStudents">
        <el-table-column property="studentID" label=学号 width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="150"></el-table-column>
        <el-table-column property="genderShow" label="性别" width="100"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template>
            <el-button size="mini" type="danger" v-permission="['ordinary']">退宿</el-button>
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
  directives:{
    permission
  },
  created() {
    var bid = this.$route.params.bid
    this.buildingId = bid
    console.log(bid)
  },
  data(){
    return{
      dormDialogVisible:false,
      dormStudents:[{
        studentID:'2001210241',
        name:'fjx',
        genderShow:'男'
      },
        {
        studentID:'2001210241',
        name:'fjx',
        genderShow:'男'
      },
        {
        studentID:'2001210241',
        name:'fjx',
        genderShow:'男'
      },

      ],
      tagShow:0,
      buildingId:0,
      floors:[{text:1,value:1},{text:2,value:2},{text:3,value:3},{text:4,value:4},{text:5,value:5},],
      table:[
        {
          did:0,
          dormName:'E3524',
          building: '13',
          floor:5,
          totalBed:5,
          emptyBed:0
        },
        {
          did:0,
          dormName:'E3224',
          building: '13',
          floor:2,
          totalBed:3,
          emptyBed:1
        },
        {
          did:0,
          dormName:'E3224',
          building: '13',
          floor:2,
          totalBed:3,
          emptyBed:3
        },
      ]
    }
  },
  methods:{
    filterFloor(value, row){
      return value===row.floor
    },
    filterTag(value, row) {
      if (value === 0){
        return 0===row.emptyBed
      }
      if (value === 1){
        return row.emptyBed<row.totalBed && row.emptyBed>0
      }
      if (value === 2){
        return row.totalBed===row.emptyBed
      }
      //return row.tag === value;
    },
    showDormData(row) {
      this.dormDialogVisible=true
    },
    deleteDorm(index, row){
      const h = this.$createElement;
      this.$msgbox({
        title: '警告',
        message: h('p', null, [
          h('div', { style: 'color: red' }, '确定要删除该宿舍吗？'),
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
