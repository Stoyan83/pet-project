<template>
  <div>
    <p v-for="(error, index) in getError" :key="index" class="error-message">{{ error }}</p>
    <p :class="{ 'show': successMessage, 'hide': !successMessage }" class="success-message">{{ successMessage }}</p>
  </div>
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

  methods: {
    setNotification(type) {
      const message = type === 'error' ? this.getError : this.successMessage;
      if (message) {
        setTimeout(() => {
          if (type === 'error') {
            this.$store.commit('setError', null);
          } else {
            this.$store.commit('setSuccessMessage', null);
          }
        }, 3000);
      }
    },
  },

  watch: {
    getError() {
      this.setNotification('error');
    },
    successMessage() {
      this.setNotification('success');
    },
  },
};
</script>
