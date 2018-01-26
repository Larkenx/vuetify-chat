<template>
  <v-list subheader dense class="pt-0">
    <v-list-tile avatar v-for="person in contacts" :key="person.title" :to="`/chat/${person.id}`">
      <v-list-tile-avatar>
        <img :src="person.avatar">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-html="person.name"></v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-icon color="teal">chat_bubble</v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>
<script>
export default {
  data() {
    return {
      contacts: [
        { id: '1', active: true, name: 'Jason Oner', avatar: 'https://randomuser.me/api/portraits/men/86.jpg' },
        { id: '2', active: true, name: 'Ranee Carlson', avatar: 'https://randomuser.me/api/portraits/women/15.jpg' },
        { id: '3', name: 'Cindy Baker', avatar: 'https://randomuser.me/api/portraits/women/20.jpg' },
        { id: '4', name: 'Ali Connors', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' }
      ]
    }
  },
  name: 'ContactList'
}
</script>
