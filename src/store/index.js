import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

const socket = io.connect(window.location.hostname + ':3000') // connect to the express server

const types = {
  loadUserInformation: 'LOAD_USER_INFORMATION'
}

let store = new Vuex.Store({
  state: {
    socket,
    user: { _id: null, username: null, firstName: null, lastName: null, conversations: null }
  },
  actions: {
    loadUserInformation({ commit }, userData) {
      commit(types.loadUserInformation, userData)
    }
  },
  mutations: {
    // stuff we can do to mutate the actual state
    [types.loadUserInformation](state, userData) {
      state.user = { ...userData }
      state.conversations = userData.conversations
    }
  }
})

/* Client Side Socket listeners */
socket.on('loginSuccessful', userData => {
  store.dispatch('loadUserInformation', userData)
})

socket.on('registrationSuccess', userData => {
  store.dispatch('loadUserInformation', userData)
})
export default store
