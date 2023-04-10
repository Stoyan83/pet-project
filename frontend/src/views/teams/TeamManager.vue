<template>
    <div v-if="isLoggedIn">
      <div  v-if="allTeams.length > 0" class="projects">
      
      <div  v-for="team in allTeams" :key="team.id">
        
          <div @click="onClick(team.id)" class="project-type">
            {{ team.id }} 
          </div>
          <div class="project-description">
              {{ team.name }}
              <!-- <i @click="deleteProject(data.id)" class="fas fa-trash-alt"></i> -->
          </div>
  
        </div>
    </div>
      <div v-else>
        <h3>You have no team</h3>
      </div>
  </div>
</template>



<script>
import { mapGetters, mapActions } from 'vuex';
// import SideBar from '@/components/layouts/SideBar.vue'
import router from '@/router';
export default {
  // components: {
  //   SideBar,
  // },
  
  name: "ProjectManager",
  methods: {
    ...mapActions([
      'fetchTeams',
    ]),

    onClick(id) {
      router.push(this.$route.path + '/' + id )
    },
 
  },

  computed: {
    ...mapGetters([
      'allTeams',
      'isLoggedIn',
    ]),
  },
  
  mounted() {
    this.fetchTeams();
  }
}
</script>

<style>

</style>