<template>
  <div id="container">
    <div v-for="list in allLists" :key="list.id" class="kanban" :class="{dragging: dragging}" @drop="(event) => onDrop(event, list.id)" @dragover.prevent>
      <div class="kanban-header">{{ list.name }}</div>
      <draggable v-model="allTasks.data" :options="{group:'tasks', draggable: '.task'}" :itemKey="task => task.id" class="list">
        <template v-slot:item="{element}" >
          <div v-if="list.id == element.list_id" :key="element.id" class="task" @dragstart="(event) => onStart(event, element.id)">
            <div class="task-content"><p>{{ element.id }}</p></div>
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
        filtered: [],
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

      async onDrop(_, listId) {
        await this.updateTask({
        id: this.taskId,
        list_id: listId,
      });
      this.fetchTasks(this.$route.params.id);
      this.fetchLists(this.$route.params.id);
        const tasks = this.allTasks.data.filter(task => task.list_id == listId);
        tasks.forEach((item, index) => {
        this.updateTask({
          id: item.id,
          position: index,
        });
        this.fetchLists(this.$route.params.id);
        this.fetchTasks(this.$route.params.id);
      });
      },
      },

    computed: {
      ...mapGetters([
        'allTasks',
        'isLoggedIn',
        'allLists',
        'getTaskPosition',
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
  flex-wrap: nowrap;
}

.kanban {
  display: inline-block;
  vertical-align: top;
  width: calc(33.33% - 20px);
  margin-bottom: 20px;
  background-color: #f4f4f4;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
}

.kanban:hover {
  transform: translateY(-5px);
}

.kanban:last-child {
  margin-right: 0;
}

.kanban-header {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
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
  transition: transform 0.2s ease-in-out;
}

.task:hover {
  background-color: #f4f4f4;
  transform: translateY(-3px);
}

.task-content {
  margin: auto;
  font-size: 14px;
  color: #666;
  text-align: center;
}

.list:empty {
    padding:1rem;
    text-align:center;
}

.list:empty:before {
content: 'Drag a task here';
font-family: Arial, sans-serif;
font-size: 16px;
color: #999;
font-style: italic;
}
</style>
