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
  getAuthToken(state) {
    return state.auth_token;
  },

  getUserEmail(state) {
    return state.user?.email;
  },

  getUserID(state) {
    return state.user?.id;
  },

  isLoggedIn(state) {
    const loggedOut =
      state.auth_token == null || state.auth_token == JSON.stringify(null);
    return !loggedOut;
  },

  getUsers: (state) => state.users,

  getError(state) {
    return state.error;
  },
};

const actions = {
  registerUser({ commit }, payload) {
    return new Promise((resolve) => {
      axios
        .post(`${BASE_URL}users`, payload)
        .then((response) => {
          commit("setUserInfo", response);
          resolve(response);
          if (response.status == 200) {
            router.push("/");
          }
        })
        .catch((error) => {
          commit("error", error);
        });
    });
  },

  loginUser({ commit }, payload) {
    new Promise((resolve) => {
      axios
        .post(`${BASE_URL}users/sign_in`, payload)
        .then((response) => {
          commit("setUserInfo", response);
          resolve(response);
          if (response.status == 200) {
            router.push("/");
          }
        })
        .catch((error) => {
          console.log(error.response.data)
          commit("error", error.response.data.error);
          sessionStorage.removeItem("auth_token")
        });
    });
  },

  logoutUser({ commit }) {
    const config = {
      headers: {
        authorization: state.auth_token,
      },
    };
    new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}users/sign_out`, config)
        .then(() => {
          commit("resetUserInfo");
          resolve();
          location.reload()
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  loginUserWithToken({ commit }, payload) {
    const config = {
      headers: {
        Authorization: payload.auth_token,
      },
    };
    new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}member-data`, config)
        .then((response) => {
          commit("setUserInfoFromToken", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async fetchUsers({ commit }) {
    try {
    const response = await axios.get(`${BASE_URL}users`);
    commit("setUsers", response.data);
    } catch(e) {
      console.error(e.response.data)
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

  setUsers: (state, users) => (state.users = users),

  error(state, data) {
    return (state.error = data);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
