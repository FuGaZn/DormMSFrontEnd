<template>
  <div style="margin-left: 20px">
    <h1>{{buildingId}}号楼</h1>
    <el-table :data="table" style="width: 100%" :default-sort="{prop: 'dormName'}">
      <el-table-column prop="dormName" label="宿舍名" sortable width="180">
      </el-table-column>
      <el-table-column prop="floor" label="层数" sortable width="180">
      </el-table-column>
      <el-table-column prop="totalBed" label="总床数" sortable width="180">
      </el-table-column>
      <el-table-column prop="emptyBed" label="空闲床数" sortable width="180">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: "buildingTable",
  created() {
    var bid = this.$route.params.bid
    this.buildingId = bid
    console.log(bid)
  },
  data(){
    return{
      buildingId:0,
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
      ]
    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
