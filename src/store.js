import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {

  },
  mutations: {
    updateUser ( state, payload ) {
      state.user = payload;
    }
  },
  actions: {
    userLogin ({ commit, dispatch, getters, state }, { email, password }) {
      commit('updateUser', { email: email, name: 'DummyData', phone: '555-555-5555'})
    }
  }
})
