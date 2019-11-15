import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'vue-material-design-icons/styles.css'
import AlertCmp from './components/Shared/Alert.vue'


Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCLTNx5w1k5hb_wLXqw1IgFHl4Gl5Pgg-g",
      authDomain: "mentorship-app-a4c85.firebaseapp.com",
      databaseURL: "https://mentorship-app-a4c85.firebaseio.com",
      projectId: "mentorship-app-a4c85",
      storageBucket: "mentorship-app-a4c85.appspot.com",
      messagingSenderId: "556324645717",
      appId: "1:556324645717:web:94788494ed21c42c171ddc"
    })
  }
}).$mount('#app')
