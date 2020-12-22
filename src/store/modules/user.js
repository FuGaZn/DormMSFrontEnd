import {login, logout, getInfo, modifyPwd, modifyRole, listUser, addUser} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'
import {stuLogin} from "@/api/student";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    code:'',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_CODE:(state, code)=>{
    state.code = code
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      login({name: username.trim(), password: password}).then(response => {
        const {data} = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  stuLogin({commit}, form) {
    return new Promise((resolve, reject) => {
      const {id, code} = form
      stuLogin(id, code).then(response => {
        const {data} = response
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', id)
        commit('SET_ROLES', 'student')
        commit('SET_CODE', code)
        setToken(data.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  modifyPwd({commit}, ruleForm) {
    const {oldPassword, newPassword} = ruleForm
    return new Promise((resolve, reject) => {
      modifyPwd(oldPassword, newPassword).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {data} = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const {name, avatar, roles} = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLES', roles)
        //  console.log('roles '+state.user.roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  modifyRole({commit}, userVO) {
    return new Promise((resolve, reject) => {
      modifyRole(userVO).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  addUser({commit}, userVO) {
    return new Promise((resolve, reject) => {
      addUser(userVO).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  listUser({commit}) {
    return new Promise((resolve, reject) => {
      listUser().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

