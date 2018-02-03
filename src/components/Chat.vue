<template>
  <v-card v-if="userID !== undefined" flat height="100%">
    <v-layout row>
      <v-flex></v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-container grid-list-xl fluid style="height: 90%">
        <v-layout
          v-for="(message, index) in contacts[userID].messages"
          :key="index"
          row
          :align-start="message.sender === 'you'"
          :align-end="message.sender !== 'you'"
          :align-content-start="message.sender === 'you'"
          :align-content-end="message.sender !== 'you'"
        >
            <v-flex xs6 sm4 :offset-xs6="message.sender === 'you'" :offset-sm8="message.sender === 'you'">
              <v-card class="message" :color="message.sender !== 'you' ? 'white' : 'blue' ">
                <v-card-text :class="message.sender !== 'you' ? 'black--text' : 'white--text' ">
                  {{message.text}}
                </v-card-text>
              </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    <!-- <v-divider></v-divider> -->
    <v-layout row align-center>
      <v-flex class="pa-2" xs11>
        <v-text-field label="Type a message..."></v-text-field>
      </v-flex>
      <v-flex xs1 align-end style="min-width: 100px">
        <v-btn color="blue" flat>send &nbsp; <v-icon>send</v-icon></v-btn>
      </v-flex>
    </v-layout>
  </v-card>
  <v-container v-else fluid>
      <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
              <blockquote>
                  Hey, it looks like you have no conversations!
              </blockquote>
          </v-layout>
      </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  props: ['userID'],
  data() {
    return {
      contact: 
      messages:
    }
  },
  sendMessage() {
    // When I open a chat with someone, I want to see if there is an existing conversation between them
    // -- Yes, they share a conversation
    // Load the conversation from the vuex store and display messages as normally
    // -- No, no conversation has been stored in the db yet.
    // We need to wait until someone makes the first message. When the first message is created, create a conversation
  }
}
</script>

<style scoped>
/* .message {
  border-radius: 20.8px;
} */

h1,
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
}
</style>
