import Vue from "vue";
import VueRouter from "vue-router";
import Pickup from "../pages/Pickup/Pickup";
import Login from "../pages/Login";
import Assgin from "../pages/Assgin/Assgin";
import AssginFilter from "../pages/AssginFilter";
import Warehouse from "../pages/Warehouse";
import Role from "../pages/Role";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/warehouse",
      name: "Warehouse",
      component: Warehouse,
    },
    {
      path: "/role",
      name: "Role",
      component: Role,
    },
    {
      path: "/assginFilter",
      name: "B Role Filter",
      component: AssginFilter,
    },
    {
      path: "/assgin",
      name: "B Role",
      component: Assgin,
    },
    {
      path: "/pickup",
      name: "C Role",
      component: Pickup,
    },
  ],
});
