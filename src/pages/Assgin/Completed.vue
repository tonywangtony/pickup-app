<template>
  <v-row no-gutters>
    <v-data-table
      :headers="headers"
      :items="desserts"
      item-key="name"
      :search="search"
      show-select
      hide-default-footer
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td><v-checkbox></v-checkbox></td>
            <td>{{ item.Id }}</td>
            <td>{{ item.Item }}</td>
            <td @click="showPoSheet(item)">{{ item.Description }}</td>
            <td>{{ item.UM }}</td>
            <td>{{ item.Subtotal }}</td>
            <td>{{ item.Assignee }}</td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-row>
</template>

<script>
export default {
  name: "Completed",
  methods: {
    showPoSheet() {
      //
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
  data() {
    return {
      poSheet: false,
      selected: [],
      search: "",
      headers: [
        { text: "Index", value: "Id", width: 80 },
        { text: "Item", value: "Item", width: 100 },
        { text: "Description", value: "Description", width: 150 },
        { text: "U/M", value: "UM", width: 80 },
        { text: "Subtotal", value: "Subtotal", width: 100 },
        { text: "Assignee", value: "Assignee" },
      ],
      desserts: [
        {
          Id: 4,
          Item: "10010484PC",
          Description: "PC-Kui Fei Pullets··105·1HD·貴妃雞 <劉氏農場>",
          UM: "EA",
          Subtotal: "11/11",
          Assignee: "Gallardo, Manuel Ramon",
        },
      ],
    };
  },
};
</script>
