import axios from "axios";
import router from "@/router";
import jwt_decode from "jwt-decode";

const BASE_URL = "http://localhost:3000/";

const state = {
  auth_token: null,
  user: {
    id: null,
    username: null,
    email: null,
  },
  users: [],
  error: null,
};

const getters = {
  getAuthToken: state => state.auth_token,

  getUserEmail: state => state.user?.email,

  getUserID: state => state.user?.id,

  isLoggedIn: state => !!state.auth_token,

  getUsers: state => state.users,

  getError: state => state.error,
};

async function handleAuthToken(commit) {
  const authToken = sessionStorage.getItem("auth_token");
  if (authToken) {
    const decodedToken = jwt_decode(authToken);
    const expirationTime = decodedToken.exp;
    const timestampInMillis = expirationTime * 1000;
    const currentTimeInMillis = Date.now();
    const durationInMillis = timestampInMillis - currentTimeInMillis - 60000;
    let inactivityTimeout = 3000;
    let intervalId;

    if (durationInMillis > 0) {
      setTimeout(() => {
        console.log('Token expired.');
        commit('resetUserInfo');
        router.push("/");
      }, durationInMillis);

      const resetInactivityTimeout = () => {
        inactivityTimeout = 10000;
      }

      window.addEventListener('mousemove', resetInactivityTimeout);
      window.addEventListener('keypress', resetInactivityTimeout);
      window.addEventListener('scroll', resetInactivityTimeout);

      intervalId = setInterval(() => {
        if (inactivityTimeout > 0) {
          inactivityTimeout -= 1000;
          console.log(`Inactivity timeout: ${inactivityTimeout / 1000} seconds`);
        } else {
          commit('resetUserInfo');
          router.push("/");
          commit("setError", 'User inactive for 10 seconds.');
          clearInterval(intervalId);
        }
      }, 1000);
    }
  }
}

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
      commit("setError", error);
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

  setError(state, data) {
    state.error = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
