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
        <tr
          :class="item.status === 2 ? 'yellow' : ''"
          v-for="item in items"
          :key="item.id"
        >
          <td><v-checkbox v-model="selected" :value="item.id"></v-checkbox></td>
          <td>{{ item.index }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.um }}</td>
          <td>0 / {{ item.subtotal }}</td>
          <td>{{ item.assignee }}</td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "Assigned",
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
        { text: "Assignee", value: "assignee", width: 100 },
      ],
    };
  },
  methods: {
    unassign(username) {
      this.$store.commit("products/unassign", {
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
        (product) => product.status === 1 || product.status === 2
      );
    },
  },
};
</script>
