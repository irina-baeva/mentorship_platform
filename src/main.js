import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'vue-material-design-icons/styles.css'
import AlertCmp from './components/Shared/Alert.vue'
// import { currentUser } from './firebaseConfig'
const fb = require('./firebaseConfig.js')


Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)
// var db = firebase.firestore();

let app
fb.auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      vuetify,
      render: h => h(App),
      created() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.$store.dispatch('autoSignIn', user)
              fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
                let postsArray = []
                // console.log(querySnapshot)
                querySnapshot.forEach(doc => {
                  let post = doc.data()
                  post.id = doc.id
                  postsArray.push(post)
                })
      
                this.$store.commit('setPosts', postsArray)
              })

            }
          }),
          this.$store.dispatch('loadInvitations')
        fb.usersCollection.doc(user.uid).onSnapshot(doc => {
          this.$store.commit('setUserProfile', doc.data())
        })
        // realtime updates from our posts collection

      }
    })
  }
  console.log(user)
})



// new Vue({
//   router,
//   store,
//   vuetify,
//   render: h => h(App),
//   created() {
//     firebase.initializeApp({
//       apiKey: "AIzaSyCLTNx5w1k5hb_wLXqw1IgFHl4Gl5Pgg-g",
//       authDomain: "mentorship-app-a4c85.firebaseapp.com",
//       databaseURL: "https://mentorship-app-a4c85.firebaseio.com",
//       projectId: "mentorship-app-a4c85",
//       storageBucket: "mentorship-app-a4c85.appspot.com",
//       messagingSenderId: "556324645717",
//       appId: "1:556324645717:web:94788494ed21c42c171ddc"
//     })
//     firebase.auth().onAuthStateChanged((user)=> {
//       if(user) {
//         this.$store.dispatch('autoSignIn', user)
//       }
//     })
//     this.$store.dispatch('loadInvitations')

//   }
// }).$mount('#app')