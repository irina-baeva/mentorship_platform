 <template>
 <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md4
      >
   <material-card class="v-card-profile">
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="130"
          >
            <img
              src="../../../public/img/user.jpg"
            >
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">SE Student</h6>
            <h6 class="category text-gray font-weight-thin mb-3">Code Unvirersity</h6>
            <h4 class="card-title font-weight-light">Code Unvirersity</h4>
            <h4 class="card-title font-weight-light">Name Surname</h4>
            <p class="card-description font-weight-light">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum porro illo accusantium debitis nemo provident eaque explicabo id, eligendi cumque ab vitae, numquam fugit. Cupiditate eaque amet dolore suscipit sequi?</p>
            <v-btn
              color="success"
              round
              class="font-weight-light"
            >Follow</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    <v-flex xs12 md8></v-flex>
    </v-layout>
 </v-container>
 </template>
    