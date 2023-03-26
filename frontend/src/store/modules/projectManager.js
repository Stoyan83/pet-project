import axios from "axios";
import router from "@/router";

const API_URL = "http://localhost:3000/api/v1/teams/";

const state = {
  projects: [],
  project: null,
  isDelete: false,
};

const getters = {
  allProjects: (state) => state.projects,
  getProject: (state) => state.project,
};

const actions = {
 
  async fetchProjects({ commit }, team_id) {
    try {
    const response = await axios.get(`${API_URL}${team_id}/projects`);
    commit("setProjects", response.data);
    } catch(e) {
      console.error(e.response.data)
    }
  }, 

  async fetchProject({ commit }, id) {
    try {
    const response = await axios.get(`${API_URL}:team_id/projects/${id}`);
    commit("setProject", response.data);
    } catch(e) {
      console.error(e.response.data.status)
      // if(e.response.data.status == 404) {
      //   router.back()
      // }
    }
  }, 

  async addProject({ commit }, project, team_id) {
    try {
    const response = await axios.post(`${API_URL}${team_id}/projects`, 
      {
        project_type: project.project_type,
        description: project.description,
        team_id: project.team_id,
      }
    );
    commit("newProject", response.date);
    router.replace({'query': null})
    } catch(e) {
      console.error(e.response.data)
    }
  },


  
  async deleteProject({ commit }, id) {
    try {
    await axios.delete(`${API_URL}:team_id/projects/${id}`);
    commit("removeProject", id);
    this.isDelete = true
    } catch(e) {
      console.error(e.response.data.status)
    }
  },

  async updateProject({ commit }, updatedProject) {
    const response = await axios.put(
      API_URL + `/${updatedProject.id}`,
      updatedProject
    );
    commit("setUpdatedProject", response.data);
  },
  
};

const mutations = {
  setProjects: (state, projects) => (state.projects = projects),
  setProject: (state, project) => (state.project = project),
  newProject: (state, project) => (state.projects.data.push(project)),
  removeProject (state, id ) {
    let index = state.projects.data.findIndex(project => project.id == id);
    state.projects.data.splice(index, 1)
  },
  setUpdatedProject: (state, updatedProject) => {
    const index = state.projects.findIndex(
      (project) => project.id === updatedProject.id
    );
    if (index !== -1) {
      state.projects.splice(index, 1, updatedProject);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};


