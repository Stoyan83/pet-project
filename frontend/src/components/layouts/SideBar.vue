<template>


<div id="mySidenav" class="sidenav">
  <span class="span" @click="  modalVisible? closeNav() : openNav()">&#9776;</span>
  <div>
    <router-link :to="`/api/v1/projects`" @click="closeNav()">Projects</router-link>
    <router-link to="" v-if="modalVisible && isAddProject" @click="showModal">Add Project</router-link>
    <router-link to="" v-if="modalVisible && isBrowse" @click="showModal">Edit Project</router-link>
  </div>

    </div>
  <div>
  <base-modal
  v-show="isModalVisible"
  @close="closeModal"
  >
  <template v-slot:header>
    Add Project
  </template>

  <template v-slot:body>
    <add-project v-if="!isBrowse"></add-project>
   <update-project v-if="isBrowse"></update-project>
  </template>

  <template v-slot:footer>
    Select Type and Description
  </template>
</base-modal>
</div>

</template>



<script>
import AddProject from '@/views/projects/AddProject.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import UpdateProject from '@/views/projects/UpdateProject.vue'
export default {

  components: {
    AddProject,
    BaseModal,
    UpdateProject,
  },
  data() {
    return {
      modalVisible: false,
      isModalVisible: false,
    };
    },
  methods: {
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    this.modalVisible = true;
  },

  closeNav() {
    document.getElementById("mySidenav").style.width = "30px";
    this.modalVisible = false;
  },
  showModal() {
        this.isModalVisible = true;
        this.closeNav()
      },
      closeModal() {
        this.isModalVisible = false;
      },
  },
  computed: {

    isBrowse() {
      return this.$route.name == 'browse'
    },

    isAddProject() {
      return this.$route.name == "addProject"
    },
  },
  }
</script>

<style scoped>
body {
  font-family: "Lato", sans-serif;
}

.sidenav {
  height: 100%;
  width: 30px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #2b3b49;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  text-align: center;
}

.sidenav a {
  padding: 8px 24px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
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
