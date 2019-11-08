import Vue from 'vue'
import Vuex from 'vuex'

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
  },
  mutations: {
    createInvitation(state, payload){
      state.upcommingSessions.push(payload)
    }
  },
  actions: {
    createInvitation({commit}, payload){
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
  }
});