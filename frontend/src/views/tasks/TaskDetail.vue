<template>
  <draggable v-if="getTask.data && !currentRouteName" :list="[getTask.data]" class="task-card-body" :options="{group: 'task-group'}" item-key="id">
    <template #item="{element}">
      <div class="task-card task-card-draggable"  @dragstart="onDragStart(element)">
        <div class="task-card-header" @click="onClick(element.id)">
          <p>Task Details</p>
        </div>
        <div class="draggable-content">
          <p>{{ element.description }}</p>
          <p>Reporter: {{ element.user.email }}</p>
          <p>Assignee: {{ element.user.email }}</p>
          <div class="task-card-watch">{{ currentTime }}</div>
        </div>
      </div>
    </template>
  </draggable>
  <div v-if="getTask.data && currentRouteName">
    <div v-if="getTask.data" @click="onClick(getTask.data.id)">
      <div class="jira-card">
        <div class="jira-card-header">
          <p class="jira-card-id">{{ getTask.data.id }}</p>
          <p class="jira-card-status">In Progress</p>
        </div>
        <div class="jira-card-body">
          <p class="jira-card-summary">{{ getTask.data.description }}</p>
          <p class="jira-card-reporter">Reporter: {{ getTask.data.user.email }}</p>
          <p class="jira-card-assignee">Assignee: {{ getTask.data.user.email }}</p>
          <p class="jira-card-task">Task: </p>
          <p class="jira-card-assignee">Assignee: </p>
          <p class="jira-card-status">Status: </p>
          <p class="jira-card-attachments">AttachPictures: </p>
          <p class="jira-card-comments">Comments: </p>
        </div>
        <div class="jira-card-footer">
          <p class="jira-card-time">{{ currentTime }}</p>
          <update-task :task-id="currentTaskId"></update-task>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import UpdateTask from './UpdateTask.vue';
import router from '@/router';
import draggable from 'vuedraggable';

export default {
  name: "TaskDetail",
  props: {
    taskId: {
      type: Number,
      default: null
    },
  },

  components: {
    UpdateTask,
    draggable,
  },

  data() {
    return {
      currentTime: new Date().toLocaleTimeString(),
      currentTaskId: null,
    }
  },

  methods: {
    ...mapActions([
      'fetchTask',
      'setDraggedTaskId',
    ]),

    onClick(id) {
      router.push("/api/v1/browse/tasks/" + id)
    },

    onDragStart(event) {
        this.setDraggedTaskId(event.id);
    },
  },

  computed: {
    ...mapGetters([
      'getTask',
    ]),

    currentRouteName() {
      return this.$route.name == "browse";
    },
  },

  watch: {
    taskId(newTaskId) {
      this.fetchTask(newTaskId);
    },

    currentTaskId(newTaskId) {
      this.fetchTask(newTaskId);
    }
  },

  mounted() {
    this.currentTaskId = this.taskId;

    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
  },
}
</script>


<style>
.task-card {
  background-color: #f0f2f5;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 3rem;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
}

@media only screen and (max-width: 768px) {
  .task-card {
    max-width: 100%;
    height: auto;
  }
}

.task-card:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.task-card-header {
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
  padding: 0.5rem 1rem;
  text-align: center;
  width: 100%;
}

.task-card-header h3 {
  margin: 0;
}

.task-card-body {
  margin-top: 0.5rem;
  text-align: center;
}

.task-card-body p {
  margin: 0.5rem 0;
}

.task-card-watch {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: gray;
}

/* Board */

.jira-card {
  background-color: #ffffff;
  border: 1px solid #dfe1e6;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  max-width: 400px;
  position: relative;
  text-decoration: none;
  z-index: 0;
  min-height: 100vh;
  padding: 24px;
  width: 80%;
  height: calc(100vh - 100px);
}

.jira-card-header {
  align-items: center;
  background-color: #f4f5f7;
  border-bottom: 1px solid #dfe1e6;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  color: #172b4d;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  min-height: 32px;
  padding: 0 8px;
  cursor: pointer;
}
.jira-card-id {
  margin-right: 8px;
}
.jira-card-status {
  background-color: #36b37e;
  border-radius: 3px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  padding: 2px 4px;
  margin-left: auto;
}
.jira-card-body {
  padding: 40px;
}
.jira-card-summary {
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: 8px;
}
.jira-card-reporter, .jira-card-assignee, .jira-card-task, .jira-card-status, .jira-card-attachments, .jira-card-comments {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 4px;
}
.jira-card-footer {
  align-items: center;
  border-top: 1px solid #dfe1e6;
  display: flex;
  font-size: 12px;
  font-weight: 400;
  justify-content: space-between;
  line-height: 16px;

}
</style>
