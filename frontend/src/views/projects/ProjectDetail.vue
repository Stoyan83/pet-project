<template>
  <draggable v-if="singleProjectList && !isBrowse" :list="singleProjectList" :itemKey="project => project.id">
    <template #item="{element}">
      <div class="project-card" :key="element.id" @dragover.prevent @drop="onDrop(event, element.id)">
        <div class="project-header"  @click="onClick(element.id)">
          <div class="project-title">{{ element.project_type }}</div>
          <i class="fas fa-chevron-right"></i>
        </div>
        <div class="project-body">
          <p class="project-description">{{ element.description }}</p>
        </div>
        <div class="project-footer">
          <i @click="deleteProject(element.id), fetchProject(element.id)" class="fas fa-trash-alt"></i>
        </div>
      </div>
    </template>
  </draggable>
  <list-manager v-if="isBrowse"></list-manager>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import router from '@/router';
import ListManager from '@/views/lists/ListManager.vue';
import draggable from 'vuedraggable';

export default {
  components: {
    ListManager,
    draggable,
  },


  name: "ProjectManager",

  methods: {
    ...mapActions([
      'fetchProject',
      'deleteProject',
      'fetchTeams'
    ]),

    onClick(id) {
      router.push(`/api/v1/browse/projects/${id}`)
    },

    onDrop(_, elementId) {
      console.log(elementId);
    }

  },

  computed: {
    ...mapGetters([
      'getProject',
      "isLoggedIn",
      'allProjects',
    ]),

    isBrowse() {
      return this.$route.name == 'browse'
    },


    singleProjectList() {
      const projectId = parseInt(this.$route.params.id);
      const project = this.allProjects?.data?.find(project => project.id === projectId);
      return [project] || null;
    },
  },

  mounted() {
    this.fetchProject(this.$route.params.id);
    this.fetchTeams()
  }

}
</script>



<style>
.project-card {
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  margin: 0 auto;
  margin-top: 32px;
  overflow: hidden;
  transition: box-shadow 0.2s ease-in-out;
  padding: 1rem;
  background-image: linear-gradient(to bottom right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.05));
}

.project-header {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 16px;
}

.project-title {
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
}

.project-body {
  padding: 16px;
}

.project-description {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.project-footer {
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding: 16px;
}

.project-footer i {
  cursor: pointer;
  font-size: 16px;
  color: #999;
  transition: color 0.2s ease-in-out;
}

.project-card:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.project-footer i:hover {
  color: #f44336;
}

</style>
