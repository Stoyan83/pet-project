<template>
  <div v-if="isLoggedIn">
    <div v-if="allProjects.data">
      <h1>Projects: {{ allProjects.meta.total }}</h1>
      <div class="projects">
        <div class="projects">
          <div v-for="data in allProjects.data" :key="data" class="project-item" @click="onClick(data.id)">
            <div class="project-type">{{ data.project_type }}</div>
            <div class="project-description">{{ data.description }}</div>
            <div class="delete-icon">
              <i @click="deleteProject(data.id)" class="fas fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view :key="$route.fullPath"></router-view>
  <team-tasks></team-tasks>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import router from '@/router';
import TeamTasks from '@/views/tasks/TeamTasks.vue';


export default {
  components: {
    TeamTasks,
  },
  name: "ProjectManager",

  methods: {
    ...mapActions([
      'fetchProjects',
      'deleteProject',
      'updateProject',
      'fetchTeams',
      'fetchProject',
      'fetchTeamTasks',
    ]),

    onClick(id) {
      router.push(`/api/v1/projects/${id}`)
    },

  },

  computed: {
    ...mapGetters([
      'allProjects',
      'isLoggedIn',
      'getTeamTasks',
    ]),
  },

  mounted() {
    this.fetchProjects();
    this.fetchTeams();
    this.fetchTeamTasks()
  },
}
</script>

<style>
  h1 {
    font-family: "Roboto", sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: center;
    margin: 0;
  }
</style>
