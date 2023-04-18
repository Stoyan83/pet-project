<template>
  <div v-if="isLoggedIn">
    <div v-if="getTeamTasks.data">
      <div v-if="currentTaskId" class="task-actions">
        <task-detail :task-id="currentTaskId"></task-detail>      </div>
      <h1>Tasks: </h1>
      <div class="projects">
        <div class="projects">
          <div v-for="data in getTeamTasks.data" :key="data.id" class="project-item" @click="onClick(data.id)">
            <div class="project-type task-title">{{ data.description }}</div>
            <div class="task-body">
              <p class="task-description project-description">{{ data.user.email }}</p>
            </div>
            <div class="task-body">
              <p class="task-description project-description">{{ data.assignee_id}}</p>
            </div>
            <div class="task-body">
              <p class="task-description project-description">{{ data.user.id }}</p>
            </div>
            <div class="task-footer delete-icon">
              <i class="fas fa-trash-alt" @click="deleteTask(data.id)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TaskDetail from './TaskDetail.vue';

export default {

  components: {
    TaskDetail,
  },

  data() {
      return {
        taskId: '',
        clickedTaskId: null,
      };
    },

  name: "TeamTasks",
  methods: {
    ...mapActions([
      'fetchTeamTasks',
      'deleteTask',
      'fetchTeams',
    ]),

    onClick(id) {
      this.clickedTaskId = id;
    },
  },

  computed: {
    ...mapGetters([
      'getTeamTasks',
      "isLoggedIn",
    ]),

    currentTaskId() {
        return this.clickedTaskId;
      },

    isBrowse() {
      return this.$route.name == 'browse'
    }
  },

  mounted() {
    this.fetchTeamTasks()
    this.fetchTeams()
  }
}
</script>

<style>
.task-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}


.task-actions > * {
  margin: 0 10px;
}
</style>
