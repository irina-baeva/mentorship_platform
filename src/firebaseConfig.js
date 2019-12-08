import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'

// firebase init goes here
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAdv_tkOodrxVjDsCqbOdirxTAC4hSHDrM",
    authDomain: "mentor-clone.firebaseapp.com",
    databaseURL: "https://mentor-clone.firebaseio.com",
    projectId: "mentor-clone",
    storageBucket: "gs://mentor-clone.appspot.com",
    messagingSenderId: "178180145985",
    appId: "1:178180145985:web:06756bef98cca538b4d7c0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

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
const sessionCollection = db.collection('session')
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
    likesCollection,
    sessionCollection
}