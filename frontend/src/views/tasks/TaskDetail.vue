<template>
  <div class="task-card" v-if="getTask.data ">
    <div class="task-card-header">
      <h3>Task Details</h3>
    </div>
    <div class="task-card-body">
      <p>{{ getTask.data.description }}</p>
      <p>Reporter: {{ getTask.data.user_id }}</p>
      <p>Assignee: {{ getTask.data.assignee_id }}</p>
    </div>
  </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: "TaskDetail",
    props: {
      taskId: {
        type: Number,
        default: null
      }
    },
    methods: {
      ...mapActions([
        'fetchTask',
      ]),
    },
    computed: {
      ...mapGetters([
        'getTask',
      ]),
    },

    watch: {
    taskId(newTaskId) {
      this.fetchTask(newTaskId);
    }
  },
  }
</script>


<style>
.task-card {
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.task-card-header {
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
  padding: 0.5rem 1rem;
  text-align: center;
  width: 100%;
}

.task-card-header h3 {
  margin: 0;
}

.task-card-body {
  margin-top: 1rem;
  text-align: center;
}

.task-card-body p {
  margin: 0.5rem 0;
}
</style>
