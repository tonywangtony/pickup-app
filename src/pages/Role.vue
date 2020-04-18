<template>
  <v-container fluid>
    <v-row align="center" justify="center" style="height: 300px;">
      <v-card class="ma-3 pa-6" outlined @click="gotoAssginFilterPage">
        <v-img src="../assets/order.png" height="128" width="128"></v-img>
        <v-card-text align="center">
          <div class="font-weight-black">B rule</div>
        </v-card-text>
      </v-card>
      <v-card class="ma-3 pa-6" outlined @click="gotoPickupPage">
        <v-img src="../assets/shop.png" height="128" width="128"></v-img>
        <v-card-text align="center">
          <div class="font-weight-black">C Rule</div>
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
  },
};
</script>
