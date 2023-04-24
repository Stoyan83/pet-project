<template>
  <home-page v-if="isLoggedIn"></home-page>
  <div v-else>
      <div class="login-form">
        <h3>Login!</h3>
        <form @submit="onLogin">
          <label>
            <input type="text" v-model="loginEmail" placeholder="Email" />
          </label>
          <label>
            <input type="password" v-model="loginPassword" placeholder="Password" autocomplete="on" />
          </label>
          <input type="submit" @click="showModal" value="Login"/>
        </form>
        <div class="signup-link">
          <p>Don't have an account?</p>
          <a href="/users/sign_up">Sign up</a>
        </div>
      </div>
    </div>
  <div v-if="!isLoggedIn" class="container">
    <h3>Login With:</h3>
    <div class="button-container">
      <div v-for="user of getUsers.user" :key="user">
        <button @click="adminLogin(user)">{{ user.email }}</button>
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
