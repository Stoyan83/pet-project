<template>

  <div v-if="isLoggedIn">
    <div v-if="allProjects.data">
      <div class="header">
        <a href="#" class="back-link" @click="goBack">Back</a>
        <h1>Projects: {{ allProjects.meta.total }}</h1>
      </div>
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

    goBack() {
      this.$router.go(-1);
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
  .header {
    display: flex;
    justify-content: center; /* Modified */
    align-items: center;
    width: 100%;
    height: 3rem;
    background-color: #f0f0f0;
    padding: 0 1rem; /* Added */
  }

  h1 {
    font-family: "Roboto", sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: center;
    margin: 0;
  }

  .back-link {
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    color: #333;
    margin-right: 1.5rem;
    position: relative;
    padding-left: 1.5rem;
  }

  .back-link::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    border-top: 0.25rem solid #333;
    border-left: 0.25rem solid #333;
    transition: transform 0.2s ease-in-out;
  }

  .back-link:hover::before {
    transform: translateY(-50%) rotate(-45deg);
  }
</style>
