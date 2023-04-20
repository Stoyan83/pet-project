<template>
  <div v-if="isLoggedIn">
    <div class="projects" v-if="getTeamTasks.data">
      <h1>Tasks: </h1>
      <div v-if="currentTaskId" class="task-actions">
        <task-detail :task-id="currentTaskId"></task-detail>
      </div>
      <draggable v-model="getTeamTasks.data" class="projects" @change="onDrop" :key="getTeamTasks.data.length" :itemKey="(item) => item.id">
      <template #item="{element}">
        <div class="project-item" @click="onClick(element.id)" draggable  @dragstart="onDragStart(element, element.id)">
          <div class="project-type task-title">{{ element.description }}</div>
          <div class="task-body">
            <p class="task-description project-description">{{ element.user.email }}</p>
          </div>
          <div class="task-body">
            <p class="task-description project-description">{{ element.assignee_id}}</p>
          </div>
          <div class="task-body">
            <p class="task-description project-description">{{ element.user.id }}</p>
          </div>
          <div class="task-footer delete-icon">
            <i class="fas fa-trash-alt" @click="deleteTask(element.id)"></i>
          </div>
        </div>
      </template>
      </draggable>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TaskDetail from './TaskDetail.vue';
import draggable from 'vuedraggable';

export default {

  components: {
    TaskDetail,
     draggable,
  },

  data() {
      return {
        taskId: '',
        clickedTaskId: null,
        draggedTaskId: null,
        successMessage: '',
      };
    },

  name: "TeamTasks",
  methods: {
    ...mapActions([
      'fetchTeamTasks',
      'deleteTask',
      'fetchTeams',
      'updateTask',
      'setSuccessMessage',
    ]),

    onClick(id) {
      this.clickedTaskId = id;
    },

    async onDrop() {
        const tasks = this.getTeamTasks.data;
        tasks.forEach((item, index) => {
        this.updateTask({
          id: item.id,
          position: index,
        });
        this.setSuccessMessage('Task successfully moved!')
        this.fetchTeamTasks()
      });
      },

      onDragStart(element) {
        this.draggedTaskId = element.id;
        this.$emit('task-dragged', this.draggedTaskId);
      },

      resetSuccessMessage() {
      this.successMessage = '';
    },
  },

  computed: {
    ...mapGetters([
      'getTeamTasks',
      "isLoggedIn",
    ]),

    currentTaskId() {
        return this.clickedTaskId;
      },

    isBrowse() {
      return this.$route.name == 'browse'
    },

  },

  mounted() {
    this.fetchTeamTasks()
    this.fetchTeams()
  }
}
</script>

<style>
.task-actions {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  float: right;
}


.task-actions > * {
  margin: 0 10px;
}

</style>
