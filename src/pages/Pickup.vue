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
      <v-tab @click="switchTab(2)">Issue({{ tabSubtotal(2).length }})</v-tab>
      <v-tab @click="switchTab(3)">Completed({{ tabSubtotal(3).length }})</v-tab>
      <v-tab @click="switchTab(4)">All({{ tabSubtotal(4).length }})</v-tab>
    </v-tabs>
    <!-- tables -->
    <v-data-table :headers="headers" :items="desserts" item-key="key" hide-default-footer :items-per-page="100">
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.key">
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
              :class="{ error: (item[header.bgKey] || item.checkbox) && item[header.value] && activeTab === 1 }"
              style="text-align: center;"
            >
              {{ item[header.value] }}
            </td>
          </tr>
          <tr>
            <th :colspan="activeTab === 1 ? 4 : 3">Subtotal</th>
            <th v-for="(header, key) in itemHeaders" :key="header.name" style="text-align: center;">
              {{ driverSubtotal(key) }}
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
      alert: {
        show: false,
        message: "",
      },
    };
  },
  methods: {
    // 切换tab
    switchTab(id) {
      this.activeTab = id;
    },
    // 开始
    start() {
      if (this.$store.state.products.working) return;
      this.$store.commit("products/start", this.$route.params.selected);
    },
    // 完成
    finish() {
      if (!this.$store.state.products.working) return;
      let issues = [];
      let completeds = [];
      this.desserts.forEach((item) => {
        if (item.checkbox) {
          completeds.push(item);
        } else {
          issues.push(item);
        }
      });
      this.$store.commit("products/finish", { completeds: completeds, issues: issues });
    },
    // 显示提示框
    showMessage(message) {
      this.alert.message = message;
      this.alert.show = true;
    },
    // 获取司机列表
    getDrivers(products, status = [0, 1, 2]) {
      let drivers = [];
      let serial = 1;
      products.forEach((product, key) => {
        product.drivers.forEach((driver) => {
          if (status.includes(driver.status)) {
            const keyName = `${driver.name}-${driver.stop}`;
            if (drivers[keyName] === undefined) {
              drivers[keyName] = new Object();
              drivers[keyName].productIds = [];
              drivers[keyName].index = serial;
              serial++;
            }
            drivers[keyName].key = `${product.id}-${driver.stop}`;
            drivers[keyName].driverName = driver.name;
            drivers[keyName].productIds.push(product.id);
            drivers[keyName].stops = driver.stop;
            drivers[keyName].checkbox = false;
            drivers[keyName]["item" + key] = driver.qty;
            drivers[keyName]["bg" + key] = false;
          }
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
          return this.issue;
        case 3:
          return this.completed;
        case 4:
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
      switch (this.activeTab) {
        case 1:
          return this.getDrivers(this.products, [0]);
        case 2:
          return this.getDrivers(this.products, [2]);
        case 3:
          return this.getDrivers(this.products, [1]);
        case 4:
          return this.getDrivers(this.products);
        default:
          return [];
      }
    },
    pending() {
      return this.$store.state.products.assigns.filter((item) => item.assignee === "TOM.L");
    },
    issue() {
      return this.$store.state.products.assigns.filter((item) => item.assignee === "TOM.L");
    },
    completed() {
      return this.$store.state.products.assigns.filter((item) => item.assignee === "TOM.L");
    },
    all() {
      return this.$store.state.products.assigns.filter((item) => item.assignee === "TOM.L");
    },
    tabSubtotal() {
      return function(value) {
        switch (value) {
          case 1:
            return this.getDrivers(this.pending, [0]);
          case 2:
            return this.getDrivers(this.issue, [2]);
          case 3:
            return this.getDrivers(this.completed, [1]);
          case 4:
            return this.getDrivers(this.all);
          default:
            return [];
        }
      };
    },
    driverSubtotal() {
      return function(value) {
        let keyName = "item" + value;
        let subtotal = 0;
        this.desserts.forEach((driver) => {
          if (driver[keyName] !== undefined) {
            subtotal = subtotal + driver[keyName];
          }
        });
        return subtotal;
      };
    },
  },
};
</script>
