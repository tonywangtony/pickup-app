<template>
  <v-container fluid>
    <v-row justify="start">
      <v-btn small color="primary" class="ml-2" @click="assign()" :disabled="activeTab !== 1">Assign</v-btn>
      <v-btn small color="primary" class="ml-2" @click="unassign()" :disabled="activeTab !== 2">Unassign</v-btn>
    </v-row>
    <v-row>
      <v-col>
        <v-select :items="types1" label="Type 1" item-text="name"></v-select>
      </v-col>
      <v-col>
        <v-select :items="types2" label="Type 2"></v-select>
      </v-col>
    </v-row>
    <!-- tabs -->
    <v-row align="center">
      <v-col>
        <v-tabs class="mt-1" dense>
          <v-tab @click="switchTab(1)">Pending({{ pending.length }}) </v-tab>
          <v-tab @click="switchTab(2)">Assigned({{ assigned.length }})</v-tab>
          <v-tab @click="switchTab(3)">Completed({{ completed.length }})</v-tab>
          <v-tab @click="switchTab(4)">All({{ all.length }})</v-tab>
        </v-tabs>
      </v-col>
      <v-col>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- tables -->
    <v-data-table :headers="headers" :items="items" :search="search" hide-default-footer>
      <template v-slot:item.checkbox="{ item }">
        <v-checkbox v-model="selected" :value="item.id"></v-checkbox>
      </template>
    </v-data-table>
    <!-- alert -->
    <v-snackbar v-model="snackbar" :timeout="5000" :top="true" color="error">
      物料已进行执货，无法取消分配，请线下沟通！
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "Assgin",
  components: {},
  data() {
    return {
      activeTab: 1,
      search: "",
      selected: [],
      snackbar: false,
    };
  },
  methods: {
    switchTab(id) {
      this.activeTab = id;
      this.search = "";
      this.selected = [];
    },
    assign() {
      this.$store.commit("products/assign", this.selected);
    },
    unassign() {
      let checkRes = true;
      this.$store.state.products.assigns.forEach((item) => {
        if (this.selected.includes(item.id) && item.assignee !== "") checkRes = false;
      });
      if (checkRes) {
        this.$store.commit("products/unassign", this.selected);
      } else {
        this.snackbar = true;
      }
    },
  },
  computed: {
    types1() {
      return this.$store.state.productType.types1;
    },
    types2() {
      return this.$store.state.productType.types2;
    },
    pending() {
      return this.$store.state.products.assigns.filter((item) => item.status === 0);
    },
    assigned() {
      return this.$store.state.products.assigns
        .filter((item) => item.status === 1 || item.status === 2)
        .map((item) => {
          let doneTotal = 0;
          item.drivers.forEach((driver) => {
            if (driver.status === 1) {
              doneTotal = doneTotal + driver.qty;
            }
          });
          item.subtotal2 = `${doneTotal}/${item.subtotal}`;
          return item;
        });
    },
    completed() {
      return this.$store.state.products.assigns.filter((item) => item.status === 3);
    },
    all() {
      return this.$store.state.products.assigns;
    },
    items() {
      switch (this.activeTab) {
        case 1:
          return this.pending;
        case 2:
          return this.assigned;
        case 3:
          return this.completed;
        case 4:
          return this.all;
        default:
          return [];
      }
    },
    headers() {
      switch (this.activeTab) {
        case 1:
          return [
            { text: "", value: "checkbox", sortable: false },
            { text: "Index", value: "index", hide: true },
            { text: "Item", value: "id" },
            { text: "Description", value: "name" },
            { text: "U/M", value: "um" },
            { text: "Subtotal", value: "subtotal" },
          ];
        case 2:
          return [
            { text: "", value: "checkbox", sortable: false },
            { text: "Index", value: "index", hide: true },
            { text: "Item", value: "id" },
            { text: "Description", value: "name" },
            { text: "U/M", value: "um" },
            { text: "Subtotal", value: "subtotal2" },
            { text: "Assignee", value: "assignee" },
          ];
        case 3:
          return [
            { text: "Index", value: "index", hide: true },
            { text: "Item", value: "id" },
            { text: "Description", value: "name" },
            { text: "U/M", value: "um" },
            { text: "Subtotal", value: "subtotal" },
            { text: "Assignee", value: "assignee" },
          ];
        case 4:
          return [
            { text: "Index", value: "index", hide: true },
            { text: "Item", value: "id" },
            { text: "Description", value: "name" },
            { text: "U/M", value: "um" },
            { text: "Subtotal", value: "subtotal" },
            { text: "Assignee", value: "assignee" },
          ];
        default:
          return [];
      }
    },
  },
};
</script>
