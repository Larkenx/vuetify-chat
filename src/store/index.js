import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'
import router from '../router'

Vue.use(Vuex)

const socket = io.connect(window.location.hostname + ':3000') // connect to the express server
console.log('Connecting to socket server at ' + window.location.hostname + ':3000')

const types = {
  loadUserInformation: 'LOAD_USER_INFORMATION',
  loadNewConversation: 'LOAD_NEW_CONVERSATION',
  loadError: 'LOAD_ERROR',
  clearError: 'CLEAR_ERROR',
  logout: 'LOGOUT'
}

const initialUserState = {
  id: null,
  username: null,
  firstName: null,
  lastName: null,
  conversations: null
}

let store = new Vuex.Store({
  state: {
    socket,
    user: initialUserState,
    conversations: [],
    errors: {
      registrationError: null,
      loginError: null
    }
  },
  actions: {
    loadUserInformation({ commit }, userData) {
      commit(types.loadUserInformation, userData)
    },
    loadError({ commit }, err) {
      commit(types.loadError, err)
    },
    loadNewConversation({ commit }, conversation) {
      commit(types.loadNewConversation, conversation)
    },
    clearError({ commit }, type) {
      commit(types.clearError, type)
    },
    logout({ commit }) {
      commit(types.logout)
    }
  },
  mutations: {
    // stuff we can do to mutate the actual state
    [types.loadUserInformation](state, userData) {
      state.user = userData
    },
    [types.loadError](state, err) {
      let { error, type } = err
      if (type === 'registration') {
        state.errors.registrationError = error
      } else if (type === 'login') {
        state.errors.loginError = error
      }
    },
    [types.loadNewConversation](state, conversation) {
      state.conversations.push(conversation)
    },
    [types.clearError](state, type) {
      if (type === 'registration') {
        state.errors.registrationError = null
      } else if (type === 'login') {
        state.errors.loginError = null
      }
    },
    [types.logout](state) {
      state.user = { ...initialUserState }
      router.push('/login')
    }
  }
})

/* Client Side Socket listeners */
socket.on('loginSuccessful', userData => {
  store.dispatch('loadUserInformation', userData)
  router.push('/')
})

socket.on('loadNewConversation', conversation => {
  store.dispatch('loadNewConversation', conversation)
  // router.push(`/chat/${conversation.id}`)
})

socket.on('registrationSuccess', userData => {
  store.dispatch('loadUserInformation', userData)
  router.push('/')
})

socket.on('registrationError', err => {
  console.log(err)
  store.dispatch('loadError', { error: err, type: 'registration' })
})

socket.on('loginError', err => {
  store.dispatch('loadError', { error: err, type: 'login' })
})

export default store
