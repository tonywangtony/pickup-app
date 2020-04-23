<template>
  <v-container fluid>
    <v-row justify="start">
      <v-btn
        small
        color="primary"
        class="ml-2"
        @click="staffSheet = true"
        :disabled="activeTab !== 1"
      >
        <v-icon left small>fas fa-long-arrow-alt-right</v-icon> Assign
      </v-btn>
      <v-btn
        small
        color="primary"
        class="ml-2"
        @click="unassign"
        :disabled="activeTab !== 2"
      >
        <v-icon left small>fas fa-long-arrow-alt-right</v-icon> Unassign
      </v-btn>
    </v-row>
    <v-row>
      <v-col>
        <v-select :items="types1" label="Type 1" item-text="name"></v-select>
      </v-col>
      <v-col>
        <v-select :items="types2" label="Type 2"></v-select>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col>
        <v-tabs class="mt-1" dense>
          <v-tab @click="switchTab(1)">Pending({{ pendingCount }})</v-tab>
          <v-tab @click="switchTab(2)">Assigned({{ assignedCount }})</v-tab>
          <v-tab @click="switchTab(3)">Completed({{ completedCount }})</v-tab>
          <v-tab @click="switchTab(4)">All({{ allCount }})</v-tab>
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
    <Pending
      ref="pending"
      v-if="activeTab == 1"
      v-model="search"
      @onShowPo="onShowPo"
    ></Pending>
    <Assigned ref="assigned" v-if="activeTab == 2" v-model="search"></Assigned>
    <Completed v-if="activeTab == 3" v-model="search"></Completed>
    <All v-if="activeTab == 4" v-model="search"></All>
    <!-- po sheet -->
    <v-bottom-sheet v-model="poSheet">
      <v-sheet class="text-center" height="100px">
        <div class="py-3">
          <p>PO: 5000000001</p>
          <p>ON-hand: 521.00</p>
        </div>
      </v-sheet>
    </v-bottom-sheet>
    <!-- staff sheet -->
    <v-bottom-sheet v-model="staffSheet">
      <v-sheet class="text-center" height="600px">
        <v-row justify="start" class="ml-2 pt-2">
          <v-col sm="10">
            <v-select :items="staffs" value="TOM.L" solo></v-select>
          </v-col>
          <v-col sm="2">
            <v-btn color="success" @click="assign">
              Done
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import Pending from "./Pending";
import Assigned from "./Assigned";
import Completed from "./Completed";
import All from "./All";

export default {
  name: "Assgin",
  components: {
    Pending,
    Assigned,
    Completed,
    All,
  },
  data() {
    return {
      activeTab: 1,
      staffSheet: false,
      poSheet: false,
      search: "",
      staffs: ["TOM.L"],
    };
  },
  methods: {
    switchTab(id) {
      this.activeTab = id;
      this.search = "";
    },
    onShowPo(data) {
      console.log(data);
      this.poSheet = true;
    },
    assign() {
      this.staffSheet = false;
      this.$refs.pending.assign("TOM.L");
    },
    unassign() {
      this.$refs.assigned.unassign();
    },
  },
  computed: {
    types1() {
      return this.$store.state.productType.types1;
    },
    types2() {
      return this.$store.state.productType.types2;
    },
    pendingCount() {
      return this.$store.state.products.all.filter(
        (product) => product.assignee == ""
      ).length;
    },
    assignedCount() {
      return this.$store.state.products.all.filter(
        (product) => product.assignee !== ""
      ).length;
    },
    completedCount() {
      return this.$store.state.products.all.filter(
        (product) => product.status === 2
      ).length;
    },
    allCount() {
      return this.$store.state.products.all.length;
    },
  },
};
</script>
