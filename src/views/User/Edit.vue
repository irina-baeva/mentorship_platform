<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap row
    >
      <v-flex
        xs12
        md8 offset-sm3
      >
        <material-card
          color="green"
          title="Edit Profile"
          text="Complete your profile"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="University"
                    v-model="profile.university"
                    name="university"
                    id="university"
                    />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    class="purple-input"
                    label="LinkedIn Profile"
                    v-model="profile.linkedin"
                    name="linkedin"
                    id="linkedin"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="Github profile"
                    class="purple-input"
                    v-model="profile.github"
                    name="github"
                    id="github"
                    />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="First Name"
                    class="purple-input"
                    v-model="profile.fName"
                    name="fName"
                    id="fName"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
                    v-model="profile.lName"
                    name="lName"
                    id="lName"/>
                </v-flex>
                <v-flex xs12 md6 >
              <v-text-field
                v-model="profile.imageUrl"
                name="imageUrl"
                label="Profile URL"
                id="imageUrl"
              ></v-text-field>
                </v-flex>
               
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    no-resize
                  name="about"
                  id="about"
                  v-model="profile.about"
                  multi-line
                  required
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success" @click = "updateProfile"
                  >
                    Update Profile
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex
        xs12
        md4
      >

      </v-flex>
    </v-layout>
    
  </v-container>
</template>

<script>
import * as firebase from 'firebase'
export default {
  data: () => ({
    profile: {
    university: null,
    linkedin: null,
    github: "",
    fName: "",
    lName: "",
    imageUrl: "",
    about: ""
    }
  }
  ),
  firestore(){
    var db = firebase.firestore();
    const user = firebase.auth().currentUser;
    return {
      profile: db.collection('profiles').doc(user.user.uid)

    }
  },
  methods: {
      updateProfile(){
        this.$firestore.profile.update(this.profile)
      }
  }
};
</script>