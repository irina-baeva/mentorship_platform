import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
const fb = require('../firebaseConfig.js')
Vue.use(Vuex)
// fb.auth.onAuthStateChanged(user => {

//   fb.usersCollection.doc(user.uid).onSnapshot(doc => {
//     this.$store.commit('setUserProfile', doc.data())
// })
// })
export default new Vuex.Store({
  state: {
    upcommingSessions: [{
        color: "#fff",
        imageUrl: "https://picsum.photos/200",
        firstNameMentee: "Mike ",
        lastNameMentee: 'Johns',
        date: "11th July",
        id: "jkakjn",
        location: "Barn Cafe"
      },
      {
        color: "#fff",
        imageUrl: "https://picsum.photos/id/237/200/300",
        firstNameMentee: "Gina ",
        lastNameMentee: 'Leins',
        date: "12th July",
        id: "hkjh",
        location: "Factory"

      },
      {
        color: "#fff",
        imageUrl: "https://picsum.photos/id/7/200/300",
        firstNameMentee: "John ",
        lastNameMentee: 'Snow',
        date: "13th July",
        id: "jlnk",
        location: "Factory"

      },
    ],
    currentUser: null,
    userProfile: {},
    loading: false,
    authError: null,
    error: false,
    // name: "",
  },
  mutations: {
    setLoadedInvitations(state, payload) {
      state.upcommingSessions = payload
    },
    createInvitation(state, payload) {
      state.upcommingSessions.push(payload)
    },
    setCurrentUser(state, val) {
      state.currentUser = val
      console.log(state.currentUser)

    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setLoading(state, payload) {
      //payload is true of false (loading or not loading)
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    autoSignIn({
      commit
    }, payload) {
      commit('setCurrentUser', {
        id: payload,
        registeredMeetups: []
      })
    },
    fetchUserProfile({
      commit,
      state
    }) {
      fb.usersCollection.doc(state.currentUser.id.uid).get().then(res => {
        console.log(state.currentUser.id.uid)
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
    },
    loadInvitations({
      commit
    }) {
      firebase.database().ref('invitations').once('value')
        .then((data) => {
          const invitations = []
          const obj = data.val()
          for (let key in obj) {
            invitations.push({
              id: key,
              location: obj[key].location,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
            })
          }
          commit('setLoadedInvitations', invitations)

        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)

        })
    },
    createInvitation({
      commit
    }, payload) {
      const invitation = {
        firstNameMentee: payload.firstNameMentee,
        lastNameMentee: payload.lastNameMentee,
        imageUrl: payload.imageUrl,
        description: payload.description,
        location: payload.location,
        date: payload.date,
        id: 'hakjhdnka'
      }
      //reach out to firebase and store it then we have id and refresh it
      fb.database().ref('invitations').push(invitation)
        .then((data) => {
          const key = data.key
          console.log(data);
          commit('createInvitation', {
            ...invitation,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })

    },
    //payload here is object with email and passport and i want to use firebase here 
    signUserUp({
      commit
    }, payload) {
      commit('setLoading', true)
      commit('clearError')
      //use auth method, and then creaate method is a method which behind the scene reach out firebase service send our data there, validate it on the service, create new user if it is ok or error
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        //promise if succesul
        .then(
          user => {
            commit('setLoading', false)
            // console.log(firebase.auth().currentUser)
            //here we get new regitarated user from firebase who is definately  has no meetups so we create new user 

            const newUser = {
              id: user.user.uid,
              registeredSessions: []
            }
            commit('setUser', newUser)
            console.log(newUser)



          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },

    logout({
      commit
    }) {
      firebase.auth().signOut()
      commit('setCurrentUser', null)
    },

    clearError({
      commit
    }) {
      commit('clearError')
    },
    updateProfile({
      commit,
      state
    }, data) {
      console.log(data)
      let name = data.name
      let university = data.university
      let linkedin = data.linkedin
      let github = data.github
      let imageUrl = data.imageUrl
      let about = data.about;
      // let key = data.key;
      console.log(state.currentUser.uid)
      // let key;
      fb.usersCollection.doc(state.currentUser.id.uid).update({
        name,
        university,
        linkedin,
        github,
        imageUrl,
        about
      }).then(user => {
        console.log(user)
        console.log(commit)

        // update all comments by user to reflect new name

      })
    //JUST TRYING
   
      // .then(key => {
      //   const filename = data.image.name
      //   const ext = filename.slice(filename.lastIndexOf('.'))
      //   return firebase.storage().ref('users_avatars/' + key + '.' +ext).put(data.image)
      // })
      // .then(fileData => {
      //   imageUrl = fileData.getMetadata.downloadURLs[0]
      //   return firebase.database().ref('users_avatars').child(key).update({imageUrl: imageUrl})
      // })
      // .then (()=>{
      //   commit('setUserProfile', {
      //     imageUrl: imageUrl,
      //     id: key
      //   } )
      // })
      //////
      .catch(err => {
        console.log(err)
      })
    },
  },
  getters: {
    upcommingSessions(state) {
      return state.upcommingSessions.sort((sessionA, sessionB) => {
        return sessionA.date > sessionB.date
      })
    },
    featuredSessions(state, getters) {
      return getters.upcommingSessions.slice(0, 3)
    },
    upcommingSession(state) {
      return (sessionId) => {
        return state.upcommingSessions.find((session) => {
          return session.id === sessionId
        })
      }
    },
    user(state) {
      //return user here from vuex store 
      return state.currentUser
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
});