import { createStore } from 'vuex'
import sessionManager from "@/store/modules/sessionManager";
import projectManager from "@/store/modules/projectManager";
import teamManager from "@/store/modules/teamManager";


export default createStore({
  modules: {
    sessionManager,
    projectManager,
    teamManager
  }
})
