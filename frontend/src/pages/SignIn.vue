<template>
  <div class="container">
      <h1 class="sm-title"></h1>
      <div class="sm-card">
          <div v-if="isLoggedIn">
            You're already logged in 
              <button @click="logoutUser" class="logout-button" >Logout</button>
          </div>
          <div v-else>
              <h3>Login!</h3>
              <form @submit="onLogin" class="login-form">
                  <input class="login-form-email" type="text" v-model="loginEmail" placeholder="Email" />
                  <br />
                  <input class="login-form-password" type="password" v-model="loginPassword" placeholder="Password" />
                  <br />
                  <input type="submit" value="Login" class="login-form-submit" />
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import "@/store/index.js";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SessionManager",
  computed: {
      ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn"]),
  },
  
  data() {
      return {
      signUpEmail: "",
      signUpPassword: "",
      loginEmail: "",
      loginPassword: "",
      };
  },

  methods: {
      ...mapActions(["registerUser", "loginUser", "logoutUser"]),

      onLogin(event) {
          event.preventDefault();
          let data = {
              user: {
                  email: this.loginEmail,
                  password: this.loginPassword,
              },
          };
          this.loginUser(data);
          this.resetData();
          this.$router.push('/');
      },

      resetData() {
          this.signUpEmail = "";
          this.signUpPassword = "";
          this.loginEmail = "";
          this.loginPassword = "";
      },
  },
}
</script>
