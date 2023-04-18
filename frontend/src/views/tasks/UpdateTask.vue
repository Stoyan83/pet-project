<template>
  <div>
    <form @submit.prevent="onUpdate">
      <div>
        <label for="assignee_id">Project</label>
        <select id="assignee_id" v-model="task.project_id">
          <option v-for="project in allProjects.data" :key="project.id" :value="project.id">{{ project.id }}</option>
        </select>
      </div>
      <div>
        <button type="submit">Update Task</button>
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
