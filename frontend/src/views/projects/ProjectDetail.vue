<template>
  <div v-if="isBrowse">
    <div v-for="data in getProject" :key="data.id" class="project">
      <div @click="onClick(data.id)">
        {{ data.description }}
        <i @click="deleteProject(data.id), fetchProject(data.id)" class="fas fa-trash-alt"></i>
      </div>
    </div>
  </div>
  <div v-else class="project-card" v-for="data in getProject" :key="data.id">
    <div class="project-header" @click="onClick(data.id)">
      <div class="project-title">{{ data.project_type }}</div>
      <i class="fas fa-chevron-right"></i>
    </div>
    <div class="project-body">
      <p class="project-description">{{ data.description }}</p>
    </div>
    <div class="project-footer">
      <i @click="deleteProject(data.id), fetchProject(data.id)" class="fas fa-trash-alt"></i>
    </div>
  </div>
  <list-manager v-if="isBrowse"></list-manager>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import router from '@/router';
import ListManager from '@/views/lists/ListManager.vue';

export default {
  components: {
    ListManager,
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

  },

  computed: {
    ...mapGetters([
      'getProject',
      "isLoggedIn",
    ]),

    isBrowse() {
      return this.$route.name == 'browse'
    }
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
