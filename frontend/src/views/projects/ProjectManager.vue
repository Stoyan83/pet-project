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
  <p class="success-message" :class="{ 'show': successMessage, 'hide': !successMessage }">{{ successMessage }}</p>
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
      ['successMessage'],
    ]),
  },


  mounted() {
    this.fetchProjects();
    this.fetchTeams();
    this.fetchTeamTasks();
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

.success-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  background-color: #fff;
  color: #4CAF50;
  border: 2px solid #4CAF50;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(76, 175, 80, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  width: 90%
}

.success-message.show {
  opacity: 1;
}

.success-message.hide {
  opacity: 0;
}
</style>
