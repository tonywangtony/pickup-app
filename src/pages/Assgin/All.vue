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
          <td>{{ item.index }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.um }}</td>
          <td>{{ item.subtotal }}</td>
          <td>{{ item.assignee }}</td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "All",
  data() {
    return {
      poSheet: false,
      selected: [],
      search: "",
      headers: [
        { text: "Index", value: "index", width: 80 },
        { text: "Item", value: "id", width: 100 },
        { text: "Description", value: "name", width: 150 },
        { text: "U/M", value: "um", width: 80 },
        { text: "Subtotal", value: "subtotal", width: 100 },
        { text: "Assignee", value: "assignee", width: 100 },
      ],
    };
  },
  methods: {},
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
      return this.$store.state.products.all;
    },
  },
};
</script>
