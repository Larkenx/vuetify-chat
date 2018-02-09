import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'
import router from '../router'

Vue.use(Vuex)
const port = process.env.PORT || 5000
const socket = io.connect(window.location.hostname + ':' + port) // connect to the express server
console.log('Connecting to socket server at ' + window.location.hostname + ':' + window.location.port)

const types = {
  loadUserInformation: 'LOAD_USER_INFORMATION',
  loadNewConversation: 'LOAD_NEW_CONVERSATION',
  loadAllConversations: 'LOAD_ALL_CONVERSATIONS',
  loadNewMessage: 'LOAD_NEW_MESSAGE',
  loadNewLocalMessage: 'LOAD_NEW_LOCAL_MESSAGE',
  clearNotifications: 'CLEAR_NOTIFICATIONS',
  loadUsers: 'LOAD_USERS',
  loadError: 'LOAD_ERROR',
  clearError: 'CLEAR_ERROR',
  logout: 'LOGOUT'
}

const initialUserState = {
  _id: null,
  email: null,
  firstName: null,
  lastName: null,
  conversations: [],
  contacts: []
}

let store = new Vuex.Store({
  state: {
    socket,
    user: initialUserState,
    conversations: [],
    loadedUsers: [],
    directMessages: {},
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
    loadAllConversations({ commit }, conversations) {
      commit(types.loadAllConversations, conversations)
    },
    loadNewMessage({ commit }, params) {
      commit(types.loadNewMessage, params)
    },
    loadNewLocalMessage({ commit }, params) {
      console.log('Loading new local message...', params)
      commit(types.loadNewLocalMessage, params)
    },
    loadUsers({ commit }, users) {
      commit(types.loadUsers, users)
    },
    clearNotifications({ commit }, userID) {
      commit(types.clearNotifications, userID)
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
      state.user.conversations.push(conversation._id)
      if (conversation.participants.length === 2) {
        let p = conversation.participants.filter(u => {
          return u !== state.user._id
        })
        if (p.length === 1) {
          Vue.set(state.directMessages, p[0], { ...conversation, notifications: conversation.messages.length })
        }
      }
    },
    [types.loadAllConversations](state, conversations) {
      state.conversations = conversations
      conversations.forEach(c => {
        if (c.participants.length === 2) {
          let p = c.participants.filter(u => {
            return u !== state.user._id
          })
          if (p.length === 1) {
            Vue.set(state.directMessages, [p[0]], { ...c, notifications: c.messages.length })
          }
        }
      })
    },
    [types.loadNewMessage](state, params) {
      let { conversation, message } = params
      if (message.sender !== state.user._id) {
        let conversationToUpdate = state.conversations.filter(c => {
          return c._id === conversation._id
        })
        if (conversationToUpdate.length !== 1) {
          console.log("Uh oh. Received message for a conversation we don't have")
        } else {
          console.log('Added new message to a conversation: ', message.text)
          conversationToUpdate[0].messages.push(message)
          if (conversation._id in state.directMessages) {
            state.directMessages[message.sender].messages.push(message)
            // Vue.set(state.directMessages[message.sender], p[0], { ...conversation, notifications: conversation.messages.length })
            state.directMessages[message.sender].notifications++
          }
        }
      }
    },
    [types.loadNewLocalMessage](state, params) {
      let { conversation, message } = params
      let conversationToUpdate = state.conversations.filter(c => {
        return c._id === conversation._id
      })
      if (conversationToUpdate.length !== 1) {
        console.log("Uh oh. Received message for a conversation we don't have")
      } else {
        console.log('Added new message to a conversation: ', message.text)
        conversationToUpdate[0].messages.push(message)
        if (message.receiver in state.directMessages) {
          state.directMessages[message.receiver].messages.push(message)
        }
      }
    },
    [types.loadUsers](state, users) {
      console.log('Updated list of logged in users:', users)
      state.loadedUsers = users
    },
    [types.clearNotifications](state, userID) {
      state.directMessages[userID].notifications = 0
    },
    [types.clearError](state, type) {
      if (type === 'registration') {
        state.errors.registrationError = null
      } else if (type === 'login') {
        state.errors.loginError = null
      }
    },
    [types.logout](state) {
      socket.emit('logout', state.user)
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
  console.log('Client received a new conversation!', conversation)
  store.dispatch('loadNewConversation', conversation)
  // router.push(`/chat/${conversation._id}`)
})
socket.on('loadAllConversations', conversations => {
  console.log('Client received all conversations!', conversations)
  store.dispatch('loadAllConversations', conversations)
  // router.push(`/chat/${conversation._id}`)
})
socket.on('loadUsers', users => {
  store.dispatch('loadUsers', users)
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

socket.on('newMessage', params => {
  store.dispatch('loadNewMessage', params)
})

export default store
