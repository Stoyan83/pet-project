<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="current-password">Current Password</label>
        <input type="password" v-model="currentPassword" name="current-password" autocomplete="off">
      </div>
      <div>
        <label for="new-password">New Password</label>
        <input type="password" v-model="newPassword" name="new-password" autocomplete="off">
      </div>
      <div>
        <label for="password-confirmation">Password Confirmation</label>
        <input type="password" v-model="passwordConfirmation" name="password-confirmation" autocomplete="off">
      </div>
      <button type="submit">Change Password</button>
    </form>
  </div>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: "ChangePassword",
    data() {
      return {
        currentPassword: "",
        newPassword: "",
        passwordConfirmation: "",
      };
    },
    methods: {
      ...mapActions(["changePassword"]),
      handleSubmit() {
        if (this.newPassword !== this.passwordConfirmation) {
          this.$store.commit("setError", "Passwords do not match");
          return;
        }
        const passwordParams = {
          current_password: this.currentPassword,
          password: this.newPassword,
          password_confirmation: this.passwordConfirmation,
        };
        this.changePassword(passwordParams);
        this.resetForms()
      },

      resetForms() {
        this.currentPassword = "";
        this.newPassword = "";
        this.passwordConfirmation = "";
      },
    },
  };
</script>
