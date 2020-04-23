<template>
  <v-container fluid>
    <v-row no-gutters class="mb-2 mt-2">
      <v-row no-gutters>
        <v-btn class="mr-5" small @click="start">Start</v-btn>
        <v-btn small @click="finish">Finish</v-btn>
      </v-row>
      <v-row no-gutters justify="end">
        <span class="mr-5">Item: 0/x</span>
        <span>Driver: 0/x</span>
      </v-row>
    </v-row>
    <v-tabs class="mt-1">
      <v-tab @click="switchTab(1)">Pending({{ pendingCount }})</v-tab>
      <v-tab @click="switchTab(2)">Completed({{ completedCount }})</v-tab>
      <v-tab @click="switchTab(3)">All({{ allCount }})</v-tab>
    </v-tabs>
    <v-row no-gutters class="mb-2">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-row>
    <!-- tables -->
    <Pending v-if="activeTab == 1" v-model="search"></Pending>
    <Completed v-if="activeTab == 2" v-model="search"></Completed>
    <All v-if="activeTab == 3" v-model="search"></All>
  </v-container>
</template>

<script>
import Pending from "./Pending";
import Completed from "./Completed";
import All from "./All";

export default {
  name: "Pickup",
  components: {
    Pending,
    Completed,
    All,
  },
  data() {
    return {
      activeTab: 1,
      search: "",
    };
  },
  methods: {
    switchTab(id) {
      this.activeTab = id;
      this.search = "";
    },
    start() {
      this.$store.dispatch("products/inProgress");
    },
    finish() {
      this.$store.dispatch("user/done");
    },
  },
  computed: {
    pendingCount() {
      return this.$store.state.user.todos.filter(
        (product) => product.status === 2
      ).length;
    },
    completedCount() {
      return this.$store.state.user.todos.filter(
        (product) => product.status === 3
      ).length;
    },
    allCount() {
      return this.$store.state.user.todos.length;
    },
  },
};
</script>
