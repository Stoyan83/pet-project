<template>
    <div class="task-card" v-if="getBrowseTask" >
    <div class="task-card-header">
      <h3>Task Details</h3>
    </div>
    <div class="task-card-body">
      <p>{{ getBrowseTask.data.description }}</p>
      <p>Reporter: {{ getBrowseTask.data.user.email }}</p>
      <p>Assignee: {{ getBrowseTask.data.user.email }}</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';


  export default {
    name: "TaskBrowseDetail",

    methods: {
      ...mapActions([
        'fetchBrowseTask',
      ]),

    },

    computed: {
      ...mapGetters([
        'getBrowseTask',
      ]),
    },


    mounted() {
      this.fetchBrowseTask(this.$route.params.id);
    },
  }
</script>
