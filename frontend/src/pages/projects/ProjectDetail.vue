<template>
    <h3>Details</h3>
  <div>
    <div v-for="data in getProject" :key="data.id">
      <div class="project-type">
        {{ data.id }}
      </div>
      <div class="project-description">
        {{ data.project_type }}
      </div>
      <div class="project-type">
        {{ data.description }}
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
      'fetchProject',

    ]),


  },

  computed: {
    ...mapGetters([
      'getProject',
      "isLoggedIn",
    ]),
  },

  mounted() {
    this.fetchProject(this.$route.path.split("/").pop());
  }
}
</script>
