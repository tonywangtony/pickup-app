<template>
  <v-container fluid>
    <!-- buttons -->
    <v-row no-gutters class="mb-2 mt-2">
      <v-row no-gutters>
        <!-- <v-btn class="mr-5" small @click="start">Start</v-btn> -->
        <v-btn small @click="finish">Finish</v-btn>
      </v-row>
    </v-row>
    <!-- tabs -->
    <v-tabs class="mt-1">
      <v-tab @click="switchTab(1)">Pending({{ tabSubtotal(1).length }})</v-tab>
      <v-tab @click="switchTab(2)">Completed({{ tabSubtotal(2).length }})</v-tab>
      <v-tab @click="switchTab(3)">All({{ tabSubtotal(3).length }})</v-tab>
    </v-tabs>
    <!-- tables -->
    <v-data-table :headers="headers" :items="desserts" item-key="key" hide-default-footer :items-per-page="100">
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.key" :class="{ error: item.checkbox }">
            <td v-if="activeTab === 1">
              <v-checkbox v-model="item.checkbox"></v-checkbox>
            </td>
            <td>{{ item.index }}</td>
            <td>{{ item.driverName }}</td>
            <td>{{ item.stops }}</td>
            <td
              v-for="header in itemHeaders"
              :key="header.name"
              @click="item[header.bgKey] = !item[header.bgKey]"
              :class="{ error: item[header.bgKey] && item[header.value] && activeTab === 1 }"
              style="text-align: center;"
            >
              {{ item[header.value] }}
            </td>
          </tr>
          <tr>
            <th :colspan="activeTab === 1 ? 4 : 3">Subtotal</th>
            <th v-for="(header, key) in itemHeaders" :key="header.name" style="text-align: center;">
              {{ itemSubtotal(key) }}
            </th>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <!-- alert -->
    <v-snackbar v-model="alert.show" :timeout="5000" :top="true" color="error">
      {{ alert.message }}
      <v-btn text @click="alert.show = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "Pickup",
  components: {},
  created: function() {
    if (this.$route.params.isStart) {
      this.start();
    }
  },
  data() {
    return {
      activeTab: 1,
      isFalse: false,
      selected: [],
      alert: {
        show: false,
        message: "",
      },
    };
  },
  methods: {
    switchTab(id) {
      this.activeTab = id;
    },
    start() {
      if (this.$store.state.products.working) return;
      this.$store.commit("products/start", this.$route.params.selected);
    },
    finish() {
      if (!this.$store.state.products.working) return;
      let checkRes = true;
      this.desserts.forEach((item) => {
        if (item.checkbox === false) checkRes = false;
      });
      if (checkRes) {
        this.$store.commit("products/finish");
      } else {
        this.message("勾选所有司机才能完成");
      }
    },
    message(message) {
      this.alert.message = message;
      this.alert.show = true;
    },
    getDetail(products) {
      let drivers = [];
      let serial = 1;
      products.forEach((product, key) => {
        product.drivers.forEach((driver) => {
          const keyName = `${driver.name}-${driver.stop}`;
          const itemKey = "item" + key;
          if (drivers[keyName] === undefined) {
            drivers[keyName] = new Object();
            drivers[keyName].index = serial;
            serial++;
          }
          drivers[keyName].key = `${product.id}-${driver.stop}`;
          drivers[keyName].driverName = driver.name;
          drivers[keyName].stops = driver.stop;
          drivers[keyName][itemKey] = driver.qty;
          drivers[keyName]["bg" + key] = false;
          drivers[keyName].checkbox = false;
        });
      });
      drivers = Object.values(drivers);

      return drivers;
    },
  },
  computed: {
    products() {
      switch (this.activeTab) {
        case 1:
          return this.pending;
        case 2:
          return this.completed;
        case 3:
          return this.all;
        default:
          return [];
      }
    },
    headers() {
      let baseHeaders = [
        { text: "Index", value: "index", width: 20 },
        { text: "Driver Name", value: "driverName", width: 20 },
        { text: "Stops", value: "stops", width: 20 },
      ];
      if (this.activeTab === 1) {
        baseHeaders.unshift({ text: "", value: null, sortable: false, width: 20 });
      }
      this.products.forEach((product, key) => {
        baseHeaders.push({
          text: product.name,
          value: "item" + key,
          bgKey: "bg" + key,
          width: 100,
        });
      });

      return baseHeaders;
    },
    itemHeaders() {
      return this.headers.filter((header) => {
        return header.value !== null && header.value.indexOf("item") !== -1;
      });
    },
    desserts() {
      return this.getDetail(this.products);
    },
    pending() {
      return this.$store.state.products.assigns.filter((item) => item.status === 1 && item.assignee === "TOM.L");
    },
    completed() {
      return this.$store.state.products.assigns.filter((item) => item.status === 2 && item.assignee === "TOM.L");
    },
    all() {
      return this.$store.state.products.assigns.filter((item) => item.assignee === "TOM.L");
    },
    tabSubtotal() {
      return function(value) {
        switch (value) {
          case 1:
            return this.getDetail(this.pending);
          case 2:
            return this.getDetail(this.completed);
          case 3:
            return this.getDetail(this.all);
          default:
            return [];
        }
      };
    },
    itemSubtotal() {
      return function(value) {
        let subtotal = 0;
        this.products.forEach((product, key) => {
          product.drivers.forEach((driver) => {
            if (key === value) {
              subtotal += driver.qty;
            }
          });
        });
        return subtotal;
      };
    },
  },
};
</script>
