<template>
  <v-container fluid>
    <v-row justify="start">
      <v-btn small color="primary" class="ml-2" @click="staffSheet = true">
        <v-icon left small>fas fa-long-arrow-alt-right</v-icon> Assign
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
          <v-tab @click="activeTab = 1;search = ''">Pending(6)</v-tab>
          <v-tab @click="activeTab = 2;search = ''">Assigned(3)</v-tab>
          <v-tab @click="activeTab = 3;search = ''">Completed(1)</v-tab>
          <v-tab @click="activeTab = 4;search = ''">All(10)</v-tab>
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
      v-if="activeTab == 1"
      @showPoSheet="poSheet = true"
      v-model="search"
    ></Pending>
    <Assigned
      v-if="activeTab == 2"
      @showPoSheet="poSheet = true"
      v-model="search"
    ></Assigned>
    <Completed
      v-if="activeTab == 3"
      @showPoSheet="poSheet = true"
      v-model="search"
    ></Completed>
    <All
      v-if="activeTab == 4"
      @showPoSheet="poSheet = true"
      v-model="search"
    ></All>
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
            <v-select :items="staffs" solo></v-select>
          </v-col>
          <v-col sm="2">
            <v-btn color="success" @click="staffSheet = false">
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
      staffs: [
        "Bui, Du Ngoc",
        "Cruz, Eduardo Silva",
        "Lee, Silvendiana",
        "Wang, Tong Fa",
        "Gallardo, Manuel Ramon",
        "Qi, Yushan",
        "Wu, Liangui",
        "Mijares, Mike",
        "Chen, Xiangyang",
        "Yang, Ming",
      ],
    };
  },
  methods: {
    //
  },
};
</script>
