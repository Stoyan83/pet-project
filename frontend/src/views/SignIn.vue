<template>
  <home-page v-if="isLoggedIn"></home-page>
  <div v-else>
    <div class="login-form">
      <h3>Login</h3>
      <form @submit="onLogin">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="loginEmail" required />
        <label for="password">Password</label>
        <input type="password" id="password" v-model="loginPassword" required />
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account? <a href="/users/sign_up">Sign Up</a></p>
    </div>
        <div v-if="!isLoggedIn" class="container">
      <h3>Login With:</h3>
      <div class="button-container">
        <div v-for="user of getUsers.user" :key="user">
          <button @click="adminLogin(user)">{{ user.email }}</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import "@/store/index.js";
  import { mapActions, mapGetters } from "vuex";
  import HomePage from './HomePage.vue';


  export default {
    components: {
      HomePage,
    },

    computed: {
      ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn", "getError", "getUsers"]),

      currentRouteName() {
        return this.$router.history.current.path
      }

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

        this.loginUser(data);
        this.resetData();
      },

      adminLogin(user){
        let data = {
          user: {
            email: user.email,
            password: process.env.VUE_APP_USER_PASSWORD
          },
        };

        this.loginUser(data);
      },
      resetData() {
        this.signUpEmail = "";
        this.signUpPassword = "";
        this.loginEmail = "";
        this.loginPassword = "";
      },
    },

    mounted() {
    this.fetchUsers();
  },
  }
</script>


<style>

</style>
