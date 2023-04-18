<template>
  {{ getUsers}}
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
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.email }}</option>
        </select>
      </div>
      <div>
        <label>Project:</label>
        <select v-model="project_id">
          <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
        </select>
      </div>
      <button type="submit">Create Task</button>
    </form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        description: '',
        status: '',
        assignee_id: null,
        project_id: null,
      }
    },
    computed: {
      ...mapGetters(['allProjects', 'getUsers']),
      projects() {
        return this.allProjects
      },
      users() {
        return this.getUsers
      },
    },
    methods: {
      async submitForm() {
        const task = {
          description: this.description,
          status: this.status,
          assignee_id: this.assignee_id,
          project_id: this.project_id,
        }
        await this.$store.dispatch('addTask', task)
        this.$router.push({ name: 'Tasks' })
      },
    },

  }
</script>
