 <template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md5>
        <v-content>
          <v-card class="v-card-profile">
            <v-flex>
            <v-avatar class="mx-auto d-block" size="130">
              <v-img :src="userProfile.imageUrl" class="profile__image"></v-img>
            </v-avatar>
            </v-flex>

            <v-card-text class="text-xs-center">

        
          <a class="profile__link" :href="userProfile.linkedin"><v-icon class="profile__icon" size="30px" color = "blue">fab fa-linkedin-in</v-icon></a>
          <a class="profile__link" :href="userProfile.github"><v-icon size="30px" color = "black">fab fa-github</v-icon></a>
          <p class="card-title font-weight-light">{{userProfile.university}}</p>
          <p class="card-title font-weight-ligh user_surname"> {{userProfile.name}}</p>
          <p
            class="card-description font-weight-light"
          >{{userProfile.about}}</p>
              <v-flex row>
                <v-btn color="success" round class="font-weight-light">Follow</v-btn>
                <v-btn color="error" round class="font-weight-light ml-2" to="/invite">Invite</v-btn>
                <v-spacer></v-spacer>
                <v-btn to="/edit" color="primary" round class="font-weight-light">Edit</v-btn>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-content>
      </v-flex>
      <v-flex xs12 md7>
        <v-content>
          <!-- <HelloWorld/> -->
          <UpcommingSessions />
          <CreatePost/>>
          <!-- <User/> -->
        </v-content>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UpcommingSessions from "../../components/UpcommingSessions";
import CreatePost from "../../components/CreatePost";

// import * as firebase from 'firebase'
import { mapState } from 'vuex'
// const fb = require('../../firebaseConfig.js')

export default {
  name: "App",
  components: {
    UpcommingSessions,
    CreatePost
    // HelloWorld,
  },
  data: () => ({

  }),
  computed: {
            ...mapState(['userProfile', 'currentUser'])
        },
  created(){

  }
};
</script>
<style  scoped>
.profile__image {
  border-radius: 50%;
}
.profile__link {
  text-decoration: none;
}
.profile__icon {
  margin-right: 3%;
}

</style>