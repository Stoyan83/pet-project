import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/stylesheets/main.css";
import axios from "axios";


//  Load JWT from Local Storage on Refresh.
let localAuthToken = sessionStorage.auth_token;
let cookieExists = localAuthToken !== "undefined" && localAuthToken !== null;
if (cookieExists) {
  const auth_token = sessionStorage.getItem("auth_token");
  const authTokenExists = auth_token !== "undefined" && auth_token !== null;
  if (authTokenExists) {
    store.dispatch("loginUserWithToken", { auth_token });
  }
}

// Authorizing axios requests when User logged in
let token = sessionStorage.getItem("auth_token");
axios.defaults.headers.common["Authorization"] = token;
axios.defaults.headers.common["Accept"] = "application/json";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
