<template>
  <v-list-group class="pa-0" prepend-icon="chat">
    <v-list-tile slot="activator">
      <v-list-tile-content>
        <v-list-tile-title>Messages</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile avatar v-for="(user, index) in getOnlineUsers()" :key="user._id" :to="`/chat/${user._id}`">
        <v-list-tile-avatar>
          <v-badge color="red" right overlap :value="getNotifications(user._id) > 0">
            <span slot="badge">{{getNotifications(user._id)}}</span>
          <v-avatar size="32" class="teal">
            <span class="white--text">{{user.firstName[0] + user.lastName[0]}}</span>
          </v-avatar>
        </v-badge>
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
      users: this.$store.state.loadedUsers,
      directMessages: this.$store.state.directMessages
    }
  },
  methods: {
    getOnlineUsers() {
      // console.log(this.$store.state.user)
      return Object.values(this.$store.state.loadedUsers).filter(u => {
        return u._id !== this.$store.state.user._id
      })
    },
    getNotifications(id) {
      if (this.$route.path.includes(id)) {
        return 0
      }
      return id in this.$store.state.directMessages ? this.$store.state.directMessages[id].notifications : 0
    }
  },
  name: 'ContactList'
}
</script>
