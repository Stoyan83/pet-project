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
  <div  v-else class="advertising-page">
    <div class="advertising-header">
      <h1>Streamline Your Workflow with Kanban</h1>
      <p>Kanban is a simple and powerful project management tool that can help you and your team stay organized and productive. With customizable boards and intuitive drag-and-drop functionality, you can easily visualize your workflow and track progress in real-time.</p>
      <button class="advertising-btn">Get Started</button>
    </div>
    <div class="advertising-features">
      <div class="feature-card">
        <h3>Customizable Boards</h3>
        <p>Create custom boards that match your workflow, and easily move tasks between columns with drag-and-drop functionality.</p>
      </div>
      <div class="feature-card">
        <h3>Task Management</h3>
        <p>Create tasks and assign them to team members, set due dates, and track progress in real-time.</p>
      </div>
      <div class="feature-card">
        <h3>Collaboration</h3>
        <p>Invite team members to collaborate on boards and tasks, and easily communicate through comments and notifications.</p>
      </div>
      <div class="feature-card">
        <h3>Analytics</h3>
        <p>Track progress and measure performance with analytics and reporting tools.</p>
      </div>
    </div>
    <div class="advertising-cta">
      <h2>Ready to Get Started?</h2>
      <button class="advertising-btn">Sign Up Now</button>
    </div>
  </div>
</template>

<script>
// import SignIn from '@/views/SignIn.vue'
import { mapActions, mapGetters } from "vuex";
export default {
    components: {
    // SignIn,
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


<style>

/* Global styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* Advertising Page */
.advertising-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f7f7f7;
  text-align: center;
}

/* Advertising Header */
.advertising-header {
  margin-bottom: 4rem;
}

.advertising-header h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.advertising-header p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.advertising-header button {
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 3px;
  background-color: #2b3b49;;
  color: #fff;
  transition: all 0.2s ease-in-out;
}

.advertising-header button:hover {
  background-color: #0056b3;
  cursor: pointer;
}

/* Advertising Features */
.advertising-features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 4rem;
}

.advertising-features h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
}

.feature-card:hover {
  border-color: #007bff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.feature-card i {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #007bff;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 1rem;
  margin-bottom: 2rem;
}

/* Advertising CTA */
.advertising-cta {
  margin-bottom: 4rem;
}

.advertising-cta h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.advertising-cta button {
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 3px;
  background-color: #2b3b49;;
  color: #fff;
  transition: all 0.2s ease-in-out;
}

.advertising-cta button:hover {
  background-color: #0056b3;
  cursor: pointer;
}

</style>
