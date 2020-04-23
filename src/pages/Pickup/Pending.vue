<template>
  <v-data-table
    :headers="headers"
    :items="products"
    item-key="index"
    :search="search"
    hide-default-footer
  >
    <div slot="headers">
      <th>
        <div>Foo</div>
        <div>Bar</div>
      </th>
    </div>
    <template v-slot:body="{ items }">
      <tbody>
        <tr v-for="(item, key) in items" :key="item.driverName">
          <td><v-checkbox @click="done(item)"></v-checkbox></td>
          <td>{{ key + 1 }}</td>
          <td>{{ item.driverName }}</td>
          <td>{{ item.stops }}</td>
          <td>{{ item.item0 }}</td>
          <td>{{ item.item1 }}</td>
          <td>{{ item.item2 }}</td>
          <td>{{ item.item3 }}</td>
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
</template>

<script>
export default {
  name: "Pending",
  data() {
    return {
      search: "",
    };
  },
  props: {
    value: {
      type: String,
    },
  },
  watch: {
    value(newVal) {
      this.search = newVal;
    },
  },
  methods: {
    done(item) {
      this.$store.dispatch("products/completed", { id: item.id });
    },
  },
  computed: {
    headers() {
      let baseHeaders = [
        { text: "", value: null, sortable: false, width: 20 },
        { text: "Index", value: null, sortable: false, width: 20 },
        { text: "Driver", value: "driverName", width: 20 },
        { text: "Stops", value: "stops", width: 20 },
      ];
      this.$store.state.user.todos.forEach((todo, key) => {
        baseHeaders.push({
          text: todo.name,
          value: "item" + key,
          width: 100,
        });
      });
      const count = this.$store.state.user.todos.length;
      for (let index = count; index <= 3; index++) {
        baseHeaders.push({
          text: "",
          value: "item" + index,
          sortable: false,
          width: 100,
        });
      }
      return baseHeaders;
    },
    products() {
      let products = [];
      this.$store.state.user.todos.forEach((todo, key) => {
        if (todo.status === 2) {
          todo.items.forEach((item) => {
            const itemKey = "item" + key;
            let tempData = [];
            tempData.id = todo.id;
            tempData.driverName = item.driverName;
            tempData.stops = item.stops;
            tempData[itemKey] = item.qty;
            products.push(tempData);
          });
        }
      });
      return products;
    },
  },
};
</script>
