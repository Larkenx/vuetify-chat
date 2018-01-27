<template>
  <v-container fill-height fluid v-if="this.$store.state.user.id === null">
    <v-card style="max-width: 500px; margin: auto;">
      <v-layout>
        <v-flex class="pt-3 text-xs-center" xs12>
          <h2 class="headline">Register Your Account</h2>
        </v-flex>
      </v-layout>
      <v-form class="pl-2 pr-2" v-model="valid" ref="form" lazy-validation>
        <v-container grid-list-xl fluid>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <v-text-field
                label="First Name"
                v-model="firstName"
                :rules="[v => !!v || 'First Name is required.']"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                label="Last Name"
                v-model="lastName"
                :rules="[v => !!v || 'Last Name is required.']"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6>
              <v-text-field
                label="Username"
                v-model="username"
                :rules="[v => !!v || ' Username is required.']"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs6>
              <v-text-field
                label="Password"
                v-model="password"
                type="password"
                :rules="passwordRules"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs6>
              <v-text-field
                label="Confirm Your Password"
                v-model="confirmPassword"
                :rules="validatePasswords()"
                type="password"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-spacer></v-spacer>
            <v-btn
              class="white--text"
              color="blue"
              @click="submit"
              :disabled="!valid"
            >
              Create Account
            </v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-layout>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
  <v-container fill-height fluid v-else>
    <v-card style="max-width: 500px; margin: auto;">
      <v-layout>
        <v-flex xs12 class="text-xs-center">
          <h2 >Account Registration</h2>
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
    passwordRules: [p => !!p || 'Password is required.', p => !(p.length <= 8) || 'Password must be longer than 8 characters.'],
    valid: true,
    firstName: 'Steven',
    lastName: 'Myers',
    username: 'larkenx',
    password: 'ilikecandysomuch',
    confirmPassword: 'ilikecandysomuch'
  }),
  methods: {
    validatePasswords() {
      return [p => p === this.password || 'Passwords must match.']
    },
    submit() {
      if (this.$refs.form.validate()) {
        console.log('Submitting form...')
        this.$store.state.socket.emit('hello', 1)
        this.$store.state.socket.emit('register', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password
        })
      } else {
        console.log("Couldn't validate the form inputs...")
      }
    },
    clear() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
