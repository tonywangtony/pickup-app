<template>
  <v-app>
    <v-app-bar app color="primary" dark :dense="true">
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn dark v-on="on">
            Menu
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="gotoPage('/')">
            <v-list-item-title>
              Home
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="menu in menus"
            v-bind:key="menu.name"
            @click="gotoPage(menu.path)"
          >
            <v-list-item-title>
              {{ menu.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import router from "./router";

export default {
  data() {
    return {
      menus: [],
    };
  },
  name: "App",
  created: function() {
    this.menus = router.options.routes;
  },
  methods: {
    gotoPage(page) {
      this.$router.push({ path: page });
    },
  },
};
</script>
