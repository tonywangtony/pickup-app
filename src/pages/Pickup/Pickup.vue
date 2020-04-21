<template>
  <v-container fluid>
    <v-row class="ml-5">
      <span class="mr-10">Drivers: 3/8</span>
      <span class="mr-10">Items: 0/4</span>
    </v-row>
    <v-tabs class="mt-1">
      <v-tab @click="activeTab = 1;search=''">Pending(4)</v-tab>
      <v-tab @click="activeTab = 2;search=''">Completed(4)</v-tab>
      <v-tab @click="activeTab = 3;search=''">All(8)</v-tab>
    </v-tabs>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        dense
      ></v-text-field>
    </v-card-title>
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
      selected: [],
      search: "",
    };
  },
};
</script>
