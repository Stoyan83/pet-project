<template>
  <div>
    <h1>Create Task</h1>
    <form @submit="submitForm">
      <div>
        <label>Description:</label>
        <textarea v-model="description"></textarea>
      </div>
      <div>
        <label>Status:</label>
        <select v-model="status">
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div>
        <label>Assignee:</label>
        <select v-model="assignee_id">
          <option v-for="user in getUsers.user" :key="user.id" :value="user.id">{{ user.id }}</option>
        </select>
      </div>
      <div>
        <label>Project:</label>
        <select v-model="project_id">
          <option v-for="project in allProjects.data" :key="project.id" :value="project.id">{{ project.id }}</option>
        </select>
      </div>
      <div>
        <label>Team:</label>
        <select v-model="team_id">
          <option v-for="team in allTeams" :key="team.id" :value="team.id">{{ team.name }}</option>
        </select>
      </div>
      <button type="submit">Create Task</button>
    </form>
    <p v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<script>
 import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      description: '',
      status: '',
      assignee_id: null,
      project_id: null,
      team_id: null,
      successMessage: '',
    }
  },
  computed: {
    ...mapGetters(['allProjects', 'getUsers', 'allTeams']),
    projects() {
      return this.allProjects
    },
    users() {
      return this.getUsers
    },
    teams() {
      return this.allTeams
    },
  },

  methods: {
    ...mapActions([
      'fetchUsers',
      'fetchProjects',
      'fetchTeams',
      'setSuccessMessage',
      'addTask'
    ]),

    async submitForm() {
      const task = {
        description: this.description,
        status: this.status,
        assignee_id: this.assignee_id,
        project_id: this.project_id,
        team_id: this.team_id,
      }
      await this.addTask(task)
      this.setSuccessMessage('Task created successfully!')
      this.resetForm();
    },

    resetForm() {
      this.description = ""
      this.status = ""
      this.assignee_id = ""
      this.project_id = ""
      this.team_id = ""
    }
  },

  mounted() {
    this.fetchUsers();
    this.fetchProjects();
    this.fetchTeams();
  },
}
</script>

<style scoped>
    form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  textarea,
  select {
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  button[type="submit"] {
    background-color: #2b3b49;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  button[type="submit"]:hover {
    background-color: #0069d9;
  }

</style>
