<template>
  <header>
    <nav>
      <ul class="navbar">
        <li class="navbar-item"><router-link class="navbar-link" to="/">Home</router-link></li>
        <li v-if="!isLoggedIn" class="navbar-item"><router-link class="navbar-link" to="/users/sign_in">Login</router-link></li>
        <li v-if="!isLoggedIn" class="navbar-item"><router-link class="navbar-link" to="/users/sign_up">Sign up</router-link></li>
        <li v-if="isLoggedIn" class="navbar-item"><router-link class="navbar-link" to="/api/v1/teams">Team</router-link></li>
        <li v-if="isLoggedIn" class="navbar-item"><router-link class="navbar-link" @click="logoutUser" to="/">Sign out</router-link></li>
      </ul>
    </nav>
  </header>
</template>


<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    computed: {
        ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn", "allTeams"]),
    },

    methods: {
        ...mapActions(["logoutUser"]),

        resetData() {
            this.signUpEmail = "";
            this.signUpPassword = "";
            this.loginEmail = "";
            this.loginPassword = "";
        },
    },
  }
</script>

<style scoped>
  header {
    background-color: #1c1e21;
    top: 0;
    left: 0;
    right: 0;
    height: 48px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 0 #1c1e21;
  }

  .navbar {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .navbar-item {
    margin-right: 12px;
  }

  .navbar-link {
    display: inline-block;
    padding: 12px 8px;
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    border-radius: 3px;
    transition: background-color 0.2s ease-in-out;
  }

  .navbar-link:hover,
  .navbar-link-active {
    background-color: #2c2e32;
  }

  .navbar-link-active {
    font-weight: bold;
  }

  @media only screen and (max-width: 768px) {
    header {
      height: auto;
      flex-direction: column;
      justify-content: center;
    }

    .navbar {
      flex-direction: column;
    }

    .navbar-item {
      margin: 8px 0;
    }

    .navbar-link {
      padding: 8px 0;
      text-align: center;
      width: 100%;
      border-bottom: 1px solid #1c1e21;
    }

    .navbar-link:last-child {
      border-bottom: none;
    }
  }
</style>
