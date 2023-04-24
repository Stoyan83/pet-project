const state = {
  successMessage: ''
}

const mutations = {
  setSuccessMessage(state, message) {
    state.successMessage = message
  }
}

const actions = {
  setSuccessMessage({ commit }, message) {
    commit('setSuccessMessage', message)
    setTimeout(() => {
      commit('setSuccessMessage', '')
    }, 3000)
  },
  clearSuccessMessage({ commit }) {
    commit('setSuccessMessage', '')
  }
}

const getters = {
  successMessage: state => state.successMessage
}

export default {
  state,
  mutations,
  actions,
  getters
}
