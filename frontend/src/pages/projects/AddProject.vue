<template>
  <div class="add">
    <form @submit="onSubmit">
      <div>
      <input type="text" name="project_type" v-model="project.project_type" placeholder="Type...">
    </div>
    <div>
      <input type="text" name="description" v-model="project.description" placeholder="Description...">
    </div>
      <input type="submit" value="Submit">
    </form>
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
    onSubmit() {
    
      if (this.description == "" || this.project_type == "") {
          return 
          }
   
      this.addProject(this.project);
      this.project.project_type = "";
      this.project.description = "";
    
    }
  },
}
</script>

<style scoped>
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #2b3b49;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #555555;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 10px;
}
</style>