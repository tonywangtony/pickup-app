<template>
  <v-container>
    <v-row align="center" justify="center" style="height: 150px;">
      <div>
        <v-img src="../assets/warehouse.png" height="100" width="100"></v-img>
      </div>
    </v-row>
    <v-row align="center" justify="center" style="height: 200px;">
      <v-form ref="form" style="width: 300px;">
        <v-text-field
          v-model="username"
          label="Username"
          type="text"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
          outlined
        ></v-text-field>
        <v-checkbox
          v-model="checkbox"
          :label="'save username and password'"
        ></v-checkbox>
        <v-btn color="primary" block @click="login">Login</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      checkbox: false,
    };
  },
  methods: {
    login() {
      this.$router.push({ path: "/assginFilter" });
    },
  },
};
</script>
