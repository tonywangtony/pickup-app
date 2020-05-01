const state = {
  assigns: [
    {
      index: "1",
      id: "10010019PC",
      name: "PC-Roaster Paws·Perdue··(#10.5-#11)·鳳爪6129",
      um: "PC",
      subtotal: 3,
      onhand: 112,
      status: 0, // 0待分配 1已分配 2有问题 3已完成
      assignee: "",
      drivers: [
        { name: "1200HB", box: "#36", stop: 1, qty: 1, consignee: "Ling", status: 0 }, // 0未完成 1已完成 2有问题
        { name: "1200JI", box: "#22", stop: 2, qty: 2, consignee: "Lulu", status: 0 },
      ],
    },
    {
      index: "2",
      id: "10010026PC",
      name: "PC-Stewing Hen·BB··(#1.5-#2.2)1HD·老雞10010",
      um: "EA",
      subtotal: 14,
      onhand: 317,
      status: 0,
      assignee: "",
      drivers: [
        { name: "1200JI", box: "#20", stop: 1, qty: 2, consignee: "Monica Kwan978", status: 0 },
        { name: "1200JI", box: "#22", stop: 2, qty: 2, consignee: "Lulu", status: 0 },
        { name: "1200JI", box: "#31", stop: 3, qty: 2, consignee: "Ying Tang 108", status: 0 },
        { name: "1200SW", box: "#26", stop: 4, qty: 2, consignee: "Zhicheng Xu108", status: 0 },
        { name: "1200SW", box: "#40", stop: 5, qty: 4, consignee: "Jody Wang", status: 0 },
        { name: "1200TAA", box: "#6", stop: 6, qty: 2, consignee: "Guojin SHEN", status: 0 },
      ],
    },
    {
      index: "3",
      id: "10010040PC",
      name: "PC-Thighs (B/In)·Perdue·647·(#4-5)·帶骨上脾647/1647，(T/P), Chef Choice",
      um: "PC",
      subtotal: 3,
      onhand: 75,
      status: 0,
      assignee: "",
      drivers: [{ name: "1200HB", box: "#5", stop: 1, qty: 3, consignee: "May Guo", status: 0 }],
    },
    {
      index: "4",
      id: "10010114PC",
      name: "PC-Breast Mt·Mountaire·25630·#10·雞胸肉<BLUELABEL>,Butterflies",
      um: "PC",
      subtotal: 4,
      onhand: 125,
      status: 0,
      assignee: "",
      drivers: [
        { name: "1200HB", box: "#13", stop: 1, qty: 1, consignee: "Catherine+员工号108", status: 0 },
        { name: "1200HB", box: "#16", stop: 2, qty: 1, consignee: "Alisha Lu", status: 0 },
        { name: "1200RW", box: "#22", stop: 3, qty: 1, consignee: "Ivy 108", status: 0 },
        { name: "1200XL", box: "#33", stop: 4, qty: 1, consignee: "Jiayin Liang 157", status: 0 },
      ],
    },
    {
      index: "5",
      id: "10010164PC",
      name: "PC-Midjoint Wing·Agro·<IQF>·#10·雞中翼Agrosuper,(15%Solution,MJ Wing)",
      um: "PC",
      subtotal: 2,
      onhand: 47,
      status: 0,
      assignee: "",
      drivers: [
        { name: "1200JI", box: "#23", stop: 1, qty: 1, consignee: "Hongxia Tan157", status: 0 },
        { name: "1200XL", box: "#6", stop: 2, qty: 1, consignee: "5103586026", status: 0 },
      ],
    },
    {
      index: "6",
      id: "10010235PC",
      name: "PC-Game Hen·Patti·0824 <24oz>·1HD·白皮童子雞Patti Jean",
      um: "EA",
      subtotal: 6,
      onhand: 379,
      status: 0,
      assignee: "",
      drivers: [
        { name: "1200CH", box: "#17", stop: 1, qty: 3, consignee: "Qixu Chen", status: 0 },
        { name: "1200TAA", box: "#2", stop: 2, qty: 3, consignee: "Linda Li 157", status: 0 },
      ],
    },
  ],
  working: false,
};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  // 分配
  assign(state, ids) {
    state.assigns.map((item) => {
      if (ids.includes(item.id)) {
        item.status = 1;
      }
      return item;
    });
  },
  // 取消分配
  unassign(state, ids) {
    state.assigns.map((item) => {
      if (ids.includes(item.id)) {
        item.status = 0;
      }
      return item;
    });
  },
  // 开始
  start(state, ids) {
    state.assigns.map((item) => {
      if (ids.includes(item.id)) {
        item.assignee = "TOM.L";
      }
      return item;
    });
    state.working = true;
  },
  // 完成
  finish(state, params) {
    const completeds = params.completeds;
    const issues = params.issues;
    state.assigns.map((product) => {
      product.drivers.map((driver) => {
        completeds.forEach((item) => {
          if (item.productIds.includes(product.id) && item.stops === driver.stop) {
            driver.status = 1;
            product.status = 3;
          }
        });
        issues.forEach((item) => {
          if (item.productIds.includes(product.id) && item.stops === driver.stop) {
            driver.status = 2;
            product.status = 2;
          }
        });
        return driver;
      });
      return product;
    });
    state.working = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
