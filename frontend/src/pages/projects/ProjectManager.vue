<template>
  <div>
    <h3>Projects</h3>
    <div class="legend">
      <span>Double click to mark as complete.</span>
      <span>
        <span class="incomplete-box"></span> = Incomplete
      </span>
      <span>
        <span class="complete-box"></span> = Complete
      </span>
    </div>
    <div class="projects">
      <div v-for="project in allProjects" :key="project.id" @dblclick="onDoubleClick(project)" class="project"
        v-bind:class="{ 'is-complete': project.completed }">
        {{ project }}
        <i @click="deleteProject(project.id)" class="fas fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "ProjectsManager",
  methods: {
    ...mapActions([
      'fetchProjects',
      'deleteProject',
      'updateProject'
    ]),
    onDoubleClick(currentProject) {
      const updatedProject = {
        id: currentProject.id,
        title: currentProject.title,
        completed: !currentProject.completed
      }
      this.updateProject(updatedProject);
    }
  },
  computed: {
    ...mapGetters([
      'allProjects',
    ])
  },
  created() {
    this.fetchProjects();
  }
}
</script>