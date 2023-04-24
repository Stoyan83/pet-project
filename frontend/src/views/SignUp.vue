<template>
  <home-page v-if="isLoggedIn"></home-page>
  <div class="container" v-else>
    <div class="login-form">
      <h3>Sign up!</h3>
      <form @submit.prevent="onSignUp">
        <div class="form-group">
          <input type="email" id="email" v-model="signUpEmail" placeholder="Email" autocomplete="username" required />
        </div>
        <div class="form-group">
          <input type="password" id="password1" v-model="signUpPassword" placeholder="Password" autocomplete="new-password" required />
        </div>
        <div class="form-group">
          <input type="password" id="confirm-password" v-model="signUpConfirmPassword" placeholder="Confirm Password" autocomplete="new-password" required />
        </div>
        <div class="form-group">
          <label for="avatar">Avatar</label>
          <input type="file" id="avatar" ref="avatarInput" @change="onAvatarSelected" accept="image/*">
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/users/sign_in">Log in</a></p>
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
      avatar: null,
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

    onAvatarSelected(event) {
      this.avatar = event.target.files[0];
    },

    onSignUp() {
      if (!this.signUpEmail || !this.signUpPassword || !this.signUpConfirmPassword) {
        this.$store.commit("setError", "Please fill in all fields");
        return;
      }

      if (this.signUpPassword !== this.signUpConfirmPassword) {
        this.$store.commit("setError", "Passwords do not match");
        return;
      }

      let formData = new FormData();
      formData.append('user[email]', this.signUpEmail);
      formData.append('user[password]', this.signUpPassword);
      formData.append('user[password_confirmation]', this.signUpConfirmPassword);
      formData.append('user[avatar]', this.avatar);

      this.registerUser(formData);
      this.resetData();
    },

    resetData() {
      this.signUpEmail = "";
      this.signUpPassword = "";
      this.loginEmail = "";
      this.loginPassword = "";
      this.signUpConfirmPassword = "";
      this.avatar = null;
      if (this.$refs.avatarInput) {
        this.$refs.avatarInput.value = '';
      }
    },
  },
}
</script>
