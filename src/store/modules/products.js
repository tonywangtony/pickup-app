const state = {
  all: [
    {
      index: "1",
      id: "10010385",
      name: "雞胸骨",
      um: "CS",
      subtotal: 6,
      assignee: "",
      todayPo: "",
      onhand: "",
      status: 0, // 0待分配 1已分配 2待完成 3已完成
      items: [{ driverName: "1200AAA", stops: 3, qty: "6" }],
    },
    {
      index: "2",
      id: "10010965",
      name: "高盒雞胸肉",
      um: "CS",
      subtotal: 13,
      assignee: "",
      todayPo: "50837289",
      onhand: "452.00",
      status: 0,
      items: [{ driverName: "1200BBB", stops: 4, qty: "13" }],
    },
    {
      index: "3",
      id: "10010026PC",
      name: "老雞",
      um: "PC",
      subtotal: 2,
      assignee: "",
      todayPo: "",
      onhand: "",
      status: 0,
      items: [{ driverName: "1200CCC", stops: 13, qty: "2" }],
    },
  ],
};

// getters
const getters = {};

// actions
const actions = {
  inProgress({ state, commit }) {
    state.all.map((item) => {
      if (item.status === 1) {
        commit("user/add", item, { root: true });
      }
    });
    commit("inProgress");
  },
  completed({ commit }, data) {
    commit("user/done", data, { root: true });
    commit("completed", data);
  },
};

// mutations
const mutations = {
  // 分配
  assign(state, data) {
    if (data.ids.length == 0) return;
    state.all.map((item) => {
      if (data.ids.includes(item.id)) {
        item.assignee = data.username;
        item.status = 1;
      }
      return item;
    });
  },
  // 取消分配
  unassign(state, data) {
    if (data.ids.length == 0) return;
    state.all.map((item) => {
      if (data.ids.includes(item.id) && item.status === 1) {
        item.assignee = "";
        item.status = 0;
      }
      return item;
    });
  },
  // 进行中
  inProgress(state) {
    state.all.map((item) => {
      if (item.status === 1) {
        item.status = 2;
      }
      return item;
    });
  },
  // 完成
  completed(state, data) {
    state.all.map((item) => {
      if (item.id === data.id) item.status = 3;
      return item;
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
