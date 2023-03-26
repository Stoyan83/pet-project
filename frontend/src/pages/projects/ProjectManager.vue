<template>
  <div v-if="isLoggedIn">
    <div v-if="allProjects.data">
      <h3>Total Projects: {{ allProjects.meta.total }}</h3> 
      <div class="projects">
      <div  v-for="data in allProjects.data" :key="data.id">
          <div @click="this.isClicked ? onSecondCLick(data.id) : onClick(data.id)" class="project-type">
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
  <router-view v-if="isClicked" :key="$route.fullPath"></router-view>
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
  data() {
      return {
        isClicked: false,
      };
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
      router.push(this.$route.path + '/' + id)
      this.isClicked = true
    },

    onSecondCLick(id) {
      router.push(this.$route.path.split("/").shift() + id);
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