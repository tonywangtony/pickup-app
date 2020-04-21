<template>
  <v-container fluid>
    <v-list flat subheader>
      <v-subheader>
        <div class="subtitle-1">Type 1</div>
        <v-btn small color="primary" class="ml-5" @click="selectAll()">
          Select all
        </v-btn>
        <v-btn small color="primary" class="ml-5" @click="cancelAll()">
          Cancel all
        </v-btn>
      </v-subheader>
      <v-list-item-group multiple>
        <v-list-item v-for="type in types" v-bind:key="type.id">
          <template>
            <v-list-item-action>
              <v-checkbox v-model="typeSelected" :value="type.id"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="type.name"></v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-list flat subheader>
      <v-subheader>
        <div class="subtitle-1">Rounds</div>
      </v-subheader>
      <v-list-item-group multiple>
        <v-radio-group>
          <v-list-item v-for="round in rounds" v-bind:key="round.id">
            <template>
              <v-list-item-action>
                <v-radio></v-radio>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="round.name"></v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-radio-group>
      </v-list-item-group>
    </v-list>
    <v-btn color="primary" block @click="load()">Load</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "AssginFilter",
  data() {
    return {
      types: [
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
      typeSelected: [],
      rounds: [
        { id: 1, name: "Round #1" },
        { id: 2, name: "Round #2" },
        { id: 3, name: "Round #3" },
        { id: 4, name: "Round #4" },
      ],
    };
  },
  methods: {
    selectAll() {
      this.typeSelected = [];
      this.types.forEach((type) => {
        this.typeSelected.push(type.id);
      });
    },
    cancelAll() {
      this.typeSelected = [];
    },
    load() {
      this.$router.push({ path: "/assgin" });
    },
  },
};
</script>
