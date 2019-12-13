<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm-3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex class="xs12 sm6 offset-sm-3">
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                 <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="name"
                      label="Name"
                      id="name"
                      v-model="name"
                      type="text"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12>
                    <v-btn type="submit">Sign up</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import * as firebase from 'firebase'
const fb = require('../../firebaseConfig.js')

export default {

  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      university: ""
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : true;
    },
    user() {
      return this.$store.getters.user;
    },

    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    //we watch computed user, as a value we get whatever change
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/profile");
      }
    }
  },
  methods: {
    //method when we submit: we have to reach out firebase, create new user and all this via VUEX cuz we have to store user in store
   onSignup() {
    fb.auth.createUserWithEmailAndPassword(this.email, this.password).then(user => {
        this.$store.commit('setCurrentUser', user.user)
        console.log(user.user.uid)
        // create user obj
        fb.usersCollection.doc(user.user.uid).set({
            name: this.name,
        }).then(() => {
            this.$store.dispatch('fetchUserProfile')
            this.$router.push('/profile')
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
},
    onDismissed() {
      console.log("Dismised");
      this.$store.dispatch("clearError");
    }
  }
};
</script>
