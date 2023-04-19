<template>
  <the-header></the-header>
  <router-view></router-view>
  <side-bar v-if="isLoggedIn"></side-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import TheHeader from './components/layouts/TheHeader.vue'
import SideBar from '@/components/layouts/SideBar.vue'

export default {
  name: "App",
  components: {
    TheHeader,
    SideBar,
  },

  computed: {
    ...mapGetters([
      'isLoggedIn',
    ]),
  },
};
</script>

<style>

</style>
