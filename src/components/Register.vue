<template>
  <v-container fluid class="text-xs-center">
    <v-card style="max-width: 500px; margin: auto;">
      <v-form class="pa-2" v-model="valid" ref="form" lazy-validation>
        <v-container grid-list-xl fluid>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <v-text-field
                label="First Name"
                v-model="firstName"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                label="Last Name"
                v-model="lastName"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <v-text-field
                label="Username"
                v-model="userName"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs7>
              <v-text-field
                label="Password"
                v-model="password"
                type="password"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs7>
              <v-text-field
                label="Confirm Your Password"
                v-model="confirmPassword"
                type="password"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-btn
          class="white--text"
          color="green"
          @click="submit"
          :disabled="!valid"
        >
          Create Account
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </v-card>
  </v-container>


</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [v => !!v || 'Name is required', v => (v && v.length <= 10) || 'Name must be less than 10 characters'],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    checkbox: false
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // socket.emit('login', userData)
      }
    },
    clear() {
      this.$refs.form.reset()
    }
  }
}
</script>
