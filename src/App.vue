<template>
  <v-app>
      <v-navigation-drawer permanent app fixed clipped :mini-variant.sync="mini" v-model="drawer">
        <v-toolbar flat class="transparent">
            <v-list class="pa-0">
              <v-list-tile avatar>
                  <v-list-tile-avatar>
                        <v-icon>rss_feed</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                      <v-btn flat color="blue" exact to="/">View News Feed</v-btn>
                  </v-list-tile-content>
                  <v-list-tile-action>
                      <v-btn icon @click.native.stop="mini = !mini">
                          <v-icon>chevron_left</v-icon>
                      </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-toolbar flat class="transparent">
            <v-list class="pa-0">
              <v-list-tile avatar>
                  <v-list-tile-avatar>
                        <v-icon>forum</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Chat Rooms</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-divider></v-divider>
          <v-toolbar flat class="transparent">
              <v-list class="pa-0">
                  <v-list-tile avatar>
                      <v-list-tile-avatar>
                          <v-icon>chat_bubble</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                          <v-list-tile-title>Recent Conversations</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
              </v-list>
          </v-toolbar>
          <contact-list></contact-list>
      </v-navigation-drawer>
      <v-toolbar app fixed :clipped-left="true">
          <v-toolbar-title>Vue Chat</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items v-if="this.$store.state.user.id === null">
            <v-btn flat color="green" exact to="/register">Register</v-btn>
            <v-btn flat color="blue" exact to="/login">Sign In</v-btn>
          </v-toolbar-items>
          <v-toolbar-items class="text-xs-center-justify" v-else>
            <v-btn flat>{{this.$store.state.user.username}}</v-btn>
            <!-- <v-btn flat>
                  <v-icon large>account_circle</v-icon>
            </v-btn> -->
            <v-btn flat color="red" @click="logout()">Logout</v-btn>
          </v-toolbar-items>
      </v-toolbar>
      <v-content>
          <router-view/>
      </v-content>
      <v-footer app>
          <span>&copy; 2017</span>
      </v-footer>
  </v-app>
</template>

<script>
import ContactList from './components/ContactList.vue'
export default {
  components: {
    'contact-list': ContactList
  },
  data() {
    return {
      drawer: true,
      mini: true,
      right: null
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
    }
  },
  name: 'App'
}
</script>
