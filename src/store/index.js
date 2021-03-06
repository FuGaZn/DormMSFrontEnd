import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from "@/store/modules/permission";
import dorm from './modules/dorm'
import student from "@/store/modules/student";
import dormAllocate from "@/store/modules/dormAllocate";
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission,
    dorm,
    student,
    dormAllocate
  },
  getters
})

export default store
