<template>
  <v-row no-gutters>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      item-key="index"
      :search="search"
      show-select
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
          <tr v-for="item in items" :key="item.id">
            <td><v-checkbox readonly></v-checkbox></td>
            <td>{{ item.index }}</td>
            <td>{{ item.driver }}</td>
            <td>{{ item.stops }}</td>
            <td>{{ item.item1 }}</td>
            <td>{{ item.item2 }}</td>
            <td>{{ item.item3 }}</td>
            <td>{{ item.item4 }}</td>
          </tr>
          <tr>
            <th colspan="3">Summary</th>
            <th>5</th>
            <th>5</th>
            <th>5</th>
            <th>4</th>
            <th>6</th>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-row>
</template>

<script>
export default {
  name: "Pending",
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
      selected: [],
      search: "",
      headers: [
        {
          text: "Index",
          value: "index",
          width: 30,
        },
        {
          text: "Driver name",
          value: "driver",
          width: 50,
        },
        {
          text: "Stops",
          value: "stops",
          width: 30,
        },
        {
          text: "10010654 Game Hen·Patti·0824 <24oz>·24HD·白皮童子雞",
          value: "item1",
          width: 50,
        },
        {
          text: "10010026PC PC-Stewing Hen·BB··(#1.5-#2.2)1HD·老雞",
          value: "item2",
          width: 50,
        },
        {
          text: "10010484PC PC-Kui Fei Pullets··105·1HD·貴妃雞",
          value: "item3",
          width: 50,
        },
        {
          text: "10011528PC PC-Rooster Brown··2003·1HD·三黃公雞",
          value: "item4",
          width: 50,
        },
      ],
      desserts: [
        {
          index: 4,
          driver: "1200DDD",
          stops: "#12",
          item1: "",
          item2: 1,
          item3: "",
          item4: "",
        },
        {
          index: 5,
          driver: "1200EEE",
          stops: "#2",
          item1: 1,
          item2: "",
          item3: "",
          item4: "",
        },
        {
          index: 6,
          driver: "1200EGM",
          stops: "#22",
          item1: "",
          item2: "2",
          item3: "1",
          item4: "3",
        },
        {
          index: 7,
          driver: "1200FFF",
          stops: "#2",
          item1: "3",
          item2: "2",
          item3: "3",
          item4: "2",
        },
        {
          index: 8,
          driver: "1200GGG",
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
