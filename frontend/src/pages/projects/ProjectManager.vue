<template>
  <div v-if="isLoggedIn">
    <div v-if="allProjects">
      <h3>Total Projects: {{ allProjects.meta.total }}</h3> 
      <div class="projects">
      <div  v-for="data in allProjects.data" :key="data.id">
          <div @click="onClick(data.id)" class="project-type">
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
      'updateProject'
    ]),

    onClick(id) {
      router.push(this.$route.path + '/' + id)
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
  }
}
</script>

<style>

</style>