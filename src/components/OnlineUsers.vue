<template>
  <v-list-group class="pa-0" prepend-icon="people">
    <v-list-tile slot="activator">
      <v-list-tile-content>
        <v-list-tile-title>Online Contacts</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile avatar v-for="(user, index) in getOnlineUsers()" :key="user.id" :to="`/chat/${user.id}`">
      <v-list-tile-avatar>
        <v-avatar size="36" class="teal">
          <span class="white--text">{{user.firstName[0] + user.lastName[0]}}</span>
        </v-avatar>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{`${user.firstName} ${user.lastName}`}}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list-group>
</template>

<script>
export default {
  data() {
    return {
      users: this.$store.state.onlineUsers
    }
  },
  methods: {
    getOnlineUsers() {
      return this.$store.state.onlineUsers.filter(u => {
        return u.id !== this.$store.state.user.id && u.socket !== this.$store.state.socket.id
      })
    }
  },
  name: 'ContactList'
}
</script>
