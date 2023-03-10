<template>
  <base-modal
  v-show="isModalVisible"
  @close="closeModal"
>
  <!-- <template v-slot:header>
   This is new
  </template> -->

  <template v-slot:body>
    <p>{{ message }}</p>
    <p>{{ getError }}</p>
  </template>

<!-- 
  <template v-slot:footer>
    This is a new modal footer.
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
          <input class="login-form-email" type="text" v-model="loginEmail" placeholder="Email" />
          <br />
          <input class="login-form-password" type="password" v-model="loginPassword" placeholder="Password" />
          <br />
          <br />
          <input type="submit" @click="showModal" value="Login" class="login-form-submit" />
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
      ...mapActions(["loginUser", "logoutUser"]),
      
 
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
