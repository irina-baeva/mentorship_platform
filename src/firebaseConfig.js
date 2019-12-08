import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
var firebaseConfig = {
    apiKey: "AIzaSyCLTNx5w1k5hb_wLXqw1IgFHl4Gl5Pgg-g",
    authDomain: "mentorship-app-a4c85.firebaseapp.com",
    databaseURL: "https://mentorship-app-a4c85.firebaseio.com",
    projectId: "mentorship-app-a4c85",
    storageBucket: "mentorship-app-a4c85.appspot.com",
    messagingSenderId: "556324645717",
    appId: "1:556324645717:web:94788494ed21c42c171ddc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}