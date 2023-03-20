<template>
  <div v-if="isLoggedIn">
    <h3>Projects</h3>
    <div class="projects">
      <div  v-for="data in allProjects" :key="data.id">
        <div v-for="project in data" :key="project.id">
          <div class="project">
            {{ project.id }}
              <i @click="deleteProject(5)" class="fas fa-trash-alt"></i>
          </div>
        </div>
      </div>
    </div>
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
      "getAuthToken",
      'allProjects',
      "isLoggedIn",
    ])
  },
  mounted() {
    this.fetchProjects();
  }
}
</script>

<style scoped>
.projects {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}

.project {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}

</style>