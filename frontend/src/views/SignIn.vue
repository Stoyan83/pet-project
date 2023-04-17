<template>
  <base-modal v-show="isModalVisible" @close="closeModal">
    <!-- <template v-slot:header>

  </template> -->

    <template v-slot:body>
      <p>{{ message }}</p>
      <p>{{ getError }}</p>
    </template>

    <!--
  <template v-slot:footer>

  </template> -->
  </base-modal>

  <div class="container">
    <h1 class="sm-title"></h1>
    <div class="sm-card">
      <div v-if="isLoggedIn">
        You're already logged in
        <button @click="logoutUser" class="logout-button">Logout</button>
      </div>
      <div v-else>
        <h3>Login!</h3>
        <form @submit="onLogin" class="login-form">
          <label for="">
            <input class="login-form-email" type="text" v-model="loginEmail" placeholder="Email" />
          </label>
          <label for="">
            <input class="login-form-password" type="password" v-model="loginPassword" placeholder="Password"
              autocomplete="on" />
          </label>
          <input type="submit" value="Login" class="login-form-submit" />

        </form>
      </div>
    </div>
  </div>
  <h3>Login With:</h3>
  <div v-for="user of getUsers.user" :key="user">
    <button @click="adminLogin(user)">{{ user.email }}</button>
  </div>
</template>

<script>
import "@/store/index.js";
import { mapActions, mapGetters } from "vuex";
import BaseModal from '@/components/ui/BaseModal.vue'
export default {
  computed: {
    ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn", "getError", "getUsers"]),

    currentRouteName() {
      return this.$router.history.current.path
    }

  },

  components: {
    BaseModal,
  },


  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      message: "",
      isModalVisible: false,
    };
  },

  methods: {
    ...mapActions(["loginUser", "logoutUser", "fetchUsers"]),


    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },

    onLogin(event) {
      event.preventDefault();

      if (this.loginEmail == "" || this.loginPassword == "") {
        this.message = ""
      }

      let data = {
        user: {
          email: this.loginEmail,
          password: this.loginPassword,
        },
      };
      this.showModal();
      this.loginUser(data);
      this.resetData();
    },

    adminLogin(user) {
      let data = {
        user: {
          email: user.email,
          password: process.env.VUE_APP_USER_PASSWORD
        },
      };

      this.loginUser(data)
    },
    resetData() {
      this.signUpEmail = "";
      this.signUpPassword = "";
      this.loginEmail = "";
      this.loginPassword = "";
      this.message = "";
      this.getError = "";
    },
  },

  mounted() {
    this.fetchUsers();
  },
}
</script>
