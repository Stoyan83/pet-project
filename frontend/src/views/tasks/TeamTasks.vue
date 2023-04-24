<template>
  <div v-if="isLoggedIn">
    <div class="projects" v-if="getTeamTasks.data.length > 0">
      <h1>Tasks: </h1>
      <div v-if="currentTaskId" class="task-actions">
        <task-detail :task-id="currentTaskId"></task-detail>
      </div>
      <draggable v-model="getTeamTasks.data" class="projects" @change="onChange" :key="getTeamTasks.data.length" :itemKey="(item) => item.id">
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
          <div class="task-footer delete-icon" @click="showModal(element.id)">
            <i class="fas fa-trash-alt" ></i>
          </div>
        </div>
      </template>
      </draggable>
    </div>
  </div>

  <BaseModal v-if="isModalVisible"
    v-show="isModalVisible"
    @close="closeModal">
    <template v-slot:header>
      Are you sure you want to delete this task?
    </template>
    <template v-slot:body>
      This action cannot be undone. All files associated with this task will be permanently deleted.
    </template>
    <template v-slot:footer>
      <button @click="onDelete">Delete</button>
      <button @click="closeModal">Cancel</button>
    </template>
  </BaseModal>


</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TaskDetail from './TaskDetail.vue';
import draggable from 'vuedraggable';
import BaseModal from '@/components/ui/BaseModal.vue'

export default {

  components: {
    TaskDetail,
     draggable,
     BaseModal
  },

  data() {
      return {
        taskId: '',
        clickedTaskId: null,
        draggedTaskId: null,
        successMessage: '',
        isModalVisible: false,
        taskDeleteId: null,
      };
    },

  emits: ['task-dragged'],

  name: "TeamTasks",
  methods: {
    ...mapActions([
      'fetchTeamTasks',
      'deleteTask',
      'fetchTeams',
      'updateTask',
      'setSuccessMessage',
      'setDraggedTaskId',
    ]),

    onClick(id) {
      this.clickedTaskId = id;
    },

    async onChange() {
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
        this.setDraggedTaskId(element.id);
      },

      resetSuccessMessage() {
      this.successMessage = '';
    },

    onDelete () {
      this.deleteTask(this.taskDeleteId);
      this.closeModal()
    },

    showModal(taskDeleteId) {
        this.taskDeleteId = taskDeleteId;
        this.isModalVisible = true;
      },

      closeModal() {
      this.isModalVisible = false;
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
