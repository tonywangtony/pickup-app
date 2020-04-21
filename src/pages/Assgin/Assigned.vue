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
  name: "Assigned",
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
          Id: 1,
          Item: "10010235",
          Description: "Game Hen·Patti·0824 <24oz>·24HD·白皮童子雞 Patti Jean",
          UM: "CS",
          Subtotal: "5/13",
          Assignee: "Gallardo, Manuel Ramon",
        },
        {
          Id: 2,
          Item: "10010654",
          Description: "Game Hen·Patti·0816 <16oz>·24HD·白皮童子雞 Patti Jean",
          UM: "CS",
          Subtotal: "0/5",
          Assignee: "Gallardo, Manuel Ramon",
        },
        {
          Id: 3,
          Item: "10010026PC",
          Description: "PC-Stewing Hen·BB··(#1.5-#2.2)1HD·老雞 10010",
          UM: "EA",
          Subtotal: "1/7",
          Assignee: "Gallardo, Manuel Ramon",
        },
      ],
    };
  },
};
</script>
