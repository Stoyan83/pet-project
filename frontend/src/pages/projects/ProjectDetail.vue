<template>
  Details
  {{ getProject.data.id }}
  {{ getProject.data.project_type }}
  {{ getProject.data.description }}
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