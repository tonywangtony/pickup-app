const state = {
  todos: [],
  ing: false,
};

// getters
const getters = {};

// actions
const actions = {
  done({ state, commit }) {
    let done = true;
    state.todos.forEach((todo) => {
      if (todo.status !== 3) done = false;
    });
    if (done == false) {
      alert("还有工作还没完成");
      return;
    }
    commit("empty");
    commit("setIngFalse");
  },
};

// mutations
const mutations = {
  add(state, data) {
    state.todos.push(data);
    state.ing = true;
  },
  done(state, data) {
    state.todos.map((todo) => {
      if (todo.id == data.id) {
        todo.status = 3;
      }
      return todo;
    });
  },
  empty(state) {
    state.todos = [];
  },
  setIngFalse(state) {
    state.ing = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
