<template>
  <header>
    <nav>
      <ul v-if="!isLoggedIn">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/users/sign_in">Login</router-link></li>
        <li><router-link to="/users/sign_up">Sign up</router-link></li>

      </ul>
      <ul v-else>
        <li><router-link to="/">Home</router-link></li>
        <li ><router-link  @click="logoutUser" to="/">Sign out</router-link></li>
        <li><router-link to="/api/v1/teams">Team</router-link></li>
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
body {
  height: 100%;
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button,
input[type="submit"] {
  margin-top: 20px;
}


main {
  color: white;
}

header {
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 25px 0 black;
}

header * {
  display: inline;
}

header li {
  margin: 20px;
}

header li a {
  color: black;
  text-decoration: none;
  min-width: 100px; /* set a minimum width for the text */
  text-align: center; /* center the text horizontally */
}

@media only screen and (max-width: 768px) {
  body {
    height: 125vh;
    background-size: cover;
    margin-top: 80px;
    padding: 30px;
  }

  header {
    height: auto;
    flex-direction: column;
    justify-content: center;
  }

  header ul {
    margin: 0;
    padding: 0;
  }

  header li {
    margin: 10px 0;
  }

  header li a {
    min-width: 0; /* reset the minimum width for small screens */
  }

  header li:first-child {
    margin-top: 0;
  }

  header li:last-child {
    margin-bottom: 0;
  }
}
</style>
