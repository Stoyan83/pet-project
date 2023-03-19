import { createStore } from 'vuex'
import sessionManager from "@/store/modules/sessionManager";
import projectManager from "@/store/modules/projectManager";

export default createStore({
  modules: {
    sessionManager,
    projectManager
  }
})
