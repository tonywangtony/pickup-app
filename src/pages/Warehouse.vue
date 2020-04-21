<template>
  <v-container>
    <v-list flat subheader>
      <v-subheader>
        Plase choose warehouse
      </v-subheader>
      <v-list-item-group multiple>
        <v-list-item
          v-for="warehouse in warehouses"
          v-bind:key="warehouse.id"
          @click="setWarehouse()"
        >
          <v-list-item-avatar>
            <v-icon>fas fa-building</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="warehouse.name"></v-list-item-title>
            <v-list-item-subtitle
              v-text="warehouse.code"
            ></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">fas fa-angle-right</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: "Warehouse",
  data() {
    return {
      warehouses: [
        { id: 1, name: "Milpitas", code: "1200" },
        { id: 2, name: "Maywood", code: "1050" },
        { id: 3, name: "Stockton", code: "1400" },
        { id: 4, name: "Richmond", code: "1600" },
        { id: 5, name: "Portland", code: "1800" },
      ],
    };
  },
  methods: {
    setWarehouse() {
      this.$router.push({ path: "/Role" });
    },
  },
};
</script>
