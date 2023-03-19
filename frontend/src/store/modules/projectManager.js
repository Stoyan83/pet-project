import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/projects";

const state = {
  projects: [],
};

const getters = {
  allProjects: (state) => state.projects,
};

const actions = {
  async fetchProjects({ commit }) {
    const response = await axios.get(API_URL);
    commit("setProjects", response.data);
  },
  async addProject({ commit }, type, description) {
    const response = await axios.post(API_URL, {
      project: {
        type,
        description,
      },
    });
    commit("newProject", response.data);
  },
  async deleteProject({ commit }, id) {
    await axios.delete(API_URL + `/${id}`);
    commit("removeProject", id);
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
  newProject: (state, project) => state.projects.unshift(project),
  removeProject: (state, id) =>
    (state.projects = state.projects.filter((project) => project.id !== id)),
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


