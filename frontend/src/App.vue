<template>
  <the-header></the-header>
  <router-view></router-view>
  <!-- <session-manager></session-manager> -->
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue'
export default {
  name: "App",
  components: {
    TheHeader,
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
