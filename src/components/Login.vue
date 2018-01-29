<template>
  <v-container fill-height fluid>
  <v-layout wrap align-center>
      <v-flex xs6 offset-xs3>
        <v-card style="min-width: 300px">
          <v-toolbar flat color="blue white--text">
            <v-toolbar-title>Sign In</v-toolbar-title>
          </v-toolbar>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-container>
              <v-layout class="ma-1" fluid wrap>
                <v-container fluid grid-list-md>
                  <v-layout align-center-justify wrap>
                    <v-flex sm12 md6>
                      <v-text-field
                        prepend-icon="person"
                        label="Username"
                        v-model="username"
                        required
                        :error="passwordOrUsernameIncorrect()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex sm12 md5 offset-md1>
                        <v-card class="pa-1" style="min-height: 50px" color="red white--text" v-if="passwordOrUsernameIncorrect()">
                          <v-layout wrap align-center>
                            <v-flex xs10 fill-height>
                                <b style="font-size: 13px;">{{this.$store.state.errors.loginError}}</b>
                            </v-flex>
                            <v-flex xs2 fill-height>
                              <v-btn small icon @click="clearLoginError()">
                                <v-icon color="white">cancel</v-icon>
                              </v-btn>
                            </v-flex>
                          </v-layout>
                        </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout align-center wrap>
                    <v-flex sm12 md6>
                      <v-text-field
                        prepend-icon="lock"
                        label="Password"
                        v-model="password"
                        type="password"
                        required
                        :error="passwordOrUsernameIncorrect()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex sm12 md6 class="text-xs-center">
                      <v-layout>
                        <v-flex xs12>
                          <router-link exact to="/register">Forgot your password?</router-link>
                          <span class="mr-2 ml-2 right_border"></span>
                          <router-link exact to="/register">Create an account</router-link>
                        </v-flex>
                      </v-layout>

                    </v-flex>
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
        this.clearLoginError()
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

.right_border {
  border-right: 2px solid #d1d1d1;
  height: 20px;
}
</style>
