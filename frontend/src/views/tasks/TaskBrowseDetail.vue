<template>
  <div v-if="getBrowseTask" class="ticket">
    <h3>{{ getBrowseTask.data.summary }}</h3>
    <div>
      <p>{{ getBrowseTask.data.description }}</p>
      <p>Reporter: <span class="reporter">{{ getBrowseTask.data.user.email }}</span></p>
      <p>Assignee: <span class="assignee">{{ getBrowseTask.data.user.email }}</span></p>
      {{ getBrowseTask.data }}
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


<style>
  .ticket {
    background-color: #f5f5f5;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-top: 20px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .ticket h3 {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 10px;
    color: #172b4d;
  }

  .ticket p {
    font-size: 16px;
    margin: 0 0 5px;
    color: #586069;
  }

  .ticket .reporter {
    color: #0052cc;
    font-weight: 600;
  }

  .ticket .assignee {
    color: #6a737d;
    font-weight: 600;
  }
</style>
