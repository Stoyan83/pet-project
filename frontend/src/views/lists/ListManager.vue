<template>
  <div id="container" v-if="allLists">
    <div v-for="list in allLists" :key="list.id" class="kanban">
      <div class="kanban-header">{{ list.name }}</div>
      <draggable @drop="(event) => onDrop(event, list.id)" v-model="allTasks.data" :options="{group:'tasks'}" :itemKey="task => task.id" >
        <template v-slot:item="{element}" >
          <div v-if="list.id == element.list_id" :key="element.id" class="task" :class="{ dragging: dragging }" @dragstart="(event) => onStart(event, element.id)" >
            <div class="task-content">{{ element.id }}</div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import draggable from "vuedraggable";

  export default {
    components: {
      draggable,
    },
    data() {
      return {
        enabled: true,
        dragging: false,
        taskId: '',
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

      onStart(_, elementId) {
        this.taskId = elementId
      },

      onDrop(_, listId) {
        this.updateTask({
          id: this.taskId,
          list_id: listId
        })
        this.fetchTasks(this.$route.params.id)
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
