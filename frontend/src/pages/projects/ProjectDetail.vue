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
        <i @click="deleteProject(data.id), fetchProject(data.id)" class="fas fa-trash-alt"></i>
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
      router.push(`/api/v1/browse/projects/${id}`)
    },

  },

  computed: {
    ...mapGetters([
      'getProject',
      "isLoggedIn",
    ]),
  },

  mounted() {
    this.fetchProject(this.$route.params.id);
    this.fetchTeams()
  }
}
</script>
