<template>
    <h3>Details</h3>
  <div>
    <div v-for="data in getProject" :key="data.id">
      <div @click="onClick(data.id)" class="project-type">
        {{ data.id }}
      </div>
      <div class="project-description">
        {{ data.project_type }}
      </div>
      <div class="project-type">
        {{ data.description }}
        <i @click="deleteProject(data.id), fetchProject()" class="fas fa-trash-alt"></i>
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
      'fetchProject',
      'deleteProject',
      'fetchTeams'
    ]),
    onClick(id) {
      router.replace('/api/v1/projects/' + id)
    },

  },

  computed: {
    ...mapGetters([
      'getProject',
      "isLoggedIn",
    ]),
  },

  mounted() {
    this.fetchProject(this.$route.path.split("/").pop());
    this.fetchTeams()
  }
}
</script>
