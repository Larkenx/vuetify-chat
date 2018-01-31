<template>
  <v-container fill-height fluid>
  <v-layout wrap align-center>
      <v-flex xs4 offset-xs4>
        <v-card>
          <v-toolbar flat color="blue white--text">
            <v-toolbar-title>Sign In</v-toolbar-title>
          </v-toolbar>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-container>
              <v-layout class="ma-1" fluid wrap>
                <v-container fluid grid-list-md>
                  <v-layout align-center-justify wrap>
                    <v-flex sm12>
                      <v-text-field
                        prepend-icon="person"
                        label="Email Address"
                        v-model="email"
                        required
                        :error="passwordOrEmailIncorrect()"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout align-center wrap>
                    <v-flex sm12>
                      <v-text-field
                        prepend-icon="lock"
                        label="Password"
                        v-model="password"
                        type="password"
                        required
                        :rules="[v => !passwordOrEmailIncorrect() || 'Your email or password is incorrect.']"
                        :error="passwordOrEmailIncorrect()"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-layout>
              <!-- Final row with block button -->
              <v-layout align-center>
                <span class="pl-2">
                  <router-link exact to="/register">Forgot your password?</router-link>
                  <span class="mr-2 ml-2 right_border"></span>
                  <router-link exact to="/register">Create an account</router-link>
                </span>

                <v-spacer></v-spacer>
                <v-btn
                  raised
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
    email: 'test@example.com',
    password: 'ilikecandysomuch'
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log('Logging in...')
        this.clearLoginError()
        this.$store.state.socket.emit('login', {
          email: this.email,
          password: this.password
        })
      } else {
        console.log("Couldn't validate the form inputs...")
      }
    },
    passwordOrEmailIncorrect() {
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
