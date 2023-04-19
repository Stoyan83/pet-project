<template>
  <div class="update-task-form">
    <form @submit="onUpdate">
      <div class="form-group">
        <div class="form-select-wrapper">
          <select id="assignee_id" v-model="task.project_id" class="form-select">
            <option v-for="project in allProjects.data" :key="project.id" :value="project.id">{{ project.id }}</option>
          </select>
          <span class="form-select-icon"></span>
        </div>
      </div>
      <div class="form-group">
        <button class="form-btn" type="submit">Add To Project</button>
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

<style scoped>
.update-task-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
}

.form-group {
  margin: 1.5rem 0;
  width: 100%;
}

.form-label {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
}

.form-select-wrapper {
  position: relative;
}

.form-select {
  padding: 0.75rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  background-color: #fff;
  width: 100%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.form-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}

.form-select-icon {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  border-left: 0.25rem solid transparent;
  border-right: 0.25rem solid transparent;
  border-top: 0.375rem solid #999;
  pointer-events: none;
}

.form-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.6rem;
  color: #fff;
  background-color: #2b3b49;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.form-btn:hover {
  background-color: #0069d9;
}

.form-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}

.btn-text {
  font-size: 0.6rem;
}
</style>
