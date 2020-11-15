<template>
<div>
  <h1 style="margin-left: 50px; color: rgb(60,60,60)">宿舍楼</h1>
  <div style="position: absolute;right: 100px; top: 40px">
    <el-button size="mini" type="primary" icon="el-icon-plus">增加宿舍楼</el-button>
  </div>
  <div style="margin-left: 50px;margin-top: 30px">
    <el-table :data="buildings" style="width: 100%" :default-sort="{prop: 'dormName'}" show-summary sum-text="合计">
      <el-table-column prop="buildingID" label="楼号" sortable width="120">
      </el-table-column>
      <el-table-column prop="floors" label="层数" sortable width="120">
      </el-table-column>
      <el-table-column prop="dormTotal" label="总宿舍数" sortable width="120">
      </el-table-column>
      <el-table-column prop="dormEmpty" label="有余宿舍" sortable width="120">
      </el-table-column>
      <el-table-column prop="bedTotal" label="总床位" sortable width="120">
      </el-table-column>
      <el-table-column prop="bedEmpty" label="空闲床位" sortable width="120">
      </el-table-column>
      <el-table-column label="操作" width="220" v-permission="['senior']">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" @click="showBuildingData(scope.row.buildingID)">详情</el-button>
            <el-button v-permission="['senior']"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button v-permission="['senior']"
              size="mini"
              type="danger"
              @click="deleteBuilding(scope.$index, scope.row)">删除
            </el-button>
          </el-button-group>

        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import permission from "@/directive/index";
export default {
  name: "add",
  directives:{permission},
  data(){
    return{
      buildings:[
        {
          buildingID:'13',
          floors:5,
          dormTotal:100,
          dormEmpty:20,
          bedTotal:340,
          bedEmpty:120
        },
        {
          buildingID:'5',
          floors:5,
          dormTotal:100,
          dormEmpty:20,
          bedTotal:340,
          bedEmpty:120
        },

      ]
    }
  },
  methods:{
    showBuildingData(id) {
      this.$router.push(`/dorm/building/` + id)
    },
    deleteBuilding(index, row){
      const h = this.$createElement;
      this.$msgbox({
        title: '警告',
        message: h('p', null, [
          h('div', null, '确定要删除该宿舍楼吗？'),
          h('div', { style: 'color: red' }, '这一操作会删除所有相关的宿舍信息'),
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showInput:true,
        inputType:'password',
        inputPlaceholder:'输入密码',
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
