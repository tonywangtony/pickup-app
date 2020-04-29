<template>
  <v-container fluid>
    <v-row no-gutters class="mb-2 mt-2">
      <v-row no-gutters>
        <v-btn class="mr-5" small @click="start">Start</v-btn>
        <v-btn small @click="finish">Finish</v-btn>
      </v-row>
    </v-row>
    <!-- tables -->
    <v-data-table :headers="headers" :items="desserts" hide-default-footer disable-sort></v-data-table>
    <v-data-table class="mt-5" :headers="headers2" :items="desserts2" hide-default-footer hide-default-header></v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "Pickup",
  components: {},
  created: function() {
    console.log(this.$route.params.selected);
    console.log(this.$route.params.isStart);
  },
  data() {
    return {
      selectd: [],
      headers: [
        { text: "Item Code", value: "id" },
        { text: "Description", value: "name" },
        { text: "U/M", value: "um" },
        { text: "Subtotal", value: "subtotal" },
        { text: "On-hand", value: "onhand" },
      ],
      desserts: [
        {
          id: "10010026PC",
          name: "PC-Stewing Hen BB (#1.5-#2.2)1HD 老鸡10010",
          um: "EA",
          subtotal: "14.00",
          onhand: "317.00",
        },
      ],
      headers2: [
        { text: "checkbox", value: "checkbox" },
        { text: "name", value: "name" },
        { text: "stops", value: "stops" },
        { text: "index", value: "index" },
        { text: "total", value: "total" },
        { text: "comment", value: "comment" },
      ],
      desserts2: [
        {
          checkbox: false,
          name: "1200JI",
          stops: "【#20】",
          index: "1",
          total: "2.00",
          comment: "Monica Kwan978",
        },
        {
          checkbox: false,
          name: "1200JI",
          stops: "【#22】",
          index: "2",
          total: "2.00",
          comment: "Lulu",
        },
        {
          checkbox: false,
          name: "1200JI",
          stops: "【#31】",
          index: "3",
          total: "2.00",
          comment: "Ying Tang 108",
        },
        {
          checkbox: false,
          name: "1200SW",
          stops: "【#26】",
          index: "4",
          total: "2.00",
          comment: "Zhicheng Xu108",
        },
        {
          checkbox: false,
          name: "1200SW",
          stops: "【#40】",
          index: "5",
          total: "4.00",
          comment: "Jody Wang",
        },
        {
          checkbox: false,
          name: "1200TAA",
          stops: "【#6】",
          index: "6",
          total: "2.00",
          comment: "Guojin SHEN",
        },
      ],
    };
  },
  methods: {
    start() {
      //
    },
    finish() {
      //
    },
  },
  computed: {},
};
</script>
