<template>
  <div class="container">
    <div v-if="getError || message">
    <div v-if="isModalVisible" class="alert danger">
      <p>{{ getError }}</p>
      <p>{{ message }}</p>
      <span type="button" class="close" 
      @click="closeModal"> X 
    </span>
    </div>
  </div>

    <h1 class="sm-title"></h1>
    <div class="sm-card">
      <div v-if="isLoggedIn">
        You're already logged in
        <button @click="logoutUser" class="logout-button">Logout</button>
      </div>
      <div v-else>
        <h3>Login!</h3>
        <form @submit="onLogin" class="login-form">
          <input class="login-form-email" type="text" v-model="loginEmail" placeholder="Email" />
          <br />
          <input class="login-form-password" type="password" v-model="loginPassword" placeholder="Password" />
          <br />
          <br />
          <input type="submit" value="Login" @click="showModal" class="login-form-submit" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import "@/store/index.js";
  import { mapActions, mapGetters } from "vuex";
  export default {
    computed: {
      ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn", "getError"]),
    },

    data() {
      return {
        loginEmail: "",
        loginPassword: "",
        message: "",
        isModalVisible: true,
      };
    },
    methods: {
      ...mapActions(["loginUser", "logoutUser"]),

     closeModal() {
       this.isModalVisible = false;
     },

     showModal() {
        this.isModalVisible = true;
       },
   

      onLogin(event) {
        event.preventDefault();

        if (this.loginEmail == "" || this.loginPassword == "") {
          this.message = "Empty Email or password"
          return
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

      resetData() {
        this.signUpEmail = "";
        this.signUpPassword = "";
        this.loginEmail = "";
        this.loginPassword = "";
      },
    },
  }
</script>
