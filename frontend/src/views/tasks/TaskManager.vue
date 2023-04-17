<template>
  <div v-if="allTasks.data">
  </div>

  <router-view :key="$route.fullPath"></router-view>


  <task-detail :task-id="taskId"></task-detail>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import router from '@/router';
import TaskDetail from './TaskDetail.vue';

export default {
  props: {
    taskId: {
        type: Number,
        default: null
      }
  },
  components: {
    TaskDetail,
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

