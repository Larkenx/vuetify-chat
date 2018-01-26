<template>
  <v-app>
      <v-navigation-drawer app fixed clipped :mini-variant.sync="mini" v-model="drawer">
        <v-toolbar flat class="transparent">
            <v-list class="pa-0">
              <v-list-tile avatar>
                  <v-list-tile-avatar>
                        <v-icon>rss_feed</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                      <v-btn flat color="blue" exact to="/">View News Feed</v-btn>
                  </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-toolbar>
          <v-toolbar flat class="transparent">
              <v-list class="pa-0">
                  <v-list-tile avatar>
                      <v-list-tile-avatar>
                          <v-icon>question_answer</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                          <v-list-tile-title>Recent Conversations</v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                          <v-btn icon @click.native.stop="mini = !mini">
                              <v-icon>chevron_left</v-icon>
                          </v-btn>
                      </v-list-tile-action>
                  </v-list-tile>
              </v-list>
          </v-toolbar>
          <contact-list></contact-list>
      </v-navigation-drawer>

      <v-toolbar app fixed :clipped-left="true">
          <v-toolbar-title>Vue Chat</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat color="green" exact to="/register">Register</v-btn>
            <v-btn flat color="blue">Sign In</v-btn>
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
      items: [
        {
          title: 'Home',
          icon: 'dashboard'
        },
        {
          title: 'About',
          icon: 'question_answer'
        }
      ],
      mini: true,
      right: null
    }
  },
  name: 'App'
}
</script>
