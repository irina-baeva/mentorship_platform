<template>
  <v-app>
    <v-content>
      <!-- <HelloWorld/> -->
      <Header />
      <!-- <User/> -->
      <main>
        <router-view></router-view>
      </main>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header
    // HelloWorld,
  },
  data: () => ({
    //
  })
};
</script>
