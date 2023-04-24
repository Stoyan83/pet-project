import axios from "axios";
import router from "@/router";

const API_URL = "http://localhost:3000/api/v1/teams";

const state = {
  teams: [],
  team: null,
};

const getters = {
  allTeams: (state) => state.teams,
  getTeam: (state) => state.team,
  getTeamId: (state) => state.teams[0].id
};

const actions = {
  async fetchTeams({ commit }) {
    try {
      const response = await axios.get(`${API_URL}`);
      commit("setTeams", response.data);
    } catch(e) {
      console.error(e.response.data)
    }
  },
  async fetchTeam({ commit }, id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      commit("setTeam", response.data);
    } catch(e) {
      console.error(e.response.data.status)
      if(e.response.data.status == 404) {
        router.back()
      }
    }
  },
};

const mutations = {
  setTeams: (state, teams) => (state.teams = teams),
  setTeam: (state, team) => (state.team = team),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
