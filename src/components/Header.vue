<template>
  <v-app-bar app dark>
    <v-toolbar-title class="headline text-uppercase">
      <router-link to="/" tag="span" style="cursor: pointer">
        <span>U</span>
        <span class="font-weight-light">Mentor</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <!-- here is the main menu btns -->
      <v-btn flat v-for="item in menuItems" :key="item.title" router :to="item.link">
        <v-icon left>{{ item.icon }}</v-icon>
        {{item.title}}
      </v-btn>
      <!-- <v-btn icon>
        <v-icon>mail</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>people</v-icon>
      </v-btn>-->
      <v-btn to="/profile">
        <v-avatar size="36px">
          <img alt="Avatar" src="../../public/img/user.png" />
        </v-avatar>John Smith
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: "Header",
  components: {
    // User,
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "mdi-face", title: "Sign Up", link: "/signup" },
        { icon: "mdi-lock", title: "Sign in", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: "group", title: "Community", link: "/connect" },
          { icon: "mdi-mail", title: "Inbox", link: "/inbox" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  }
};
</script>