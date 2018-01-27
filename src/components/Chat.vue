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
            <v-flex xs4 :offset-xs8="message.sender === 'you'">
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
      <v-flex class="pa-2" xs10>
        <v-text-field label="Type a message..."></v-text-field>
      </v-flex>
      <v-flex xs2>
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
      contacts: {
        1: {
          id: '1',
          active: true,
          name: 'Jason Oner',
          avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
          messages: [
            { sender: 'you', text: "Hey Jason, what's up?" },
            { sender: 'Jason Oner', text: 'Yo, not much man. How about you?' },
            { sender: 'you', text: 'Just programming some Vue chat! Wanna see the source?' },
            { sender: 'Jason Oner', text: 'Nah man, maybe later.' },
            { sender: 'Jason Oner', text: 'Do you wanna see a movie tonight?' },
            { sender: 'you', text: 'Maybe, lemme ask my wife' }
          ]
        },
        2: {
          id: '2',
          active: true,
          name: 'Ranee Carlson',
          avatar: 'https://randomuser.me/api/portraits/women/15.jpg'
        },
        3: {
          id: '3',
          name: 'Cindy Baker',
          avatar: 'https://randomuser.me/api/portraits/women/20.jpg'
        },
        4: {
          id: '4',
          name: 'Ali Connors',
          avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
        }
      }
    }
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
