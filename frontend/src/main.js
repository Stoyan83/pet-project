import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/stylesheets/main.css";
import axios from "axios";

const authToken = sessionStorage.getItem("auth_token");

// Load JWT from Local Storage on Refresh
if (authToken) {
  store.dispatch("loginUserWithToken", { auth_token: authToken });
}

// Authorizing axios requests when User logged in
if (authToken) {
  axios.defaults.headers.common["Authorization"] = authToken;
  axios.defaults.headers.common["Accept"] = "application/json";
}


createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
