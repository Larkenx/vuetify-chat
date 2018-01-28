<template>
  <v-container fill-height fluid>

  <v-layout wrap align-center>
      <v-flex class="pa-3" sm2 offset-sm2 v-if="passwordOrUsernameIncorrect()" style="min-width: 140px">
        <v-card color="red white--text">
          <v-layout>
              <p class="pa-2">
                {{this.$store.state.errors.loginError}}
              </p>
              <v-btn small icon @click="clearLoginError()">
                <v-icon color="white">cancel</v-icon>
              </v-btn>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 sm4 :offset-sm4="!passwordOrUsernameIncorrect()">
        <v-card>
          <v-layout>
            <v-flex class="pt-3 text-xs-center" xs12>
              <h2 class="headline">Sign In</h2>
            </v-flex>
          </v-layout>
          <v-form class="pl-2 pr-2" v-model="valid" ref="form" lazy-validation>
            <v-container grid-list-xl fluid>
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
      </v-flex>
  </v-layout>
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
    passwordOrUsernameIncorrect() {
      return this.$store.state.errors.loginError !== null
    },
    clearLoginError() {
      this.$store.dispatch('clearError', 'login')
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
