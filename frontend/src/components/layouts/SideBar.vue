<template>
    <div id="mySidenav" class="sidenav">
      <div>
        <router-link :to="`/api/v1/projects`">
          <i class="fas fa-folder" title="Projects"></i>
        </router-link>
        <router-link
          to=""
          v-if="isAddProject"
          @click="showModal('addProject')"
        >
          <i class="fas fa-plus" title="Add Project"></i>
        </router-link>
        <router-link
          to=""
          v-if="isAddProject"
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
  },
}
</script>


<style scoped>.sidenav {
  height: 100vh;
  width: 60px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #2b3b49;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sidenav a {
  padding: 8px 24px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  align-items: center;
}

.sidenav a i {
  display: block;
  margin: 0 auto;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.span {
  font-size: 20px;
  cursor: pointer;
  color: #f1f1f1;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

</style>
