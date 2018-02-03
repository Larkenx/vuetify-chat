<template>
<v-container fluid grid-list-xl >
  <v-layout row justify-center>
    <v-flex xs6>
      <div>
        <h2>News Feed</h2>
      </div>
    </v-flex>
  </v-layout>
  <v-layout row wrap justify-center v-for="(post, index) in posts" :key="index">
    <v-flex xs6>
      <v-card :raised="post.hovered" v-on:mouseover="post.hovered = true" v-on:mouseout="post.hovered = false">
        <v-card-title>
          <div>
            {{post.text}}
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions class="post_actions">
          <!-- <v-badge class="badge_numeric" overlay overlap top right> -->
            <!-- <span class="badge_text_numeric" slot="badge">{{post.likes}}</span> -->
            <v-btn icon>
              <v-icon color="blue lighten-2">thumb_up</v-icon>
            </v-btn>
          <!-- </v-badge> -->
          <!-- <v-badge class="badge_numeric" color="green" overlay overlap top right> -->
            <!-- <span class="badge_text_numeric" slot="badge">{{post.comments.length}}</span> -->
            <v-btn icon>
              <v-icon color="green darken-3">comment</v-icon>
            </v-btn>
          <!-- </v-badge> -->
          <!-- <v-spacer> </v-spacer> -->
          <!-- <v-btn flat>View Comments</v-btn> -->
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon color="red">favorite</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="teal">bookmark</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="blue darken-1">share</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data() {
    const lipsum = 'Ei autem dolorum explicari sed, no eos movet iriure fabulas. At his legere mediocrem, ut vim impedit necessitatibus, corpora disputationi cu nec. Magna consequuntur eu nam, pro ex quot voluptaria referrentur, cu duo aperiri maiorum. Mea in etiam errem iracundia, no homero populo ullamcorper quo. Ne mel gubergren assueverit, eos quem viris nostro ut. Decore persequeris pro in, usu agam dicta constituam ut. Pro nominati disputationi definitionem no, quod sanctus id usu. At tollit utinam percipitur eum, affert detraxit an vix. Cu harum hendrerit mea. Animal aliquando interesset ex mei'.split(
      ' '
    )
    return {
      posts: [
        {
          text: this.shuffle(lipsum),
          likes: 0,
          comments: [{ text: 'Wow, so cool!' }, { text: 'TRUMP SUCKS' }, { text: 'HILLARY FOR PRISON 2073' }],
          hovered: false
        },
        {
          text: this.shuffle(lipsum),
          likes: 5,
          comments: [{ text: 'YEEEHAAW' }, { text: "I'm gonna go eat cake" }],
          hovered: false
        },
        {
          text: this.shuffle(lipsum),
          likes: 9,
          comments: [{ text: 'LOVE U! GRANDMA' }],
          hovered: false
        },
        {
          text: this.shuffle(lipsum),
          likes: 11,
          comments: [],
          hovered: false
        }
      ]
    }
  },
  methods: {
    shuffle: a => {
      var j, x, i
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = a[i]
        a[i] = a[j]
        a[j] = x
      }
      return a[0].charAt(0).toUpperCase() + a.slice(1).join(' ')
    }
  },
  name: 'WelcomeScreen'
}
</script>
<style>
.badge_text_numeric {
  font-size: 10px;
}

.post_actions {
  height: 54px;
}
</style>
