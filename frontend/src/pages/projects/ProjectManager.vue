<template>
  <div>
    <h3>Projects</h3>
    <div v-if="isLoggedIn" class="projects">
      <div v-for="project in allProjects" :key="project.id">
        {{ project }}
        <i @click="deleteProject(project.id)" class="fas fa-trash-alt"></i>
      </div>
    </div>
  </div>
  <div f-else>
    
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "ProjectManager",
  methods: {
    ...mapActions([
      'fetchProjects',
      'deleteProject',
      'updateProject'
    ]),
    onDoubleClick(currentProject) {
      const updatedProject = {
        id: currentProject.id,
        type: currentProject.project_type,
        description: !currentProject.description
      }
      this.updateProject(updatedProject);
    }
  },
  
  computed: {
    ...mapGetters([
      'allProjects',
      "isLoggedIn",
    ])
  },
  created() {
    this.fetchProjects();
  }
}
</script>