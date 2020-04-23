import Vue from "vue";
import Vuex from "vuex";
import products from "./modules/products";
import productType from "./modules/productType";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products,
    productType,
    user,
  },
  strict: true,
});
