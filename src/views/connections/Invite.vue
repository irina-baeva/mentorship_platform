<template>
  <v-container>
    <v-card class="pa-8">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <h4>Invite for mentorship session</h4>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-avatar class="mx-auto d-block mb-4" size="130">
            <v-img src="../../../public/img/user.png"></v-img>
          </v-avatar>
          <v-flex class="text-center" >
            <span>Your mentee: {Name Surname}</span>
          </v-flex>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <form @submit.prevent="onInviteSession">
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                  v-model="location"
                  name="location"
                  label="Location"
                  id="location"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-textarea
                  no-resize
                  name="description"
                  label="Description"
                  id="description"
                  v-model="description"
                  multi-line
                  required
                ></v-textarea>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <h4>Choose a Data and Time</h4>
              </v-flex>
            </v-layout>
            <!-- //date -->
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="computedDateFormattedMomentjs"
                      clearable
                      label="DD/MM/YY"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @change="menu1 = false"></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
            <!-- //time -->
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="HH/MM"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 class="mb-4">
                <v-btn class="primary mb2" :disabled="!formIsValid" 
                type="submit"

                >Invite for session</v-btn>
                <!-- {{submittableDateTime}} -->
              </v-flex>
            </v-layout>
          </form>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>
 <script>
import moment from "moment";
//   import format from 'date-fns/format'

export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    firstNameMentee: "",
    lastNameMentee: "",
    imageUrl: "",
    location: "",
    description: ""
  }),

  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    },
    formIsValid() {
      return this.location !== "" && this.description !== "";
    }
  },
  methods: {
      onInviteSession (){
          const invitationData = {
        firstNameMentee: this.firstNameMentee,
        lastNameMentee: this.lastNameMentee,
        imageUrl: this.imageUrl,
        description: this.description,
        location: this.location,
        date: new Date
          }
        this.$store.dispatch('createInvitation', invitationData)
        this.$router.push('/sessions')

      }
  }
};
</script>