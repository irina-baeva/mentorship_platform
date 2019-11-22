 <template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md5>
        <v-content>
          <v-card class="v-card-profile">
            <v-avatar rounded class="mx-auto d-block" size="130">
              <v-img src="../../../public/img/user.png"></v-img>
            </v-avatar>
            <v-card-text class="text-xs-center">
              <h6 class="category text-gray font-weight-thin mb-3">SE Student</h6>
              <h4 class="card-title font-weight-light">Code Unvirersity</h4>
              <h4 class="card-title font-weight-light user_name">Name </h4>
              <h4 class="card-title font-weight-ligh user_surname"> Surname</h4>
              <h4 class="card-title font-weight-ligh user_email"> {{email}}</h4>

              <p
                class="card-description font-weight-light"
              >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum porro illo accusantium debitis nemo provident eaque explicabo id, eligendi cumque ab vitae, numquam fugit. Cupiditate eaque amet dolore suscipit sequi?</p>
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
          <!-- <User/> -->
        </v-content>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UpcommingSessions from "../../components/UpcommingSessions";
import * as firebase from 'firebase'

export default {
  name: "App",
  components: {
    UpcommingSessions
    // HelloWorld,
  },
  data: () => ({
      name: null,
      email: null,
  }),
  created(){
    let user = firebase.auth().currentUser;
    this.email = user.email;
  }
};
</script>