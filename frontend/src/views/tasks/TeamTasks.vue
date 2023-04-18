<template>
  <div v-if="isLoggedIn">
    <div v-if="getTeamTasks.data">
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
import router from '@/router';

export default {

  name: "TeamTasks",
  methods: {
    ...mapActions([
      'fetchTeamTasks',
      'deleteTask',
      'fetchTeams'
    ]),
    onClick(id) {
      router.push(`/api/v1/browse/tasks/${id}`)
    },

  },

  computed: {
    ...mapGetters([
      'getTeamTasks',
      "isLoggedIn",
    ]),

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
