import axios from "axios";
import router from "@/router";

const BASE_URL = "http://localhost:3000/";

const state = {
  auth_token: null,
  user: {
    id: null,
    username: null,
    email: null,
    role: null,
    error: null,
  },
  users: [],
};

const getters = {
  getAuthToken: state => state.auth_token,

  getUserEmail: state => state.user?.email,

  getUserID: state => state.user?.id,

  isLoggedIn: state => !!state.auth_token,

  getUsers: state => state.users,

  getError: state => state.error,
};

const actions = {
  async registerUser({ commit }, payload) {
    try {
      const response = await axios.post(`${BASE_URL}users`, payload);
      commit("setUserInfo", response);
      if (response.status == 200) {
        router.push("/");
      }
      return response;
    } catch (error) {
      commit("error", error);
    }
  },

  async loginUser({ commit }, payload) {
    try {
      const response = await axios.post(`${BASE_URL}users/sign_in`, payload);
      commit("setUserInfo", response);
      if (response.status == 200) {
        router.push("/");
      }
      return response;
    } catch (error) {
      console.log(error.response.data);
      commit("error", error.response.data);
      sessionStorage.removeItem("auth_token");
    }
  },

  async logoutUser({ commit, state }) {
    const config = {
      headers: {
        authorization: state.auth_token,
      },
    };
    try {
      await axios.delete(`${BASE_URL}users/sign_out`, config);
      commit("resetUserInfo");
      location.reload();
    } catch (error) {
      console.log(error);
    }
  },

  async loginUserWithToken({ commit }, payload) {
    const config = {
      headers: {
        Authorization: payload.auth_token,
      },
    };
    try {
      const response = await axios.get(`${BASE_URL}member-data`, config);
      commit("setUserInfoFromToken", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async fetchUsers({ commit }) {
    try {
      const response = await axios.get(`${BASE_URL}users`);
      commit("setUsers", response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  },
};

const mutations = {
  setUserInfo(state, data) {
    state.user = data.data.user;
    state.auth_token = data.headers.authorization;
    axios.defaults.headers.common["Authorization"] = data.headers.authorization;
    sessionStorage.setItem("auth_token", data.headers.authorization);
  },

  setUserInfoFromToken(state, data) {
    state.user = data.data.user;
    state.auth_token = sessionStorage.getItem("auth_token");
  },

  resetUserInfo(state) {
    state.user = {
      id: null,
      username: null,
      email: null,
    };
    state.auth_token = null;
    sessionStorage.removeItem("auth_token");
    axios.defaults.headers.common["Authorization"] = null;
  },

  setUsers(state, users) {
    state.users = users;
  },

  error(state, data) {
    state.error = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
