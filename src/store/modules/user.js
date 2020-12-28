import { getToken, setToken, removeToken, setUserInfo } from '@/utils/auth'

const states = {
  token: getToken(),
  userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_USER_INFO: (state, data) => {
    let _data = JSON.stringify(data)
    setUserInfo(_data)
    state.userInfo = data
  },
  RESET_USER_INFO: (state, data) => {
    state.userInfo = {}
  },
}

const actions = {
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  setUserInfo({ commit }, data) {
    commit('SET_USER_INFO', data)
  },
  resetUserInfo({ commit }) {
    sessionStorage.removeItem('userInfo');
    commit('RESET_USER_INFO', {})
  },
}

export default {
  namespaced: true,
  state: states,
  mutations,
  actions
}