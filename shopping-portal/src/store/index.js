import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false
  },
  mutations: {
    LOG_IN (state, payLoad) {
      state.loggedIn = payLoad
    }
  },
  actions: {
    LOGIN ({ commit }, payLoad) {
      commit('LOG_IN', payLoad)
    }
  },
  modules: {
  }
})
