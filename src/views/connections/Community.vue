<template>
  <v-container>
    <v-layout>
      <v-flex xs12 class="text-center">
        <h2>Find a mentor</h2>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-center">
        <v-form>
          <v-container>
            <v-col cols="12">
              <v-text-field label="Solo" placeholder="Search" solo></v-text-field>
            </v-col>
          </v-container>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex row wrap>
        <v-card class="mx-auto" max-width="344" v-for="user in users" :key="user.id">
          <v-img :src="user.imageUrl"></v-img>
          <v-card-title>{{user.name}}</v-card-title>
          <v-card-subtitle>{{user.university}}</v-card-subtitle>
          <v-card-subtitle>{{user.skills}}</v-card-subtitle>

          <v-card-actions>
            <v-btn color="green" text>Follow</v-btn>
            <v-btn text>Profile</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      users: [
        //  everything is going to be taken from database
        {
          imageUrl: "https://picsum.photos/id/1/200/300",
          id: "kjbdkabck",
          name: "Name Surname",
          university: "Code University",
          skills: "VueJs"
        },
        {
          imageUrl: "https://picsum.photos/id/27/200/300",
          id: "cvsvs",
          name: "Name Surname",
          university: "Code University",
          skills: "VueJs"
        },
        {
          imageUrl: "https://picsum.photos/id/8/200/300",
          id: "kjbdkfsfabck",
          name: "Name Surname",
          university: "Code University",
          skills: "VueJs"
        },{
          imageUrl: "https://picsum.photos/id/3/200/300",
          id: "kjbdkabck",
          name: "Name Surname",
          university: "Code University",
          skills: "VueJs"
        }
      ]
    };
  }
};
</script>
<style scoped>
.title {
  /* position: absolute; */
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 50px;
  color: white;
  padding: 20px;
  font-size: 2em;
  text-align: center;
}
</style>