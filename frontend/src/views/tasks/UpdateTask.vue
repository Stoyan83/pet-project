<template>
  <div class="update-task-form">
    <form @submit="onUpdate">
      <div class="form-group">
        <label for="assignee_id">Project:</label>
        <select id="assignee_id" v-model="task.project_id">
          <option v-for="project in allProjects.data" :key="project.id" :value="project.id">{{ project.id }}</option>
        </select>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="submit">Update Task</button>
      </div>
    </form>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';


export default {
  props: {
    taskId: {
      type: [Number, null],
      required: true,
      default: 0,
    }
  },

  data() {
    return {
      task: {
      id: null,
      status: null,
      description: null,
      team_id: null,
      assignee_id: null,
      project_id: null,
      position: null,
      },
      message: "",
    }

  },
  methods: {
    ...mapActions(['updateTask', 'fetchTask', 'fetchProjects']),

    onUpdate() {

      if (this.task.project_id == "") {
          return
          }

        this.updateTask({
          id: this.taskId,
          project_id: this.task.project_id
        })
        this.task.project_id = "";
      }
  },

  computed: {
    ...mapGetters([
      'getTask',
      "isLoggedIn",
      'allProjects',
    ]),
  },

    watch: {
    taskId(id) {
      this.fetchTask(id);
    }
    },

  mounted() {
    this.fetchProjects();
  },
}
</script>

<style>
.update-task-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
}

.form-group {
  margin: 1rem 0;
}

label {
  font-weight: bold;
}

select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
}

button:hover {
  background-color: #0069d9;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}
</style>
