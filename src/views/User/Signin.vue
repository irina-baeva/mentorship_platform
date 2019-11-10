<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm-3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
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

                <v-layout>
                  <v-flex xs12>
                    <v-btn type="submit">Sign in</v-btn>
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
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    user () {
            return this.$store.getters.user
        }
  },
   watch: {
        //we watch computed user, as a value we get whatever change
        user(value) {
            if (value !==null && value!==undefined ) {
                this.$router.push('/profile')
            }
        }
    },
  methods: {
  //method when we submit: we have to reach out firebase, create new user and all this via VUEX cuz we have to store user in store
  onSignin() {

    this.$store.dispatch("signUserIn", {
      email: this.email,
      password: this.password
    });
  }
  }
};
</script>