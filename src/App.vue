<template>
  <v-app>
    <v-app-bar app color="primary" dark dense>
      <v-btn icon @click="gotoHome()">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title>Bui, Du Ngoc (Y1P000510)</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
    };
  },
  name: "App",
  methods: {
    gotoHome() {
      this.$router.push({ path: "/Role" });
    },
  },
};
</script>
