import axios from "axios";
import router from "@/router";

const API_URL = "http://localhost:3000/api/v1/tasks";
const API_URL_PROJECTS = "http://localhost:3000/api/v1/projects"

const state = {
  tasks: [],
  task: null,
};

const getters = {
  allTasks: (state) => state.tasks,
  getTask: (state) => state.task,
};

const actions = {

  async fetchTasks({ commit }, id) {
    try {
    const response = await axios.get(`${API_URL_PROJECTS}/${id}/project_tasks`);
    commit("setTasks", response.data);
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

  async addTask({ commit }, task) {
    try {
    const response = await axios.post(`${API_URL}`,
      {
        status: task.status,
        description: task.description,
        team_id: task.team_id,
        user_id: task.user_id,
        assignee_id: task.asignee_id,
        project_id: task.project_id,
      }
    );
    commit("newTask", response.date);
    router.replace({'query': null})
    } catch(e) {
      console.error(e.response.data)
    }
  },



  async deleteTask({ commit }, id) {
    try {
    await axios.delete(`${API_URL}/${id}`);
    commit("removeTask", id);
    } catch(e) {
      console.error(e.response.data.status)
    }
  },

  async updateTask({ commit }, updatedTask) {
    try {
    await axios.put(
      API_URL + `/${updatedTask.id}`,
      updatedTask
    );
    commit("setUpdatedTask", updatedTask);
  }  catch(e) {
    console.error(e.response.data.status)
  }

  },
};

const mutations = {
  setTasks: (state, tasks) => (state.tasks = tasks),
  setTask: (state, task) => (state.task = task),
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
      state.tasks.splice(index, 1, updatedTask);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
