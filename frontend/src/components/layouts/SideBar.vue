<template>


<div id="mySidenav" class="sidenav">
  <span class="span" @click="  modalVisible? closeNav() : openNav()">&#9776;</span>
  <div id="app">  
    </div> 
      <router-link to="" @click="showModal">Add Project</router-link>
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
    <add-project></add-project>
  </template>

  <template v-slot:footer>
    Select Type and Description
  </template>
</base-modal> 
</div>

</template>



<script>
import AddProject from '@/pages/projects/AddProject.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
export default {
  components: {
    AddProject,
    BaseModal,
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
    this.modalVisible =true;
  },

  closeNav() {
    document.getElementById("mySidenav").style.width = "30px";
    this.modalVisible = false;
  },
  showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
  }
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
}

.sidenav a {
  padding: 8px 8px 8px 32px;
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