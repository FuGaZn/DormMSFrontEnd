<template>
  <div>
    <div style="width: 100%; left: 0;top: 0; height: 170px;">
      <h1 style="text-align: center;">这里是总数据</h1>
    </div>
    <div style="left: 0px; top: 190px">
      <div style="width: 100%; margin-left: 10px;margin-top: 10px" v-for="item in buildings" :key="item">
        <el-card style="width:300px; height:280px; float: left; margin: 10px;position: relative">
          <div style="position: absolute; width: 100%;padding-left: 30px">
            <h1 style="text-align: left;cursor: pointer" @click="showBuildingData(item.id)">
              {{ item.id }}号楼({{ item.floorNumber }}层)</h1>
            <div class="card-text-item">
              <span class="card-text-item-topic">宿舍总数</span>
              <span class="card-text-item-value">{{ item.dormTotal }}</span>
            </div>
            <div class="card-text-item">
              <span class="card-text-item-topic">空闲宿舍</span>
              <span class="card-text-item-value">{{ item.dormEmpty }}</span>
            </div>
            <div class="card-text-item">
              <span class="card-text-item-topic">床位总数</span>
              <span class="card-text-item-value">{{
                  item.bedTotal
                }}</span>
            </div>

            <div class="card-text-item">
              <span class="card-text-item-topic">空闲床位</span>
              <span class="card-text-item-value">{{
                  item.bedEmpty
                }}</span>
            </div>
          </div>

        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "info",
  data() {
    return {
      totalData: {
        buildings: 2,
        dormTotal: 100,
        dormEmpty: 20,
        bedTotal: 100,
        bedEmpty: 20
      },
      buildings: [
        {
          id: 13,
          floorNumber: 5,
          dormTotal: 100,
          dormEmpty: 20,
          bedTotal: 100,
          bedEmpty: 20
        },
        {
          id: 5,
          floorNumber: 5,
          dormTotal: 130,
          dormEmpty: 10,
          bedTotal: 250,
          bedEmpty: 10
        }, {
          id: 13,
          floorNumber: 5,
          dormTotal: 100,
          dormEmpty: 20,
          bedTotal: 100,
          bedEmpty: 20
        },
        {
          id: 5,
          floorNumber: 5,
          dormTotal: 130,
          dormEmpty: 10,
          bedTotal: 250,
          bedEmpty: 10
        }, {
          id: 13,
          floorNumber: 5,
          dormTotal: 100,
          dormEmpty: 20,
          bedTotal: 100,
          bedEmpty: 20
        },
        {
          id: 5,
          floorNumber: 5,
          dormTotal: 130,
          dormEmpty: 10,
          bedTotal: 250,
          bedEmpty: 10
        },
      ]
    }
  },

  methods: {
    showBuildingData(id) {
      this.$router.push(`/dorm/building/` + id)
    }
  }
}
</script>

<style scoped>
.card-text-item {
  width: 100%;
  float: top;
  height: 30px
}

.card-text-item-topic {
  position: absolute;
  right: 60%;
  text-align: right
}

.card-text-item-value {
  position: absolute;
  left: 45%;
  text-align: left;
  margin-left: 10px
}
</style>
