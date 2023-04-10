<template>

  <!-- <div v-if="isLoggedIn">
    <div v-if="allTasks.data">
      <h3>Total Tasks: {{ allTasks.meta.total }}</h3>
      <div class="projects">
      <div  v-for="data in allTasks.data" :key="data">
          <div @click=" onClick(data.id)" class="project-type">
            {{ data.status }}
          </div>
          <div class="project-description">
            {{ data.description }}
            <i @click="deleteTask(data.id)" class="fas fa-trash-alt"></i>
          </div>
        </div>
      </div>
      </div>
  </div>
  <router-view :key="$route.fullPath"></router-view>
  <side-bar v-if="isLoggedIn"></side-bar> -->
 <h3>Total Tasks: {{ allTasks.meta.total }}</h3>
<div class="projects">
  <draggable v-model="allTasks.data" item-key="id">
    <template #item="{ element }">
      <div @click=" onClick(element.id)" class="project-type ">
        Task: {{ element.description }}
      </div>
    </template>
</draggable>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  // import SideBar from '@/components/layouts/SideBar.vue'
  import router from '@/router';
  import draggable from "vuedraggable";

  export default {
    components: {
      // SideBar,
      draggable,
    },
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
        'allProjects'
      ]),

      onClick(id) {
        router.push(`${this.$route.path}`+ "/project_tasks/" + id)
      },

    },

    computed: {
      ...mapGetters([
        'allTasks',
        'isLoggedIn',
      ]),

    },

    mounted() {
      this.fetchTasks(this.$route.params.id);
      this.fetchTeams();
    },
  }
</script>
