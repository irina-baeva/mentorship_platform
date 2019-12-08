<template>
  <v-container fill-height fluid grid-list-xl>
    <transition name="fade">
      <p v-if="showSuccess" class="success">profile updated</p>
    </transition>
    <v-layout justify-center wrap row>
      <v-flex xs12 md8 offset-sm3>
        <material-card
          color="green"
          title="Edit Profile"
          text="Complete your profile"
        >
          <v-form @submit.prevent>
            <v-container py-0>
              <v-flex xs12 md4>
                <v-text-field
                  label="University"
                  v-model="university"
                  :placeholder="userProfile.university"
                  name="university"
                  id="university"
                />
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  class="purple-input"
                  label="LinkedIn Profile"
                  v-model="linkedin"
                  name="linkedin"
                  id="linkedin"
                />
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  label="Github profile"
                  class="purple-input"
                  v-model="github"
                  name="github"
                  id="github"
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label=" Name Surname"
                  class="purple-input"
                  v-model="name"
                  :placeholder="userProfile.name"
                  name="fName"
                  id="fName"
                />
              </v-flex>

              <v-flex xs12>
                <v-textarea
                  class="purple-input"
                  label="About Me"
                  no-resize
                  name="about"
                  id="about"
                  v-model="about"
                  multi-line
                  required
                />
              </v-flex>
              <v-layout wrap>
                <v-layout row>
                  <v-flex xs6 sm6 offset-sm3>
                    <v-btn raised class="primary" @click="onPickFile"
                      >Upload Image</v-btn
                    >
                    <input
                      type="file"
                      style="display:none"
                      ref="fileInput"
                      accept="image/*"
                      @change="onFilePicked"
                    />
                  </v-flex>
                  <v-flex xs6 sm6 offset-sm3>
                    <img :src="imageUrl" height="150" />
                  </v-flex>
                </v-layout>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="updateProfile"
                  >
                    Update Profile
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex xs12 md4> </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import * as firebase from "firebase";
// const fb = require('../../firebaseConfig.js')

export default {
  data() {
    return {
      university: null,
      linkedin: null,
      github: "",
      name: "",
      imageUrl: "",
      about: "",
      showSuccess: false,
      image: null
    };
  },
  computed: {
    ...mapState(["userProfile"])
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", {
        name: this.name !== "" ? this.name : this.userProfile.name,
        university: this.university !== "" ? this.university : this.userProfile.university ,
        linkedin: this.linkedin !== "" ? this.linkedin : this.userProfile.linkedin,
        github: this.github !== "" ? this.github : this.userProfile.github,
        imageUrl: this.imageUrl !== "" ? this.imageUrl : this.userProfile.imageUrl,
        about: this.about !== "" ? this.about : this.userProfile.about,
        image: this.image
      });

      this.name = "";
      this.university = "";
      this.linkedin = "";
      this.github = "";
      this.imageUrl = "";
      this.about = "";

      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      console.log(event);
      console.log(event.target.files);
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      console.log(fileReader);
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });

      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      ///trying more
      var storageRef = firebase.storage().ref("userpics/" + filename);
      let uploadTask = storageRef.put(this.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot)
        },
        (error) => {
          console.log(error)
        },
        ()=> {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.imageUrl = downloadURL;
            console.log("File available at", downloadURL);
          });
        }
      );
    }
  }
};
</script>
