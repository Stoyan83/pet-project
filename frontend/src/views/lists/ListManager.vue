<template>
  <div v-if="allLists">
  <div>
    <draggable v-model="allLists" item-key="id" id="container">
      <template #item="{ element }">
        <div @click=" onClick(element.id)" class="project-type">
          {{ element.name }}
        </div>
      </template>
    </draggable>
    </div>
  </div>
  <router-view :key="$route.fullPath"></router-view>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import router from '@/router';
  import draggable from "vuedraggable";

  export default {
    components: {
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
        'allLists'
      ]),

    },

    mounted() {
      this.fetchTasks(this.$route.params.id);
      this.fetchLists(this.$route.params.id);
      this.fetchTeams();
    },
  }
</script>


<style>
/* #container {
  display: grid;
  grid-template-columns: repeat(2, 50px 1fr) 100px;
  grid-gap: 5px;
  box-sizing: border-box;
  height: 200px;
  width: 100%;
  padding: 10px;
} */

/* #container > div {
  padding: 5px;
} */
</style>
