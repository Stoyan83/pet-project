import axios from "axios";
import router from "@/router";

const API_URL = "http://localhost:3000/api/v1/tasks";
// const API_URL_PROJECTS = "http://localhost:3000/api/v1/projects"

const state = {
    tasks: { data: [] },
    team_tasks: { data: [] },
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
  };


const getters = {
  allTasks: (state) => state.tasks,
  getTask: (state) => state.task,
  getTeamTasks: (state) => state.team_tasks,
  getBrowseTask: (state) => state.browseTask,
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
    const response = await axios.post(`${API_URL}`,
      {
        status: task.status,
        description: task.description,
        team_id: task.team_id,
        assignee_id: task.assignee_id,
        project_id: task.project_id
      }
    );
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

  // async updateTask({ commit }, updatedTask) {
  //   try {
  //   await axios.put(
  //     API_URL + `/${updatedTask.id}`,
  //     updatedTask
  //   );
  //   commit("setUpdatedTask", updatedTask);
  // }  catch(e) {
  //   console.error(e.response.data.status)
  // }



  async updateTask({ commit }, updatedTask) {
    try {
      await axios.put(API_URL + `/${updatedTask.id}`, updatedTask);
      commit("setUpdatedTask", updatedTask);
    } catch(e) {
      console.error(e.response.data.status);
    }
  },
};

const mutations = {
  setTasks: (state, tasks) => (state.tasks = tasks),
  setTask: (state, task) => (state.task = task),
  setBrowseTask: (state, task) => (state.browseTask = task),
  setTeamTasks: (state, tasks) => (state.team_tasks = tasks),
  newTask: (state, task) => (state.tasks.data.push(task)),
  removeTask (state, id ) {
    let index = state.tasks.data.findIndex(task => task.id == id);
    state.tasks.data.splice(index, 1)
  },
  setUpdatedTask: (state, updatedTask) => {
    const index = state.tasks.data.findIndex(
      (task => task.id === updatedTask.id)
    );
    if (index !== -1) {
      state.tasks.data.splice(index, 1, updatedTask);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
