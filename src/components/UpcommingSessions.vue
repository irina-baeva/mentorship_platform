<template>
      <v-card max-width="600" class="mx-auto">
        <!-- <v-system-bar color="pink darken-2" dark> -->
          <!-- <v-spacer></v-spacer>

          <v-icon>mdi-window-minimize</v-icon>

          <v-icon>mdi-window-maximize</v-icon>

          <v-icon>mdi-close</v-icon> -->
        <!-- </v-system-bar> -->

        <v-app-bar color="white">
          <v-app-bar-nav-icon to='/sessions'></v-app-bar-nav-icon>
          <v-toolbar-title>Upcoming sessions</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn> -->
        </v-app-bar>

        <v-container>
          <v-row dense>
            <v-col v-for="(session, i) in sessions" :key="i" cols="12">
              <v-card :color="session.color" >
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title >
                      <span class="mr-2" > You have a session with </span>
                      <span class="mr-2" v-text="session.firstNameMentee"></span>
                      <span v-text="session.lastNameMentee"></span>

                    </v-card-title>
                    <v-card-subtitle v-text="session.date"></v-card-subtitle>
                    <v-card-actions>
                        <v-btn @click="onLoadMeetup(session.id)"><v-icon left>mdi-plus</v-icon>View Detailes</v-btn>
                    </v-card-actions>
                  </div>
                  <v-avatar class="ma-3" size="70" tile>
                    <v-img :src="session.imageUrl"></v-img>
                  </v-avatar>
                  
                </div>
                
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
</template>

<script>
export default {
  computed: {
    sessions() {
      return this.$store.getters.featuredSessions
    }
  },
    methods: {
      onLoadMeetup(id){
          this.$router.push('/sessions/' + id)

      }
  }
};
</script>