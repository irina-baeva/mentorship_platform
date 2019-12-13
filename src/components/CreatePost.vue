<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-content>
          <v-card max-width="600" class="mx-auto">
            <v-flex>
              <div class="create-post">
                <p>create a post</p>
                <form @submit.prevent>
                  <v-col cols="12" md="12">
                    <v-textarea
                      no-resize
                      solo
                      label="Your post is here"
                      v-model.trim="post.content"
                    ></v-textarea>
                    <v-btn
                      outlined
                      color="primary"
                      block
                      @click="createPost"
                      :disabled="post.content == ''"
                      >POST</v-btn
                    >
                  </v-col>
                </form>
              </div>
            </v-flex>
          </v-card>
          <v-card>
            <v-flex>
              <div class="col2">
                <div v-if="posts.length">
                  <div :key="post" v-for="post in posts" class="post">
                    <h5>{{ post.userName }}</h5>
                    <span>{{ post.createdOn | formatDate }}</span>
                    <p>{{ post.content | trimLength }}</p>
                    <ul>
                      <li>
                        <a>comments {{ post.comments }}</a>
                      </li>
                      <li>
                        <a>likes {{ post.likes }}</a>
                      </li>
                      <li><a>view full post</a></li>
                    </ul>
                  </div>
                </div>
                <div v-else>
                  <p class="no-results">There are currently no posts</p>
                </div>
              </div>
            </v-flex>
          </v-card>
        </v-content>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
const fb = require("../firebaseConfig.js");

export default {
  data() {
    return {
      post: {
        content: ""
      }
    };
  },
  computed: {
    ...mapState(["userProfile", "currentUser", 'posts'])
  },
  methods: {
    createPost() {
      fb.postsCollection
        .add({
          createdOn: new Date(),
          content: this.post.content,
          userId: this.currentUser.id.uid,
          userName: this.userProfile.name,
          comments: 0,
          likes: 0
        })
        .then(ref => {
          console.log(ref);
          this.post.content = "";
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
