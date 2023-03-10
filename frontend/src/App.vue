<template>
  <the-header></the-header>
  <router-view></router-view>
  <div id="app">
    <button
      type="button"
      class="btn"
      @click="showModal"
    >
      Open Modal!
    </button>
  </div>
  <base-modal
  v-show="isModalVisible"
  @close="closeModal"
>
  <template v-slot:header>
    Testing.
  </template>

  <template v-slot:body>
    This is a new modal body.
  </template>

  <template v-slot:footer>
    This is a new modal footer.
  </template>
</base-modal>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue'
import BaseModal from './components/ui/BaseModal.vue'
export default {
  name: "App",
  components: {
    TheHeader,
    BaseModal,
  },

  data() {
      return {
        isModalVisible: false,
      };
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
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
