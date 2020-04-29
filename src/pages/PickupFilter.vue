<template>
  <v-container fluid>
    <v-card-text>
      <v-autocomplete
        :items="products"
        v-model="selected"
        multiple
        label="Product"
        placeholder="Plase select product number"
        item-text="text"
        item-value="id"
        chips
        outlined
        clearable
        @change="change"
      ></v-autocomplete>
    </v-card-text>
    <v-row class="pt-1">
      <!-- <v-col>
        <v-btn color="primary" :disabled="selected.length == 0" block @click="view()">View</v-btn>
      </v-col> -->
      <v-col>
        <v-btn color="primary" :disabled="selected.length == 0" block @click="viewAndStart()">View and Start</v-btn>
      </v-col>
    </v-row>
    <!-- alert -->
    <v-snackbar v-model="snackbar" :timeout="5000" :top="true" color="error">
      最多只能选择四个物料！
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "PickupFilter",
  data() {
    return {
      selected: [],
      snackbar: false,
    };
  },
  methods: {
    view() {
      this.$router.push({ name: "pickup", params: { selected: this.selected, isStart: false } });
    },
    viewAndStart() {
      this.$router.push({ name: "pickup", params: { selected: this.selected, isStart: true } });
    },
    change() {
      if (this.selected.length > 4) {
        this.selected.pop();
        this.snackbar = true;
      }
    },
  },
  computed: {
    products() {
      let products = this.$store.state.products.assigns.filter((item) => item.status === 1);
      products.map((product) => {
        product.text = `${product.id} - ${product.name}`;
        return product;
      });
      return products;
    },
  },
};
</script>
