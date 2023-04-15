<template>
  <div v-if="allTasks.data">
    <h3>Total Tasks: {{ allTasks.meta.total }}</h3>
  <div class="projects">

    </div>
  </div>
  <router-view :key="$route.fullPath"></router-view>
  <side-bar v-if="isLoggedIn"></side-bar>
  </template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import router from '@/router';

  export default {

    data() {
      return {
      enabled: true,
      dragging: false
    };
    },
    name: "TaskManager",

    methods: {
      ...mapActions([
        'fetchTasks',
        'deleteTask',
        'updateTask',
        'fetchTeams',
        'fetchTask',
        'fetchLists'
      ]),

      onClick(id) {
        router.push(`${this.$route.path}`+ "/project_tasks/" + id)
      },

    },

    computed: {
      ...mapGetters([
        'allTasks',
        'isLoggedIn',
        'allLists',
      ]),

    },

    mounted() {
      this.fetchTasks(this.$route.params.id);
      this.fetchLists(this.$route.params.id);
      this.fetchTeams();
    },
  }
</script>
