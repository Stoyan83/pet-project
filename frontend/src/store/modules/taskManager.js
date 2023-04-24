import axios from "axios";
import router from "@/router";

const API_URL = "http://localhost:3000/api/v1/tasks";
const API_URL_PROJECT = "http://localhost:3000/api/v1/projects";

const state = {
  tasks: { data: [] },
  team_tasks: { data: [] },
  list_tasks: { data: [] },
  project_tasks: { data: [] },
  task: {
    id: null,
    status: null,
    description: null,
    team_id: null,
    assignee_id: null,
    project_id: null,
    position: null,
  },

  browseTask: null,
  error: null,
};

const getters = {
  allTasks: (state) => state.tasks,
  getTask: (state) => state.task,
  getTeamTasks: (state) => state.team_tasks,
  getProjectTasks: (state) => state.project_tasks,
  getBrowseTask: (state) => state.browseTask,
  getUpdatedTasks: (state) => state.list_tasks,
  getErrorTasks: (state) => state.error,
};

const actions = {
  async fetchTasks({ commit }) {
    try {
      const response = await axios.get(`${API_URL}`);
      commit("setTasks", response.data);
    } catch(e) {
      console.error(e.response.data)
    }
  },

  async fetchTeamTasks({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/team_tasks`);
      commit("setTeamTasks", response.data);
    } catch(e) {
      console.error(e.response.data)
      commit("setError", e.response.data.errors)
    }
  },

  async fetchProjectTasks({ commit }, id) {
    try {
      const response = await axios.get(`${API_URL_PROJECT}/${id}/project_tasks`);
      commit("setProjectTasks", response.data);
    } catch(e) {
      console.error(e.response.data)
    }
  },

  async fetchTask({ commit }, id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      commit("setTask", response.data);
    } catch(e) {
      console.error(e.response.data.status)
      if(e.response.data.status == 404) {
        router.back()
      }
    }
  },

  async fetchBrowseTask({ commit }, id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      commit("setBrowseTask", response.data);
    } catch(e) {
      console.error(e.response.data.status)
    }
  },

  async addTask({ commit }, task) {
    try {
      const response = await axios.post(`${API_URL}`, {
        status: task.status,
        description: task.description,
        team_id: task.team_id,
        assignee_id: task.assignee_id,
        project_id: task.project_id
      });
      commit("newTask", response.data);
      router.push('/api/v1/projects');
    } catch(e) {
      console.error(e.response.data)
    }
  },

  async deleteTask({ commit }, id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      commit("removeTask", id);
      router.push('/api/v1/projects');
    } catch(e) {
      console.error(e.response.data.status)
    }
  },

  async updateTask({ commit }, updatedTask) {
    try {
      await axios.patch(API_URL + `/${updatedTask.id}`, updatedTask);
      commit("setUpdatedTask", updatedTask);
    } catch(e) {
      console.error(e.response.data.status);
    }
  },

  async updateTasks({ commit }, updatedTasks) {
    try {
      const response = await axios.patch(`${API_URL}/update_tasks`, { tasks: updatedTasks });
      commit("setUpdatedListTasks", response.data);
    } catch(e) {
      console.error(e.response.data.status);
    }
  }
};

const mutations = {
  setTasks: (state, tasks) => (state.tasks = tasks),
  setTask: (state, task) => (state.task = task),
  setBrowseTask: (state, task) => (state.browseTask = task),
  setTeamTasks: (state, tasks) => (state.team_tasks = tasks),
  setProjectTasks: (state, tasks) => (state.project_tasks = tasks),
  newTask: (state, task) => (state.tasks.data.push(task)),
  removeTask (state, id ) {
    let index = state.tasks.data.findIndex(task => task.id == id);
    if (index !== -1) {
      state.tasks.data.splice(index, 1);
    }

    index = state.team_tasks.data.findIndex(task => task.id == id);
    if (index !== -1) {
      state.team_tasks.data.splice(index, 1);
    }
  },


  setUpdatedTask: (state, updatedTask) => {
    const index = state.tasks.data.findIndex(
      (task => task.id === updatedTask.id)
    );
    if (index !== -1) {
      state.tasks.data.splice(index, 1, updatedTask);
    }
  },

  setUpdatedListTasks: (state, updatedTasks) => {
    state.list_tasks.data = updatedTasks;
  },

  setError: (state, error) => (state.error = error),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
