<template>
  <div class="navbar-container">
    <header>
      <nav>
        <div class="navbar-left">
          <ul>
            <li><router-link class="navbar-link" to="/">Home</router-link></li>
            <li v-if="isLoggedIn"><router-link class="navbar-link" to="/api/v1/teams">Team</router-link></li>
          </ul>
        </div>
        <div class="navbar-right">
          <ul>
            <li v-if="!isLoggedIn"><router-link @click="showModal" class="navbar-link" to="/users/sign_in">Login</router-link></li>
            <li v-if="isLoggedIn" class="profile-dropdown">
              <a href="#">
                <img class="profile-avatar" src="https://community.intersystems.com/sites/default/files/pictures/picture-default.jpg" alt="Profile Avatar">
                Profile
              </a>
              <div class="dropdown-content">
                <a href="#">Settings</a>
                <a href="#" @click="logoutUser" to="/">Sign out</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>

  <div>
      <base-modal v-show="isModalVisible" @close="closeModal">
        <template v-slot:header>
          Login
        </template>

        <template v-slot:body>
          <sign-in></sign-in>
        </template>

        <template v-slot:footer>
          Please fill out all required fields
        </template>
      </base-modal>
    </div>
</template>


<script>
  import { mapActions, mapGetters } from "vuex";
  import BaseModal from '@/components/ui/BaseModal.vue'
  import SignIn from '@/views/SignIn.vue'

  export default {
    components: {
      BaseModal,
      SignIn,
    },

  data() {
      return {
        isModalVisible: false,
      };
    },

    computed: {
        ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn", "allTeams"]),
    },

    watch: {
      isLoggedIn(newValue) {
        if (newValue === true) {
          this.closeModal();
        }
      },
    },

    methods: {
        ...mapActions(["logoutUser"]),

      showModal() {
        this.isModalVisible = true;
      },

      closeModal() {
        this.isModalVisible = false;
      },

    },
  }
</script>

<style scoped>
  .navbar-container {
    padding: 0;
    margin: 0 auto;
  }

  nav {
    background-color: #1c1e21;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-left ul, .navbar-right ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .navbar-left li {
    margin-right: 10px;
  }

  .navbar-left li:last-child {
    margin-right: 0;
  }

  .navbar-right li {
    margin-left: 10px;
  }

  .navbar-right li:first-child {
    margin-left: 0;
  }

  .navbar-link {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }

  .navbar-link:hover {
    text-decoration: underline;
  }

  .profile-dropdown {
    position: relative;
  }

  .profile-dropdown > a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    margin-left: 10px;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #1c1e21;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content a {
    color: #fff;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {
    background-color: #f1f1f1;
    color: #1c1e21;
  }

  .profile-dropdown:hover .dropdown-content {
    display: block;
  }

  .profile-avatar {
  width: 36px;
  height: 36px;
  margin-right: 10px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-dropdown > a {
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  margin-left: 10px;
}

</style>
