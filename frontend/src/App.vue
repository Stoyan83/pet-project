<template>
  <the-header></the-header>
  <router-view></router-view>
  <!-- <session-manager></session-manager> -->
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue'
// import SessionManager from "./components/SessionManager.vue";
export default {
  name: "App",
  components: {
    TheHeader,
    // SessionManager,
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
  margin-top: 60px;
}
</style>
