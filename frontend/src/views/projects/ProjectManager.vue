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
  <!-- <side-bar v-if="isLoggedIn"></side-bar> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import SideBar from '@/components/layouts/SideBar.vue'
import router from '@/router';

export default {
  components: {
    // SideBar,
  },
  name: "ProjectManager",

  methods: {
    ...mapActions([
      'fetchProjects',
      'deleteProject',
      'updateProject',
      'fetchTeams',
      'fetchProject'
    ]),

    onClick(id) {
      router.push(`/api/v1/projects/${id}`)
    },

  },

  computed: {
    ...mapGetters([
      'allProjects',
      'isLoggedIn',
    ]),
  },

  mounted() {
    this.fetchProjects();
    this.fetchTeams();

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
