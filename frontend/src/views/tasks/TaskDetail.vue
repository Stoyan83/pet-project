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
      <div>
        <div>
          <div>
            <p>{{ getTask.data.description }}</p>
            <p>{{ getTask.data.id }}</p>
            <p>Reporter: {{ getTask.data.user.email }}</p>
            <p>Assignee: {{ getTask.data.user.email }}</p>
            <update-task :task-id="currentTaskId"></update-task>
            <div>{{ currentTime }}</div>
          </div>
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
  padding: 1.2rem;
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
</style>
