<template>
  <v-container fluid>
    <v-row justify="start">
      <v-row no-gutters justify="center">
        <v-btn small color="primary">
          <v-icon left small>fas fa-clipboard-check</v-icon> 报名
        </v-btn>
        <v-btn small color="primary" class="ml-2">
          <v-icon left small>fas fa-clipboard</v-icon> 取消报名
        </v-btn>
      </v-row>
      <v-row no-gutters justify="center">
        <v-btn small color="error">
          <v-icon left small>fas fa-exclamation</v-icon> 异常报告
        </v-btn>
        <v-btn small color="success" class="ml-2">
          <v-icon left small>fas fa-check-circle</v-icon> 点数完成
        </v-btn>
        <v-btn small color="primary" class="ml-2">
          <v-icon left small>fas fa-long-arrow-alt-right</v-icon> 分配
        </v-btn>
      </v-row>
    </v-row>
    <v-row>
      <v-col>
        <v-select :items="types1" label="Type 1" item-text="name"></v-select>
      </v-col>
      <v-col>
        <v-select :items="types2" label="Type 2"></v-select>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col>
        <v-tabs class="mt-1" dense>
          <v-tab>待完成</v-tab>
          <v-tab>已完成</v-tab>
          <v-tab>全部</v-tab>
        </v-tabs>
      </v-col>
      <v-col>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="搜索"
          single-line
          hide-details
          dense
        ></v-text-field>
      </v-col>
    </v-row>
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
          <tr :class="item.color" v-for="item in items" :key="item.id">
            <td><v-checkbox></v-checkbox></td>
            <td>{{ item.Item }}</td>
            <td>{{ item.Description }}</td>
            <td>{{ item.UM }}</td>
            <td>{{ item.Subtotal }}</td>
            <td>{{ item.Onhand }}</td>
            <td>{{ item.TOPO }}</td>
            <td>{{ item.Assignee }}</td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "Assgin",
  data() {
    return {
      types1: [
        { id: 0, name: "全部" },
        { id: 1, name: "101 FROZEN-CHICKEN" },
        { id: 2, name: "102 FROZEN-BEEF/PORK" },
        { id: 3, name: "103 FROZEN-SHRIMP/SEAFOOD/OTHER" },
        { id: 4, name: "104 PC-MEAT/FROZEN_DRY_GOODS" },
        { id: 5, name: "105 FRESH-MEAT/FRESH-DRY" },
        { id: 6, name: "106 GENERAL_DRY_GOODS/PC-DRY_GOODS" },
        { id: 7, name: "107 VEGETABLE" },
        { id: 8, name: "108 PC-VEGETABLE" },
        { id: 9, name: "NOM Do Not Match" },
      ],
      types2: [
        "全部",
        "A 硬身和有庫存",
        "B 硬身和需要打包",
        "C 軟身和有庫存",
        "D 軟身和需要打包",
      ],
      selected: [],
      search: "",
      headers: [
        { text: "Item", value: "Item", width: 100 },
        { text: "Description", value: "Description", width: 150 },
        { text: "U/M", value: "UM" },
        { text: "Subtotal", value: "Subtotal" },
        { text: "On-hand", value: "Onhand", width: 80 },
        { text: "TO PO", value: "TOPO", width: 80 },
        { text: "Assignee", value: "Assignee" },
      ],
      desserts: [
        {
          Item: "10010235",
          Description: "Game Hen·Patti·0824 <24oz>·24HD·白皮童子雞 Patti Jean",
          UM: "CS",
          Subtotal: 13,
          Onhand: 52,
          TOPO: "",
          Assignee: "TOM.L",
          color: "red lighten-4",
        },
        {
          Item: "10010654",
          Description: "Game Hen·Patti·0816 <16oz>·24HD·白皮童子雞 Patti Jean",
          UM: "CS",
          Subtotal: 10,
          Onhand: 19,
          TOPO: "",
          Assignee: "",
        },
        {
          Item: "10010026PC",
          Description: "PC-Stewing Hen·BB··(#1.5-#2.2)1HD·老雞 10010",
          UM: "EA",
          Subtotal: 7,
          Onhand: 516,
          TOPO: "",
          Assignee: "",
          color: "green lighten-4",
        },
        {
          Item: "10010484PC",
          Description: "PC-Kui Fei Pullets··105·1HD·貴妃雞 <劉氏農場>",
          UM: "EA",
          Subtotal: 11,
          Onhand: 123,
          TOPO: "",
          Assignee: "",
        },
        {
          Item: "10010385",
          Description:
            "Front Half Shells·Harrison·44433·#40·雞胸骨 (Chix Breast Bone)",
          UM: "CS",
          Subtotal: 6,
          Onhand: 21,
          TOPO: "",
          Assignee: "",
          color: "yellow lighten-4",
        },
        {
          Item: "10010738",
          Description:
            "Chix Breast Bone·Rio Grande··#40·雞胸骨 Pak Foods, Holmes",
          UM: "CS",
          Subtotal: 2,
          Onhand: 57,
          TOPO: "",
          Assignee: "",
          color: "yellow lighten-4",
        },
        {
          Item: "10010965",
          Description:
            "Breast Mt·HR·02290·#40·高盒雞胸肉 House Of Raerord,Butterflies",
          UM: "CS",
          Subtotal: 13,
          Onhand: 17,
          TOPO: "",
          Assignee: "",
          color: "yellow lighten-4",
        },
        {
          Item: "10010147",
          Description: "Leg Quarter·Wayne·849·#40·全雞脾 '12849 BULK",
          UM: "CS",
          Subtotal: 5,
          Onhand: 94,
          TOPO: "",
          Assignee: "",
        },
        {
          Item: "10011592PC",
          Description: "PC-Drumstick·S&J··(#4.5-5)·炸脾仔",
          UM: "ST",
          Subtotal: 15,
          Onhand: 19,
          TOPO: "",
          Assignee: "TOM.L",
        },
        {
          Item: "10010755",
          Description:
            "Wing 2ND Sections·PG·4214·#40·扁盒雞中翼 Pilgrim,<Flat Box>,(7% Retained Water, MJ Wing)",
          UM: "CS",
          Subtotal: 13,
          Onhand: 11,
          TOPO: "",
          Assignee: "TOM.L",
        },
      ],
    };
  },
};
</script>
