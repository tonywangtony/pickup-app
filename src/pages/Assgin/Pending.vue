<template>
  <v-data-table
    :headers="headers"
    :items="products"
    item-key="name"
    :search="search"
    hide-default-footer
  >
    <template v-slot:body="{ items }">
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td><v-checkbox v-model="selected" :value="item.id"></v-checkbox></td>
          <td>{{ item.index }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.um }}</td>
          <td>{{ item.subtotal }}</td>
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
      poSheet: false,
      selected: [],
      headers: [
        { text: "", value: null, width: 80, sortable: false },
        { text: "Index", value: "index", width: 80 },
        { text: "Item", value: "id", width: 100 },
        { text: "Description", value: "name", width: 150 },
        { text: "U/M", value: "um", width: 80 },
        { text: "Subtotal", value: "subtotal", width: 100 },
      ],
    };
  },
  methods: {
    assign(username) {
      this.$store.commit("products/assign", {
        ids: this.selected,
        username: username,
      });
    },
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
  computed: {
    products() {
      return this.$store.state.products.all.filter(
        (product) => product.assignee == ""
      );
    },
  },
};
</script>
