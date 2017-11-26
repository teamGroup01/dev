import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

import {
  loginByUsername,
  logout,
  getUserInfo
} from '@/api/login'

export const user = {
  state: {
    roles: [],
    token: getToken(),
    introduction: '',
    name: '',
    avatar: ''
  },
  action: {
    // user login
    LoginByUsername({
      commit
    }, userinfo) {
      const username = userinfo.username.trim()
      const {
        password
      } = userinfo
      return new Promise((resolve, reject) => {
        loginByUsername(username, password).then(response => {
          const data = response.data
          setToken(response.data.token)
          commit('SET_TOKEN', data.token)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // get info
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) {
            reject('error')
          }
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // log out
    Logout({
      commit,
      state
    }) {
      return new Promise((resolve, rejcet) => {
        logout(state.token).then(response => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
        }).catch(error => {
          rejcet(error)
        })
      })
    },
    FedLogout({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    }
  }
}
