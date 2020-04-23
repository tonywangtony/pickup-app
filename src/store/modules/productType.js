const state = {
  types1: [
    { id: 0, name: "All" },
    { id: 1, name: "101 FROZEN-CHICKEN" },
    { id: 2, name: "102 FROZEN-BEEF/PORK" },
    { id: 3, name: "103 FROZEN-SHRIMP/SEAFOOD/OTHER" },
    { id: 4, name: "104 PC-MEAT/FROZEN_DRY_GOODS" },
    { id: 5, name: "105 FRESH-MEAT/FRESH-DRY" },
    { id: 6, name: "106 GENERAL_DRY_GOODS/PC-DRY_GOODS" },
    { id: 7, name: "107 VEGETABLE" },
    { id: 8, name: "108 PC-VEGETABLE" },
    { id: 9, name: "NOM Do Not Match" },
  ],
  types2: [
    "All",
    "A 硬身和有庫存",
    "B 硬身和需要打包",
    "C 軟身和有庫存",
    "D 軟身和需要打包",
  ],
};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
