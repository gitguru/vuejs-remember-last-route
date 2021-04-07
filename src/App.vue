<template>
  <div id="app">
    <NavBar v-if="isLoggedIn" />
    <PubNavBar v-if="!isLoggedIn" />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import PubNavBar from "@/components/PubNavBar.vue";
export default {
  components: {
    NavBar,
    PubNavBar,    
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
