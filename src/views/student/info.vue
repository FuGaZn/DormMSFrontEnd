<template>
  <div v-loading.fullscreen.lock="loading">
    <h1 style="font-size: 24px;margin-left: 100px;margin-top: 40px">学号:&nbsp{{name}}</h1>
    <div style="margin-left: 104px;margin-top: 26px">姓名:&nbsp{{student.studentName}}</div>
    <div style="margin-left: 104px;margin-top: 20px">宿舍:&nbsp{{student.dormName}}</div>
    <div style="margin-left: 100px;margin-top: 30px">
      <span v-if="this.msg.code === 20000" style="color: #499b54">{{this.msg.message}}</span>
      <span v-if="this.msg.code !== 20000" style="color: red">{{this.msg.message}}</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "info",
  computed: {
    ...mapGetters([
      'name',
    ])
  },
  created() {
    this.getBackInfo()
  },
  data() {
    return {
      loading:true,
      student:{
        studentName:'',
        dormName:''
      },
      msg:{
        code:20000,
        message:''
      }
    }
  },
  methods:{
    getBackInfo(){
      let timer
      this.$store.dispatch("getBackInfo",this.name).then((response)=>{
        const {data} = response
        const {msg} = data
        if (msg!=null){
          const {message} = msg
          this.msg.message = message
          clearTimeout(timer)
          this.getInfo()
        }else{
          timer = setTimeout(() => {
            this.getBackInfo()
          }, 5000)
        }
      })
    },
    getInfo(){
      this.$store.dispatch('getStudent',this.name).then((response)=>{
        this.student.studentName = response.data.student.name
        this.student.dormName = response.data.student.dormName
        this.loading = false
      })
    },
  }
}
</script>

<style scoped>

</style>
