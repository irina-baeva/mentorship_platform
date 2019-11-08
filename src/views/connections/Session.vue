<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class>Session Detailes</h6>
          </v-card-title>
          <div class="d-flex">
            <v-img style="max-width: 40%; margin-left: 20px; "
              src="../../../public/img/user.png"
              height="200px"
              contain
            ></v-img>
            <v-spacer></v-spacer>
            <v-img style="max-width: 40%;  margin-right: 20px"
            :src="session.imageUrl"
              height="200px"
              contain
            ></v-img>
          </div>

          <v-card-text>
            <div class="info--text">{{session.date}} - {{session.location}}</div>
            <div>{{session.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="error">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ["id"],
  computed: {
    session() {
      return this.$store.getters.upcommingSession(this.id);
    }
  }
};
</script>