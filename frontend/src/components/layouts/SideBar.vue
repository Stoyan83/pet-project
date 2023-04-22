<template>
    <div id="mySidenav" class="sidenav">
      <div class="router-links">
        <router-link :to="`/api/v1/projects`">
          <i class="fas fa-folder" title="Projects"></i>
        </router-link>
        <router-link
          to=""
          v-if="isAddProject || isProjectDetail"
          @click="showModal('addProject')"
        >
          <i class="fas fa-plus" title="Add Project"></i>
        </router-link>
        <router-link
          to=""
          v-if="isAddProject || isProjectDetail"
          @click="showModal('addTask')"
        >
          <i class="fas fa-tasks" title="Add Task"></i>
        </router-link>
        <router-link
          to=""
          v-if="isBrowse"
          @click="showModal('editProject')"
        >
        <i class="fas fa-pencil-alt" title="Edit Project"></i>
        </router-link>
      </div>
    </div>

    <div>
      <base-modal v-show="isModalVisible" @close="closeModal">
        <template v-slot:header>
          {{ modalTitle }}
        </template>

        <template v-slot:body>
          <add-project
            v-if="!isBrowse && isAddProject && isAddProjectType('addProject')"
          ></add-project>
          <add-task
            v-if="!isBrowse && isAddProject && isAddProjectType('addTask')"
          ></add-task>
          <update-project
            v-if="isBrowse && isAddProjectType('editProject')"
          ></update-project>
        </template>

        <template v-slot:footer>
          Please fill out all required fields
        </template>
      </base-modal>
    </div>
</template>


<script>
import AddProject from '@/views/projects/AddProject.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import UpdateProject from '@/views/projects/UpdateProject.vue'
import AddTask from '@/views/tasks/AddTask.vue'

export default {
  components: {
    AddProject,
    BaseModal,
    UpdateProject,
    AddTask,
  },
  data() {
    return {
      modalVisible: false,
      isModalVisible: false,
      modalType: '',
    };
  },
  methods: {
    openNav() {
      document.getElementById('mySidenav').style.width = '60px'
      this.modalVisible = true
    },

    closeNav() {
      document.getElementById('mySidenav').style.width = '20px'
      this.modalVisible = false
    },
    showModal(type) {
      this.modalType = type
      this.isModalVisible = true
    },
    closeModal() {
      this.modalType = ''
      this.isModalVisible = false
    },
    isAddProjectType(type) {
      return this.modalType === type
    },
  },
  computed: {
    modalTitle() {
      if (this.modalType === 'addProject') {
        return 'Add Project'
      } else if (this.modalType === 'addTask') {
        return 'Add Task'
      } else if (this.modalType === 'editProject') {
        return 'Edit Project'
      } else {
        return ''
      }
    },
    isBrowse() {
      return this.$route.name == 'browse'
    },

    isAddProject() {
      return this.$route.name == 'addProject'
    },

    isProjectDetail(){
      return this.$route.name == 'projectDetail'
    },
  },
}
</script>


<style scoped>
.sidenav {
  height: 100%;
  width: 64px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #f2f2f2;
  overflow-x: hidden;
  transition: 0.2s;
  padding-top: 10px;
}

.sidenav a {
  padding: 10px 0px;
  text-decoration: none;
  font-size: 24px;
  color: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.sidenav a:hover {
  background-color: #ddd;
}

.sidenav a i {
  margin-right: 0px;
  color: #222;
}

.sidenav .active {
  background-color: #ddd;
}

.router-links {
margin-top: 60px;
}
</style>
