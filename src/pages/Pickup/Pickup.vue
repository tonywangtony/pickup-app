<template>
  <v-container fluid>
    <v-row no-gutters class="mb-2 mt-2">
      <v-row no-gutters>
        <v-btn class="mr-5" small @click="start">Start</v-btn>
        <v-btn small @click="finish">Finish</v-btn>
      </v-row>
    </v-row>
    <v-tabs class="mt-1">
      <v-tab>Pending(X)</v-tab>
      <v-tab>Completed(X)</v-tab>
      <v-tab>All(X)</v-tab>
    </v-tabs>
    <!-- tables -->
    <v-data-table :headers="headers" :items="desserts" item-key="index" hide-default-footer>
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="(item, key) in items" :key="item.key">
            <td>
              <v-checkbox readonly v-model="isFalse"></v-checkbox>
            </td>
            <td>{{ key + 1 }}</td>
            <td>{{ item.driverName }}</td>
            <td>{{ item.stops }}</td>
            <td @click="item.bg1 = !item.bg1" :class="{error:item.bg1}">{{ item.item0 }}</td>
            <td @click="item.bg2 = !item.bg2" :class="{error:item.bg2}">{{ item.item1 }}</td>
            <td @click="item.bg3 = !item.bg3" :class="{error:item.bg3}">{{ item.item2 }}</td>
            <td @click="item.bg4 = !item.bg4" :class="{error:item.bg4}">{{ item.item3 }}</td>
          </tr>
          <tr>
            <th colspan="4">Subtotal</th>
            <th>X</th>
            <th>X</th>
            <th>X</th>
            <th>X</th>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "Pickup",
  components: {},
  created: function() {
    if (this.$route.params.selected !== undefined) {
      this.$store.state.products.assigns.forEach(product => {
        if (this.$route.params.selected.includes(product.id)) {
          this.products.push(product);
        }
      });
    }
  },
  data() {
    return {
      products: [],
      selectd: [],
      isFalse: false
    };
  },
  methods: {
    start() {
      //
    },
    finish() {
      //
    }
  },
  computed: {
    headers() {
      let baseHeaders = [
        { text: "", value: null, sortable: false, width: 20 },
        { text: "Index", value: null, sortable: false, width: 20 },
        { text: "Driver", value: "driverName", width: 20 },
        { text: "Stops", value: "stops", width: 20 }
      ];
      this.products.forEach((product, key) => {
        baseHeaders.push({
          text: product.name,
          value: "item" + key,
          width: 100
        });
      });
      for (let index = this.products.length; index <= 3; index++) {
        baseHeaders.push({
          text: "",
          value: "item" + index,
          sortable: false,
          width: 20
        });
      }
      return baseHeaders;
    },
    desserts() {
      let todos = [];
      this.products.forEach((product, key) => {
        product.drivers.forEach((driver, driverKey) => {
          const itemKey = "item" + key;
          let tempData = new Object();
          tempData.key = `${key}-${driverKey}`;
          tempData.id = product.id;
          tempData.driverName = driver.name;
          tempData.stops = driver.stop;
          tempData[itemKey] = driver.qty;
          tempData.bg1 = false;
          tempData.bg2 = false;
          tempData.bg3 = false;
          tempData.bg4 = false;
          todos.push(tempData);
        });
      });
      console.log(todos);

      return todos;
    }
  }
};
</script>
