<template>
   <div id="app">
    <button
      type="button"
      class="btn"
      @click="showModal"
    >
      Add Project
    </button>
  </div> 
  
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
  
  <base-modal
  v-show="isModalVisible"
  @close="closeModal"
>
  <template v-slot:header>
    Add Project
  </template>

  <template v-slot:body>
    <add-project></add-project>
  </template>

  <template v-slot:footer>
    Select Type and Description
  </template>
</base-modal> 
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddProject from '@/pages/projects/AddProject.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import router from '@/router';
export default {
  components: {
    AddProject,
    BaseModal,
  },
  name: "ProjectManager",
  data() {
      return {
        isModalVisible: false,
      };
    },
  methods: {
    ...mapActions([
      'fetchProjects',
      'deleteProject',
      'updateProject'
    ]),

    onClick(id) {
      router.push(this.$route.path + '/' + id)
    },
    showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
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