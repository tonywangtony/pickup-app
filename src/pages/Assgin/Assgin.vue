<template>
  <v-container fluid>
    <v-row justify="start">
      <v-btn
        small
        color="primary"
        class="ml-2"
        @click="lock()"
        :disabled="activeTab !== 1"
        >Lock</v-btn
      >
      <v-btn
        small
        color="primary"
        class="ml-2"
        @click="unlock()"
        :disabled="activeTab !== 2"
        >Unlock</v-btn
      >
      <v-btn
        small
        color="primary"
        class="ml-2"
        @click="done()"
        :disabled="activeTab !== 2"
        >Done</v-btn
      >
    </v-row>
    <v-row>
      <v-col>
        <v-select :items="types1" label="Type 1" item-text="name"></v-select>
      </v-col>
      <v-col>
        <v-select :items="types2" label="Type 2"></v-select>
      </v-col>
    </v-row>
    <!-- tabs -->
    <v-row align="center">
      <v-col>
        <v-tabs class="mt-1" dense>
          <v-tab @click="switchTab(1)"> Pool({{ pool.length }}) </v-tab>
          <v-tab @click="switchTab(2)">Locked({{ locked.length }})</v-tab>
          <v-tab @click="switchTab(3)">Completed({{ completed.length }})</v-tab>
          <v-tab @click="switchTab(4)">All({{ all.length }})</v-tab>
        </v-tabs>
      </v-col>
      <v-col>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- tables -->
    <v-data-table
      :headers="headers"
      :items="productsFilter"
      :search="search"
      hide-default-footer
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>
              <v-checkbox v-model="selected" :value="item.id"></v-checkbox>
            </td>
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
  </v-container>
</template>

<script>
export default {
  name: "Assgin",
  components: {},
  data() {
    return {
      activeTab: 1,
      search: "",
      selected: [],
      headers: [
        { text: "", value: "null", sortable: false },
        { text: "Index", value: "index" },
        { text: "Item", value: "id" },
        { text: "Description", value: "name" },
        { text: "U/M", value: "um" },
        { text: "Subtotal", value: "subtotal" },
      ],
      products: [
        {
          index: 1,
          id: "10010385",
          name: "Game Hen·Patti·0824 <24oz>·24HD·白皮童子雞",
          um: "CS",
          subtotal: 6,
          status: 0,
        },
        {
          index: 2,
          id: "10010965",
          name: "Whole Young Chix·PG·112939·CW·細雞仔",
          um: "CS",
          subtotal: 13,
          status: 0,
        },
        {
          index: 3,
          id: "10010026PC",
          name: "Chix Bone Frames·Pitman·60019·#40·雞胸骨",
          um: "PC",
          subtotal: 2,
          status: 0,
        },
        {
          index: 4,
          id: "10010114PC",
          name: "PC-Breast Mt·Mountaire·25630·#10·雞胸肉",
          um: "PC",
          subtotal: 12,
          status: 0,
        },
        {
          index: 5,
          id: "10011295",
          name: "Thighs (B/In)·Perdue·623·#40·帶骨上脾",
          um: "PC",
          subtotal: 17,
          status: 0,
        },
        {
          index: 6,
          id: "10011595PC",
          name: "PC-Thighs (B/In)·S&J··(#4.5-5)·帶骨上脾",
          um: "PC",
          subtotal: 15,
          status: 0,
        },
      ],
    };
  },
  methods: {
    switchTab(id) {
      this.activeTab = id;
      this.search = "";
      this.selected = [];
    },
    lock() {
      this.products.map((product) => {
        if (this.selected.includes(product.id)) {
          product.status = 1;
        }
        return product;
      });
    },
    unlock() {
      this.products.map((product) => {
        if (this.selected.includes(product.id)) {
          product.status = 0;
        }
        return product;
      });
    },
    done() {
      this.products.map((product) => {
        if (this.selected.includes(product.id)) {
          product.status = 2;
        }
        return product;
      });
    },
  },
  computed: {
    types1() {
      return this.$store.state.productType.types1;
    },
    types2() {
      return this.$store.state.productType.types2;
    },
    pool() {
      return this.products.filter((item) => item.status === 0);
    },
    locked() {
      return this.products.filter((item) => item.status === 1);
    },
    completed() {
      return this.products.filter((item) => item.status === 2);
    },
    all() {
      return this.products;
    },
    productsFilter() {
      switch (this.activeTab) {
        case 1:
          return this.products.filter((item) => item.status === 0);
        case 2:
          return this.products.filter((item) => item.status === 1);
        case 3:
          return this.products.filter((item) => item.status === 2);
        case 4:
          return this.products;
        default:
          return [];
      }
    },
  },
};
</script>
