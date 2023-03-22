<template>
  <div v-if="isLoggedIn">
    <h3>Projects</h3>
    <div v-if="allProjects">
      <div  v-for="data in allProjects" :key="data">
        <div class="projects">
        <div v-for="project of data" :key="project.id">
          <div @click="onClick(project.id)" class="project-type">
            {{ project.project_type }}
          </div>
          <div class="project-description">
            {{ project.description }}
            <i @click="deleteProject(project.id)" class="fas fa-trash-alt"></i>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  <add-project></add-project>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddProject from '@/pages/projects/AddProject.vue'
import router from '@/router';
export default {
  components: {
    AddProject,
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
    }
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