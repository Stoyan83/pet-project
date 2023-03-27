<template>
  <div v-if="isLoggedIn">
    <div v-if="allProjects.data">
      <h3>Total Projects: {{ allProjects.meta.total }}</h3> 
      <div class="projects">
      <div  v-for="data in allProjects.data" :key="data">
          <div @click=" onClick(data.id)" class="project-type">
            {{ data.project_type }} 
          </div>
          <div class="project-description">
            {{ data.description }}
            <i @click="deleteProject(data.id)" class="fas fa-trash-alt"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view :key="$route.fullPath"></router-view>
  <side-bar v-if="isLoggedIn"></side-bar>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SideBar from '@/components/layouts/SideBar.vue'
import router from '@/router';

export default {
  components: {
    SideBar,
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

</style>