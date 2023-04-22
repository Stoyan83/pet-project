<template>
  <div id="container" class="flex-container">
    <div v-for="list in allLists" :key="list.id" class="kanban" :class="{dragging: dragging}" @drop="(event) => onDrop(event, list.id)" @dragover.prevent>
      <div class="kanban-header">{{ list.name }}</div>
      <draggable v-model="getProjectTasks.data" :options="{group:'tasks', draggable: '.task'}" :itemKey="task => task.id" class="list" @change="updateListTasks">
        <template v-slot:item="{element}" >
          <div v-if="list.id == element.list_id" :key="element.id" class="task" @click="(event) => onClick(event, element.id)" @dragstart="(event) => onStart(event, element.id)">
            <div class="task-content"><p>{{ element.description }}</p></div>
            <div class="task-content"><p>{{ element.user.email }}</p></div>
            <div class="avatar">
              <img src="https://community.intersystems.com/sites/default/files/pictures/picture-default.jpg" alt="avatar" class="avatar-image">
            </div>
          </div>
        </template>
      </draggable>
    </div>
    <div class="kanban task-manager">
      <task-manager :task-id="currentTaskId"></task-manager>
    </div>
  </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex';
  import draggable from "vuedraggable";
  import TaskManager from '../tasks/TaskManager.vue';

  export default {
    components: {
      draggable,
      TaskManager,
    },
    data() {
      return {
        enabled: true,
        dragging: false,
        taskId: '',
        filtered: [],
        clickedTaskId: null,
        listId: null,
        tasks: [],
      };
    },
    name: "ListManager",

    methods: {
      ...mapActions([
        'fetchTasks',
        'deleteTask',
        'updateTask',
        'fetchTeams',
        'fetchTask',
        'fetchLists',
        'updateTasks',
        'fetchProjectTasks'
      ]),

      onStart(_, elementId) {
        this.taskId = elementId
      },

      onClick(_, clickedElementId) {
        this.clickedTaskId = clickedElementId
      },

      async onDrop(_, listId) {
        this.listId = listId
        await this.updateTask({
          id: this.taskId,
          list_id: listId,
        });
        this.fetchProjectTasks(this.$route.params.id)
      },

      updateListTasks() {
        const tasks = this.getProjectTasks.data.filter(task => task.list_id == this.listId)
        .map((task, index) => {
            return { id: task.id, position: index + 1 }
          });
        this.updateTasks(tasks)
    },
  },

    computed: {
      ...mapGetters([
        'allTasks',
        'isLoggedIn',
        'allLists',
        'getTaskPosition',
        'getProjectTasks',

      ]),

      currentTaskId() {
        return this.clickedTaskId;
      }
    },

    mounted() {
      this.fetchTasks(this.$route.params.id);
      this.fetchLists(this.$route.params.id);
      this.fetchProjectTasks(this.$route.params.id)
      this.fetchTeams();
    },
  }
</script>

<style>

#container {
  display: flex;
  flex-wrap: nowrap;
  text-align: center;
  margin-top: 20px;
  min-height: 10vh;
  overflow-x: auto;
}

.kanban {
  display: inline-block;
  vertical-align: top;
  width: 33.33%;
  margin-bottom: 20px;
  background-color: #f4f5f7;
  border-radius: 3px;
  padding: 0;
  box-shadow: 0 1px 2px rgba(9, 30, 66, 0.08);
  min-height: 50vh;
  margin-right: 12px;
}

.kanban-header {
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 16px;
  color: #172b4d;
  padding: 8px;
  background-color: #ebecf0;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.task-container {
  flex: 1;
  padding: 8px;
}

.task {
  display: block;
  background-color: #fff;
  border-radius: 3px;
  padding: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.13);
  cursor: pointer;
  width: 95%;
  transition: transform 0.2s ease-in-out;
  font-size: 14px;
  font-weight: 400;
  color: #172b4d;
  border: 2px solid transparent;
  user-select: none;
  position: relative;
}

.task:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(9, 30, 66, 0.25);
  border-color: #ebecf0;
}

.avatar {
  position: absolute;
  top: 8px;
  right: 8px;
}

.avatar-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.task-content {
  margin: 0;
  font-size: 14px;
  color: #172b4d;
  text-align: left;
}

.list:empty {
    padding: 0 8px;
    text-align:center;
    color: #aaa;
    font-size: 14px;
    font-style: italic;
}

.list:empty:before {
  content: 'No issues in this column';
}

.kanban.task-manager {
  width: 33.33%;
  margin-bottom: 20px;
  background-color: #f4f5f7;
  padding: 0;
  box-shadow: 0 1px 2px rgba(9, 30, 66, 0.08);
  border-radius: 3px;
  margin-left: 12px;
}

@media screen and (max-width: 768px) {
  #container {
    flex-wrap: wrap;
  }

  .kanban {
    width: 100%;
    margin-right: 0;
    margin-bottom: 12px;
  }

  .kanban.task-manager {
    width: 100%;
    margin-left: 0;
  }
}
</style>
