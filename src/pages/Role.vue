<template>
  <v-container fluid>
    <v-row justify="end" class="mr-5 mt-1">
      <v-btn small @click="gotoWarehouse">Warehouse Setting</v-btn>
    </v-row>
    <v-row align="center" justify="center" style="height: 400px;">
      <v-card class="ma-3 pa-6" outlined @click="gotoAssginFilterPage">
        <v-img src="../assets/order.png" height="128" width="128"></v-img>
        <v-card-text align="center">
          <div class="font-weight-black">Yamimeal NO.2</div>
          <div class="font-weight-black">Double Check</div>
        </v-card-text>
      </v-card>
      <v-card class="ma-3 pa-6" outlined @click="gotoPickupPage">
        <v-img src="../assets/shop.png" height="128" width="128"></v-img>
        <v-card-text align="center">
          <div class="font-weight-black">Yamimeal NO.3</div>
          <div class="font-weight-black" style="color:#fff">-</div>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Warehouse",
  methods: {
    gotoAssginFilterPage() {
      this.$router.push({ path: "/assginFilter" });
    },
    gotoPickupPage() {
      this.$router.push({ path: "/pickup" });
    },
    gotoWarehouse() {
      this.$router.push({ path: "/warehouse" });
    },
  },
};
</script>
