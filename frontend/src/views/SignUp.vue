<template>
  <home-page v-if="isLoggedIn"></home-page>
  <div v-else>
      <div class="login-form">
        <h3>Sign up!</h3>
        <form @submit="onSignUp">
          <div class="form-group">
            <input type="email" id="email" v-model="signUpEmail" placeholder="Email" required />
          </div>
          <div class="form-group">
            <input type="password" id="password" v-model="signUpPassword" placeholder="Password" autocomplete="on" required />
          </div>
          <div class="form-group">
            <input type="password" id="confirm-password" v-model="signUpConfirmPassword" placeholder="Confirm Password" autocomplete="on" required />
          </div>
          <input type="submit" value="Sign up" />
        </form>
        <div class="signup-link">
          <p>Already have an account?</p>
          <a href="/users/sign_in">Log in</a>
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
      ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn", "getError"]),
  },

  data() {
      return {
      signUpEmail: "",
      signUpPassword: "",
      signUpConfirmPassword: "",
      message: "",
      isModalVisible: false,
      };
  },

  methods: {
      ...mapActions(["registerUser", "loginUser", "logoutUser"]),

      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },

      onSignUp(event) {
        event.preventDefault();

        if (!this.signUpEmail || !this.signUpPassword || !this.signUpConfirmPassword) {
            this.$store.commit("setError", "Please fill in all fields");
            return;
          }

          if (this.signUpPassword !== this.signUpConfirmPassword) {
            this.$store.commit("setError", "Passwords do not match");
            return;
          }

        let data = {
          user: {
          email: this.signUpEmail,
          password: this.signUpPassword,
          password_confirmation: this.signUpConfirmPassword,
          },
        };

      this.registerUser(data);
      this.resetData();
      },

      resetData() {
        this.signUpEmail = "";
        this.signUpPassword = "";
        this.loginEmail = "";
        this.loginPassword = "";
        this.signUpConfirmPassword = "";
      },
  },
}
</script>
