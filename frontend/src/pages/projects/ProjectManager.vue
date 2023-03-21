<template>
  <div v-if="isLoggedIn">
    <h3>Projects</h3>
    <div >
      <div  v-for="data in allProjects" :key="data.id">
        <div class="projects">
        <div v-for="project in data" :key="project">
          <div @click="onClick(project.id)" class="project-type">
            {{ project.project_type }}
              <!-- <i @click="deleteProject(project.id)" class="fas fa-trash-alt"></i> -->
          </div>
          <div  class="project-description">
            {{ project.description }}
            <i @click="deleteProject(project.id)" class="fas fa-trash-alt"></i>
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
  name: "ProjectManager",
  methods: {
    ...mapActions([
      'fetchProjects',
      'deleteProject',
      'updateProject'
    ]),

    onClick(id) {
      router.push(this.$route.path + '/' + id)
    }
  },

  computed: {
    ...mapGetters([
      'allProjects',
      "isLoggedIn",
    ]),
  },
 
  mounted() {
    this.fetchProjects();
  }
}
</script>

<style>

</style>