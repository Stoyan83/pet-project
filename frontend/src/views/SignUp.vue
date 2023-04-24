<template>
  <home-page v-if="isLoggedIn"></home-page>
  <div class="container" v-else>
      <h1 class="sm-title"></h1>
      <div class="sm-card">
        <div class="container" >
            <h3>Sign Up!</h3>
              <form @submit="onSignUp" class="sign-up-form">
                <label for="">
                  <input
                    class="sign-up-form-email"
                    type="email"
                    v-model="signUpEmail"
                    placeholder="Email"
                    required/>
                </label>
                <label for="">
                  <input
                    type="password"
                    class="sign-up-form-password"
                    v-model="signUpPassword"
                    placeholder="Password"
                    autocomplete="on"
                    required
                  />
                </label>
                <label for="">
                  <input
                    type="password"
                    class="sign-up-form-password"
                    v-model="signUpConfirmPassword"
                    placeholder="Confirm password"
                    autocomplete="on"
                    required
                  />
                </label>
                  <input type="submit" value="Sign up" class="sign-up-form-submit" />
              </form>
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
