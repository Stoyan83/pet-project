<template>
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
        <template v-slot:body>
            <p>{{ message }}</p>
            <p>{{ getError }}</p>
        </template>
    </base-modal>
  <div class="container">
      <h1 class="sm-title"></h1>
      <div class="sm-card">
          <div v-if="isLoggedIn">
                You're already logged in 
              <button @click="logoutUser" class="logout-button" >Logout</button>
          </div>
          <div v-else>
              <h3>Sign Up!</h3>
                  <form @submit="onSignUp" class="sign-up-form">
                      <input class="sign-up-form-email" type="email" v-model="signUpEmail" placeholder="Email" />
                      <br />
                      <input
                          type="password"
                          class="sign-up-form-password"
                          v-model="signUpPassword"
                          placeholder="Password"
                      />
                      <br />
                      <br />
                      <input type="submit" @click="showModal" value="Sign up" class="sign-up-form-submit" />
                  </form>
          </div>
      </div>
  </div>
</template>

<script>
import "@/store/index.js";
import { mapActions, mapGetters } from "vuex";
import BaseModal from '@/components/ui/BaseModal.vue'
export default {
  computed: {
      ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn", "getError"]),
  },

  components: {
    BaseModal,
    },
  
  data() {
      return {
      signUpEmail: "",
      signUpPassword: "",
      loginEmail: "",
      loginPassword: "",
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

        let data = {
          user: {
          email: this.signUpEmail,
          password: this.signUpPassword,
          },
        };

        if (this.signUpEmail == "" || this.signUpPassword == "") {
          return this.message= "Email and Password can't be blank"
          }
 
      this.registerUser(data);
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
