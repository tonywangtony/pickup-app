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
          <tr
            :class="item.Id === 5 ? 'amber' : ''"
            v-for="item in items"
            :key="item.id"
          >
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
  name: "All",
  methods: {
    showPoSheet(item) {
      if (item.Id === 5) this.$emit("showPoSheet");
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
        {
          Id: 4,
          Item: "10010484PC",
          Description: "PC-Kui Fei Pullets··105·1HD·貴妃雞 <劉氏農場>",
          UM: "EA",
          Subtotal: "11/11",
          Assignee: "Gallardo, Manuel Ramon",
        },
        {
          Id: 5,
          Item: "10010385",
          Description:
            "Front Half Shells·Harrison·44433·#40·雞胸骨 (Chix Breast Bone)",
          UM: "CS",
          Subtotal: 6,
          Assignee: "",
        },
        {
          Id: 6,
          Item: "10010738",
          Description:
            "Chix Breast Bone·Rio Grande··#40·雞胸骨 Pak Foods, Holmes",
          UM: "CS",
          Subtotal: 2,
          Assignee: "",
        },
        {
          Id: 7,
          Item: "10010965",
          Description:
            "Breast Mt·HR·02290·#40·高盒雞胸肉 House Of Raerord,Butterflies",
          UM: "CS",
          Subtotal: 13,
          Assignee: "",
        },
        {
          Id: 8,
          Item: "10010147",
          Description: "Leg Quarter·Wayne·849·#40·全雞脾 '12849 BULK",
          UM: "CS",
          Subtotal: 5,
          Assignee: "",
        },
        {
          Id: 9,
          Item: "10011592PC",
          Description: "PC-Drumstick·S&J··(#4.5-5)·炸脾仔",
          UM: "ST",
          Subtotal: 15,
          Assignee: "",
        },
        {
          Id: 10,
          Item: "10010755",
          Description:
            "Wing 2ND Sections·PG·4214·#40·扁盒雞中翼 Pilgrim,<Flat Box>,(7% Retained Water, MJ Wing)",
          UM: "CS",
          Subtotal: 13,
          Assignee: "",
        },
      ],
    };
  },
};
</script>
