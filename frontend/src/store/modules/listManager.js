import axios from "axios";

const API_URL_PROJECTS = "http://localhost:3000/api/v1/projects"

const state = {
  lists: [],
  list: null,
};

const getters = {
  allLists: (state) => state.lists,
  getList: (state) => state.list,
};

const actions = {

  async fetchLists({ commit }, id) {
    try {
    const response = await axios.get(`${API_URL_PROJECTS}/${id}/lists`);
    commit("setLists", response.data);
    } catch(e) {
      console.error(e.response.data)
    }
  },
};

const mutations = {
  setLists: (state, lists) => (state.lists = lists),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
