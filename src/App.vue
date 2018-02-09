<template>
  <v-app :dark="darkTheme">
      <v-navigation-drawer permanent app fixed clipped :mini-variant.sync="mini" v-model="drawer" v-if="loggedIn()">
        <v-list expand>
          <!-- NEWS -->
          <v-list-tile class="pa-0">
            <v-list-tile-action>
              <v-icon>rss_feed</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-btn flat color="blue" exact to="/">View News Feed</v-btn>
            </v-list-tile-content>
            <v-spacer></v-spacer>
            <v-list-tile-action>
                <v-btn icon @click.native.stop="mini = !mini">
                    <v-icon v-if="!mini">chevron_left</v-icon>
                    <v-icon v-else>chevron_right</v-icon>
                </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <!-- Chat Rooms  -->
          <!-- <v-list-group class="pa-0" prepend-icon="forum">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>Chat Rooms</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group> -->
          <!-- Online people  -->
          <online-users></online-users>
          <!-- Recent Conversations -->
          <!-- <v-list-group class="pa-0" prepend-icon="chat_bubble">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>Direct Messages</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar v-for="person in contacts" :key="person.title" :to="`/chat/${person._id}`">
              <v-list-tile-avatar>
                <img :src="person.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="person.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group> -->
        </v-list>
      </v-navigation-drawer>
      <!--  Top Toolbar -->
      <v-toolbar app fixed :clipped-left="true">
          <v-toolbar-title>Vuetify Chat</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn class="pa-2" flat @click="darkTheme = !darkTheme"><v-icon>invert_colors</v-icon></v-btn>
          </v-toolbar-items>
          <v-toolbar-items v-if="this.$store.state.user._id === null">
            <v-btn flat color="green" exact to="/register">Register</v-btn>
            <v-btn flat color="blue" exact to="/login">Sign In</v-btn>
          </v-toolbar-items>
          <v-toolbar-items class="text-xs-center-justify" v-else>
            <v-btn flat>{{this.$store.state.user.email}}</v-btn>
            <v-btn flat>
                  <v-icon large>account_circle</v-icon>
            </v-btn>
            <v-btn flat color="red" @click="logout()">Logout</v-btn>
          </v-toolbar-items>
      </v-toolbar>
      <!-- Main Content  -->
      <v-content>
          <router-view/>
      </v-content>
      <!-- <v-footer app>
          <span>&copy; 2018 Steven Myers</span>
      </v-footer> -->
  </v-app>
</template>

<script>
import ContactList from './components/ContactList.vue'
import OnlineUsers from './components/OnlineUsers.vue'
export default {
  components: {
    'contact-list': ContactList,
    'online-users': OnlineUsers
  },
  data() {
    return {
      drawer: true,
      mini: true,
      darkTheme: true
    }
  },
  methods: {
    getFullName() {
      let { firstName, lastName } = this.$store.state.user
      return firstName + ' ' + lastName
    },
    logout() {
      console.log('Logging out...')
      this.$store.dispatch('logout')
    },
    loggedIn() {
      return this.$store.state.user._id !== null
    }
  },
  name: 'App'
}
</script>
