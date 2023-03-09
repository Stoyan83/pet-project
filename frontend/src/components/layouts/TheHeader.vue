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
      </ul>
    </nav>
  </header>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    computed: {
        ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn"]),
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
    height: 125vh;
    background-image: url('https://codetheweb.blog/assets/img/posts/style-a-navigation-bar-css/background.jpg');
    background-size: cover;
    font-family: sans-serif;
    margin-top: 80px;
    padding: 30px;
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
}
</style>

