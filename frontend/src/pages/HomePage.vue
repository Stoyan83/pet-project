<template>
  <div  v-if="isLoggedIn" class="container">
    <h1 class="sm-title"></h1>
    <div class="sm-card">
      <div>
        <table class="table">
            <thead class="thead-dark">
            <tr class="table-headers">
              <th scope="col">ID</th>
              <th scope="col">email</th>
              <th scope="col">Token</th>
            </tr>
            </thead>
            <tbody>
              <tr class="table-rows">
                <th class="table-row">[{{ this.getUserID }}]</th>
                <td class="table-row table-row-username">{{ this.getUserEmail }}</td>
                <td class="table-row">{{ this.getAuthToken }}</td>
              </tr>
            </tbody>
        </table>
      </div>  
    </div>    
  </div>
  <sign-in v-else></sign-in>
</template>

<script>
import SignIn from '@/pages/SignIn.vue'
import { mapActions, mapGetters } from "vuex";
export default {
    components: {
    SignIn,
  },
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
