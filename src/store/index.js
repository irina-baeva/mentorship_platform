import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

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
    user: null,
    loading: false,
    authError: null,
    error: false,
    // name: "",
  },
  mutations: {
    setLoadedInvitations(state, payload){
      state.upcommingSessions = payload
    },
    createInvitation(state, payload) {
      state.upcommingSessions.push(payload)
    },
    setUser(state, payload) {
      state.user = payload
    },
    SET_USER_NAME(state, payload) {
      state.user.name = payload
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
    loadInvitations({commit}) {
      firebase.database().ref('invitations').once('value')
        .then((data) =>{
          const invitations = []
          const obj = data.val()
          for(let key in obj) {
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
      firebase.database().ref('invitations').push(invitation)
        .then ((data)=> {
          const key = data.key
          console.log(data);
          commit('createInvitation', {
            ...invitation,
            id: key})
        })
        .catch((error) => {
          console.log(error)
        }
        )

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
            // console.log(user)
            //here we get new regitarated user from firebase who is definately  has no meetups so we create new user 
            const newUser = {
              id: user.uid,
              registeredSessions: []
            }
            commit('setUser', newUser)
            // console.log(newUser)
            //trying to get name from display name
            // firebase.auth().currentUser.updateProfile({displayName: payload.name})
            // .then(() => commit('SET_USER_NAME', payload.name))
            //tryin with db
            // firebase.auth().onAuthStateChanged(function(user) {
            //   if (user) {
            //     console.log(user.displayName)
            //     console.log(newUser.name)
            //     console.log('heyyy')

                
            //     // User is signed in.
            //   } else {
            //     // No user is signed in.
            //   }
            // });
            // var db = firebase.firestore();
            // db.collection("profiles").doc(user.user.uid).set({
            //     name: this.name,
            //   })
            //   console.log(name)
            //   .then(function () {
            //     console.log("Document successfully written!");
            //   })
            //   .catch(function (error) {
            //     console.error("Error writing document: ", error);
            //   });
             
              // commit('SET_USER_NAME', payload.displayName)
              // console.log(payload.displayName)
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
    signUserIn({
      commit
    }, payload) {
      commit('setLoading', true)
      commit('clearError')
      //
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        //promise if succesul
        .then(
          user => {
            commit('setLoading', false)
            //here we get new regitarated user from firebase who is definately not has meetups so we create new user 
            const newUser = {
              id: user.uid,
              registeredSessions: []
            }
            commit('setUser', newUser)
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
    clearError({
      commit
    }) {
      commit('clearError')
    }
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
      return state.user
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
});