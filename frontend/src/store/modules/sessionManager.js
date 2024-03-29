import axios from "axios";
import router from "@/router";
import { handleAuthToken } from "../util/handleAuth"

const BASE_URL = "http://localhost:3000/";

const state = {
  auth_token: null,
  user: {
    id: null,
    username: null,
    email: null,
    avatar: null,
  },
  users: [],
  error: null,
  successMessage: null,
};

const getters = {
  getAuthToken: state => state.auth_token,

  getUserEmail: state => state.user?.email,

  getUserID: state => state.user?.id,

  isLoggedIn: state => !!state.auth_token,

  getUsers: state => state.users,

  getError: state => state.error,

  getUserAvatar: state => state.user?.avatar,

  getSuccessMessage: state => state.successMessage,
};



const actions = {
  async registerUser({ commit }, payload) {
    try {
      const response = await axios.post(`${BASE_URL}users`, payload);
      commit("setUserInfo", response);
      if (response.status == 200) {
        router.push("/");
      }
      handleAuthToken(commit);
      return response;
    } catch (error) {
      console.log(error.response.data);
      commit("setError", error.response.data.error);
    }
  },

  async loginUser({ commit }, payload) {
    try {
      const response = await axios.post(`${BASE_URL}users/sign_in`, payload);
      commit("setUserInfo", response);
      if (response.status == 200) {
        router.push("/");
      }
      handleAuthToken(commit);
      return response;

    } catch (error) {
      console.log(error.response.data);
      commit("setError", error.response.data);
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
      router.push("/");
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
      handleAuthToken(commit);
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
      console.log(error.response.data);
    }
  },

  async fetchUserAvatar({ commit }) {
    try {
      const response = await axios.get(`${BASE_URL}user/avatar`);
      commit("setUserAvatar", response.data.image_url);
    } catch (error) {
      console.log(error.response.data);
    }
  },

  async changePassword({ commit }, passwordParams) {
    try {
      const response = await axios.put(`${BASE_URL}users/change_password`, { user: passwordParams });
      commit('setSuccessMessage', response.data.message);
    } catch (error) {
      commit("setError", error.response.data.errors);
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

  setError(state, data) {
    state.error = data;
  },

  setUserAvatar(state, avatarUrl) {
    state.user.avatar = avatarUrl;
  },

  setSuccessMessage(state, message) {
    state.successMessage = message
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
