<template>
  <span>
      <v-layout row>
        <v-container grid-list-xl fluid v-if="userID in directMessages" row>
          <v-layout
            v-for="(msg, index) in getMessages()"
            :key="index"
            row
            :align-start="msg.sender === $store.state.user._id"
            :align-end="msg.sender !== $store.state.user._id"
            :align-content-start="msg.sender === $store.state.user._id"
            :align-content-end="msg.sender !== $store.state.user._id"
          >
          <v-flex xs6 sm4 :offset-xs6="msg.sender === $store.state.user._id" :offset-sm8="msg.sender === $store.state.user._id">
            <v-card class="msg" :color="msg.sender !== $store.state.user._id ? 'white' : 'blue' ">
              <v-card-text :class="msg.sender !== $store.state.user._id ? 'black--text' : 'white--text' ">
                {{msg.text}}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container v-else fluid>
        <v-card color="blue">
          <v-card-text>
            <v-icon class="pa-2">info</v-icon>
            Hey, it doesn't look like you two have spoken before! Say hi and introduce yourself.
          </v-card-text>
        </v-card>
      </v-container>
    </v-layout>
    <v-footer app inset :style="{height: messageInputHeight}">
      <v-layout row align-center class="pa-4">
        <v-flex xs11>
          <v-text-field v-model="message" @keyup.enter="sendMessage()" single-line label="Type a message..."></v-text-field>
        </v-flex>
        <v-flex xs1 align-end style="min-width: 100px">
          <v-btn color="blue" flat @click="sendMessage()">send &nbsp; <v-icon>send</v-icon></v-btn>
        </v-flex>
      </v-layout>
    </v-footer>
  </span>
</template>

<script>
export default {
  props: ['userID'],
  data() {
    return {
      messageInputHeight: '48px',
      message: '',
      directMessages: this.$store.state.directMessages
    }
  },
  updated() {
    // when the messages become updated, we want to scroll to the bottom (maybe only if they are within some amount from the bottom?)
    if (window.pageYOffset) {
      console.log(window.pageYOffset)
      // smooth scroll new message
      let maxHeight = document.body.offsetHeight - window.innerHeight
      window.scrollTo(0, maxHeight)
    }
  },
  methods: {
    getMessages() {
      let { userID } = this.$route.params
      return userID in this.directMessages ? this.directMessages[userID].messages : []
    },
    sendMessage() {
      // When I open a chat with someone, I want to see if there is an existing conversation between them
      // -- Yes, they share a conversation
      // Load the conversation from the vuex store and display messages as normally
      // -- No, no conversation has been stored in the db yet.
      // We need to wait until someone makes the first message. When the first message is created, create a conversation
      let { directMessages, socket, user } = this.$store.state
      let { userID } = this.$route.params

      console.log(`Sending msg: '${this.message}'`)
      if (directMessages[userID]) {
        let payload = {
          conversation: directMessages[userID],
          message: { text: this.message, sender: user._id }
        }

        socket.emit('sendMessage', payload)
        this.$store.dispatch('loadNewLocalMessage', payload)
      } else {
        console.log('New conversation started ...')
        socket.emit('startConversation', {
          sender: user._id,
          receiver: userID,
          message: { text: this.message, sender: user._id }
        })
      }
      this.message = ''
    }
  }
}
</script>

<style scoped>
/* .message {
  border-radius: 20.8px;
} */

/* h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
} */
</style>
