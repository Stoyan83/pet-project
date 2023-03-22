<template>
  <div>
    <h3>Add Project</h3>
    <div class="add">
      <form @submit="onSubmit">
        <div>
        <input type="text" name="project_type" v-model="project.project_type" placeholder="Add Project...">
      </div>
      <div>
        <input type="text" name="description" v-model="project.description" placeholder="Add Description...">
      </div>
        <button type="submit">+</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'AddProject',
  
  data() {
    return {
      project: {
      project_type: "",
      description: "",
      },
      message: "",
    }
     
  },
  methods: {
    ...mapActions(['addProject', 'fetchProjects', 'fetchProject']),
    onSubmit(event) {
      event.preventDefault();

      if (this.description == "" || this.project_type == "") {
          return 
          }
   
      this.addProject(this.project);
      this.project.project_type = "";
      this.project.description = "";
      this.fetchProjects()
    }
  },
}
</script>

<style scoped>
form {
  display: flex;
}

input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #ccc;
  outline: 0;
}

input[type="text"]:hover,
input[type="text"]:focus {
  border: 1px solid #41b883;
}

input[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
}

input[type="submit"]:hover,
input[type="submit"]:focus {
  background: #318b63
}
</style>