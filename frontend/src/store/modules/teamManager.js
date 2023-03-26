import axios from "axios";
import router from "@/router";

const API_URL = "http://localhost:3000/api/v1/teams";


const state = {
  teams: [],
  team: null,
  isDelete: false,
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

  async fetchTeam({ commit },id) {
    try {
    const response = await axios.get(`${API_URL}${id}`);
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
  // newProject: (state, project) => (state.projects.data.push(project)),
  // removeProject (state, id ) {
  //   let index = state.projects.data.findIndex(project => project.id == id);
  //   state.projects.data.splice(index, 1)
  // },
  // setUpdatedProject: (state, updatedProject) => {
  //   const index = state.projects.findIndex(
  //     (project) => project.id === updatedProject.id
  //   );
  //   if (index !== -1) {
  //     state.projects.splice(index, 1, updatedProject);
  //   }
  // },
};

export default {
  state,
  getters,
  actions,
  mutations,
};


