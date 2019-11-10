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
    user: null
  },
  mutations: {
    createInvitation(state, payload) {
      state.upcommingSessions.push(payload)
    },
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
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
      commit('createInvitation', invitation)
    },
    //payload here is object with email and passport and i want to use firebase here 
    signUserUp({
      commit
    }, payload) {
      //use auth method, and then creaate method is a method which behind the scene reach out firebase service send our data there, validate it on the service, create new user if it is ok or error
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        //promise if succesul
        .then(
          user => {
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
            console.log(error)
          }
        )
    },
    signUserIn({
      commit
    }, payload) {
      //
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        //promise if succesul
        .then(
          user => {
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
            console.log(error)
          }
        )
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
    }
  }
});