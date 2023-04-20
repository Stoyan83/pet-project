export const state = {
  draggedTaskId: null,
};

export const getters = {
  getDraggedTaskId(state) {
    return state.draggedTaskId;
  },
};

export const actions = {
  setDraggedTaskId({ commit }, taskId) {
    commit('setDraggedTaskId', taskId);
  },
};

export const mutations = {
  setDraggedTaskId(state, taskId) {
    state.draggedTaskId = taskId;
  },
};


export default {
  state,
  getters,
  actions,
  mutations,
};
