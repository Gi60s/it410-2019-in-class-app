import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    contacts: []
  },
  getters: {

  },
  mutations: {
    updateUser ( state, payload ) {
      state.user = payload;
    }
  },
  actions: {
    changePassword ({ commit }, { oldPassword, newPassword }) {

    },
    async register ({ commit }, { email, password }) {
      const res = await axios({
        method: 'post',
        data: { email, password },
        url: '/api/accounts/register'
      })
      commit('updateUser', { email, name: '', phone: '' })
    },
    updateProfile ({ commit }, { email, name, phone }) {

    },
    async userLogin ({ commit, dispatch, getters, state }, { email, password }) {
      const res = await axios({
        method: 'put',
        data: { email, password },
        url: '/api/accounts/login'
      })
      commit('updateUser', { email: email, name: 'DummyData', phone: '555-555-5555'})
    },
    userLogout ({ commit }) {

    }
  }
})
