const state = {
  all: [
    {
      index: "1",
      id: "10010385",
      name: "Game Hen·Patti·0824 <24oz>·24HD·白皮童子雞",
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
      name: "Whole Young Chix·PG·112939·CW·細雞仔",
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
      name: "Chix Bone Frames·Pitman·60019·#40·雞胸骨",
      um: "PC",
      subtotal: 2,
      assignee: "",
      todayPo: "",
      onhand: "",
      status: 0,
      items: [{ driverName: "1200CCC", stops: 13, qty: "2" }],
    },
    {
      index: "4",
      id: "10010114PC",
      name: "PC-Breast Mt·Mountaire·25630·#10·雞胸肉",
      um: "PC",
      subtotal: 12,
      assignee: "",
      todayPo: "",
      onhand: "",
      status: 0,
      items: [{ driverName: "1200DDD", stops: 4, qty: "12" }],
    },
    {
      index: "5",
      id: "10011295",
      name: "Thighs (B/In)·Perdue·623·#40·帶骨上脾",
      um: "PC",
      subtotal: 17,
      assignee: "",
      todayPo: "",
      onhand: "",
      status: 0,
      items: [{ driverName: "1200EEE", stops: 3, qty: "17" }],
    },
    {
      index: "6",
      id: "10011595PC",
      name: "PC-Thighs (B/In)·S&J··(#4.5-5)·帶骨上脾",
      um: "PC",
      subtotal: 15,
      assignee: "",
      todayPo: "",
      onhand: "",
      status: 0,
      items: [{ driverName: "1200FFF", stops: 1, qty: "15" }],
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
