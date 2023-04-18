<template>
  <div>
    <h1>Create Task</h1>
    <form @submit.prevent="submitForm">
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
