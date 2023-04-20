<template>

  <div v-if="isLoggedIn">
    <div class="projects" v-if="allProjects.data">
      <div class="header">
        <a href="#" class="back-link" @click="goBack">Back</a>
        <h1>Projects: {{ allProjects.meta.total }}</h1>
      </div>
      <draggable v-model="allProjects.data" group="projects" :itemKey="item => item.id">
        <template #item="{ element}">
          <div class="project-item" @drop="onDrop(event, element.id)" @click="onClick(element.id)">
            <div class="project-type">{{ element.project_type }}</div>
            <div class="project-description">{{ element.description }}</div>
            <div class="delete-icon">
              <i @click="deleteProject(element.id)" class="fas fa-trash-alt"></i>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
  <router-view :key="$route.fullPath"></router-view>
  <team-tasks @task-dragged="onTaskDragged"></team-tasks>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import router from '@/router';
import TeamTasks from '@/views/tasks/TeamTasks.vue';
import draggable from 'vuedraggable';

export default {
  components: {
    TeamTasks,
    draggable,
  },
  name: "ProjectManager",

  methods: {
    ...mapActions([
      'fetchProjects',
      'deleteProject',
      'updateProject',
      'fetchTeams',
      'fetchProject',
      'fetchTeamTasks',
      'updateTask',
    ]),

    onClick(id) {
      router.push(`/api/v1/projects/${id}`)
    },

    goBack() {
      this.$router.go(-1);
    },

    onTaskDragged(draggedTaskId) {
      this.draggedTaskId = draggedTaskId;
    },

    onDrop(_, elementId) {
    const projectId = elementId;
    this.fetchTeamTasks()
    this.$store.dispatch('updateTask', {
      id: this.draggedTaskId,
      project_id: projectId,
    });
    },

  },

  computed: {
    ...mapGetters([
      'allProjects',
      'isLoggedIn',
      'getTeamTasks',
    ]),
  },


  mounted() {
    this.fetchProjects();
    this.fetchTeams();
    this.fetchTeamTasks();
  },
}
</script>

<style>
  .header {
    display: flex;
    justify-content: center; /* Modified */
    align-items: center;
    width: 100%;
    height: 3rem;
    background-color: #f0f0f0;
    padding: 0 1rem; /* Added */
  }

  h1 {
    font-family: "Roboto", sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: center;
    margin: 0;
  }

  .back-link {
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    color: #333;
    margin-right: 1.5rem;
    position: relative;
    padding-left: 1.5rem;
  }

  .back-link::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    border-top: 0.25rem solid #333;
    border-left: 0.25rem solid #333;
    transition: transform 0.2s ease-in-out;
  }

  .back-link:hover::before {
    transform: translateY(-50%) rotate(-45deg);
  }
</style>
