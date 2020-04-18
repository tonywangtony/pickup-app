<template>
  <v-container fluid>
    <v-btn small depressed color="success" class="mr-1">
      <v-icon small left>fas fa-check-circle</v-icon> 完成
    </v-btn>
    <v-btn small depressed color="error">
      <v-icon small left>fas fa-exclamation</v-icon> 异常报告
    </v-btn>
    <v-tabs class="mt-1">
      <v-tab>待完成</v-tab>
      <v-tab>已完成</v-tab>
      <v-tab>全部</v-tab>
    </v-tabs>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="搜索"
        single-line
        hide-details
        dense
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      item-key="name"
      :search="search"
      show-select
      hide-default-footer
    >
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "Pickup",
  data() {
    return {
      selected: [],
      search: "",
      headers: [
        {
          text: "司机",
          value: "driver",
          width: 100,
        },
        {
          text: "站数",
          value: "stops",
          width: 100,
        },
        {
          text: "10010654 Game Hen·Patti·0824 <24oz>·24HD·白皮童子雞",
          value: "item1",
        },
        {
          text: "10010026PC PC-Stewing Hen·BB··(#1.5-#2.2)1HD·老雞",
          value: "item2",
        },
        {
          text: "10010484PC PC-Kui Fei Pullets··105·1HD·貴妃雞",
          value: "item3",
        },
        {
          text: "10011528PC PC-Rooster Brown··2003·1HD·三黃公雞",
          value: "item4",
        },
      ],
      desserts: [
        {
          driver: "1200EGM",
          stops: "#1",
          item1: 2,
          item2: 5,
          item3: 2,
          item4: "",
        },
        {
          driver: "1200TAF",
          stops: "#15",
          item1: "",
          item2: 3,
          item3: "",
          item4: 1,
        },
        {
          driver: "1200ABC",
          stops: "#3",
          item1: "",
          item2: "",
          item3: "",
          item4: 3,
        },
        {
          driver: "1200FBH",
          stops: "#12",
          item1: "",
          item2: 1,
          item3: "",
          item4: "",
        },
        {
          driver: "1200SVT",
          stops: "#2",
          item1: 1,
          item2: "",
          item3: "",
          item4: "",
        },
        {
          driver: "1200WYV",
          stops: "#22",
          item1: "",
          item2: "2",
          item3: "1",
          item4: "3",
        },
        {
          driver: "1200BBS",
          stops: "#2",
          item1: "3",
          item2: "2",
          item3: "3",
          item4: "2",
        },
        {
          driver: "1200PIN",
          stops: "#8",
          item1: "1",
          item2: "",
          item3: "",
          item4: "2",
        },
      ],
    };
  },
};
</script>
