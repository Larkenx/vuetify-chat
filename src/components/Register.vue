<template>
  <v-container fill-height fluid v-if="this.$store.state.user.id === null">
    <v-card style="margin: auto; width: 700px">
      <v-toolbar flat color="green white--text">
        <v-toolbar-title>Create an Account</v-toolbar-title>
      </v-toolbar>
      <v-form class="pl-2 pr-2" v-model="valid" ref="form" lazy-validation>
        <v-container grid-list-xl fluid>
          <!-- First Name -->
          <v-layout wrap>
            <v-flex xs12 sm6>
              <v-text-field
                label="First Name"
                v-model="firstName"
                :rules="[v => !!v || 'First Name is required.']"
                required
              ></v-text-field>
            </v-flex>
            <!-- Last Name -->
            <v-flex xs12 sm6>
              <v-text-field
                label="Last Name"
                v-model="lastName"
                :rules="[v => !!v || 'Last Name is required.']"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <!-- email -->
          <v-layout>
            <v-flex xs6>
              <v-text-field
                label="Email Address"
                v-model="email"
                :rules="emailRules"
                required
                v-on:blur="checkIfEmailExists()"
                :error="emailTaken()"
              ></v-text-field>
            </v-flex>
            <!-- email errors  -->
            <v-flex xs6 v-if="emailTaken()">
                <v-layout class="text-xs-center" align-center>
                    <v-icon class="pa-1" color="red">error</v-icon>
                    Sorry, that email is taken.
                </v-layout>
            </v-flex>
            <v-flex xs6 v-else-if="email.trim() !== '' && !emailTaken()">
              <v-layout class="text-xs-center" align-center>
                  <v-icon class="pa-1" color="green">check_circle</v-icon>
                  That email is available!
              </v-layout>
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
              color="green"
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
    passwordRules: [p => !!p || 'Password is required.', p => !(p.length <= 8) || 'Password must be longer than 8 characters.'],
    emailRules: [
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail address.'
      },
      v => !!v || ' email is required.'
    ],
    valid: true,
    firstName: 'Steven',
    lastName: 'Myers',
    email: 'larkenx@gmail.com',
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
          firstName: this.firstName.trim(),
          lastName: this.lastName.trim(),
          email: this.email.trim(),
          password: this.password
        })
      } else {
        console.log("Couldn't validate the form inputs...")
      }
    },
    clear() {
      this.$refs.form.reset()
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
    },
    emailTaken() {
      return (
        this.$store.state.errors.registrationError !== null &&
        this.$store.state.errors.registrationError.toLowerCase().includes('email')
      )
    },
    checkIfEmailExists() {
      this.$store.state.socket.emit('checkIfEmailExists', this.email.trim())
    }
  }
}
</script>

<style>

</style>
