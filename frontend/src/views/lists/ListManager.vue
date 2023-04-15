<template>
  <div id="container" v-if="allLists">
    <div v-for="list in allLists" :key="list.id" class="kanban">
      <div class="kanban-header">{{ list.name }}</div>
      <div v-for="task in allTasks.data" :key="task.id" class="kanban">
        <div v-if="list.id == task.list_id">{{ task.list_id }}</div>
    </div>
    </div>
  </div>
  <router-view :key="$route.fullPath"></router-view>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import router from '@/router';

  export default {
    components: {
      // draggable,
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
#container {
  display: flex;
}

.kanban {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.kanban-header {
  font-weight: bold;
  margin-bottom: 10px;
}

.task-container {
  flex: 1;
}

.task {
  display: flex;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  width: 100%;
}

.task:hover {
  background-color: #f4f4f4;
}
</style>
