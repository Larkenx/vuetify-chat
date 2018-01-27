<template>
  <v-container fill-height fluid v-if="this.$store.state.user.id === null">
    <v-card style="margin: auto; width: 600px">
      <v-layout>
        <v-flex class="pt-3 text-xs-center" xs12>
          <h2 class="headline">Sign In</h2>
        </v-flex>
      </v-layout>
      <v-form class="pl-2 pr-2" v-model="valid" ref="form" lazy-validation>
        <v-container grid-list-md fluid>
          <v-layout fluid>
            <v-container fluid>
              <v-layout align-center>
                <v-flex xs12>
                  <v-text-field
                    label="Username"
                    v-model="username"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout align-center>
                <v-flex xs12>
                  <v-text-field
                    label="Password"
                    v-model="password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout align-center>
                <v-flex xs12 class="text-xs-center">
                  <router-link exact to="/register">Forgot your password?</router-link>
                </v-flex>
                <!-- <v-flex xs6>
                  If you don't have an account, but you'd like to create one, you can register <router-link exact to="/register">here</router-link>.
                </v-flex> -->
              </v-layout>
            </v-container>
          </v-layout>
          <!-- Final row with block button -->
          <v-layout>
            <v-btn
              block
              class="white--text"
              color="blue"
              @click="submit"
              :disabled="!valid"
            >
              Login
            </v-btn>
          </v-layout>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
  <v-container fill-height fluid v-else>
    <v-card style="max-width: 500px; margin: auto;">
      <v-layout>
        <v-flex xs12 class="text-xs-center">
          <h2>Account Registration</h2>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 class="text-xs-center">
          <v-icon x-large color="gray">error</v-icon>
        </v-flex>
      </v-layout>
      <v-card-text>You're already logged in! If you'd like to register a new account, please log out and try again.</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    username: 'larkenx',
    password: 'ilikecandysomuch'
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log('Logging in...')
        this.$store.state.socket.emit('login', {
          username: this.username,
          password: this.password
        })
      } else {
        console.log("Couldn't validate the form inputs...")
      }
    },
    clear() {
      this.username = ''
      this.password = ''
    },
    usernameTaken() {
      return (
        this.$store.state.errors.registrationError !== null &&
        this.$store.state.errors.registrationError.toLowerCase().includes('username')
      )
    },
    clearUsernameError() {
      console.log('Client clearing username error...')
      if (this.usernameTaken()) this.clearRegistrationError()
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
