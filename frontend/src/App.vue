<template>
  <div v-if="getError" class="error-message">{{ getError }}</div>
  <p :class="{ 'show': successMessage, 'hide': !successMessage }" class="success-message">{{ successMessage }}</p>
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
      ['successMessage'],
      'getError'
    ]),
  },

  watch: {
    getError: function() {
      if (this.getError) {
        setTimeout(() => {
          this.$store.commit('setError', null);
        }, 3000);
      }
    }
  },
};
</script>
