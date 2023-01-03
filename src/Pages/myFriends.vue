<template>
  <v-app>
    <sideNavVue v-bind:f="true" />
    <v-app-bar color="grey-lighten-2">
      <div class="d-flex justify-center align-center w-100">Vbook</div>
    </v-app-bar>
    <v-main>
      <v-card class="ma-4 d-flex">
        <v-text-field
          label="search"
          :rules="rules"
          hide-details="auto"
        ></v-text-field>
        <v-btn min-height="55"><v-icon>mdi-magnify</v-icon></v-btn>
      </v-card>
      <v-card class="ma-4 pa-5" v-for="u in items" :key="u">
        <v-card-title>{{ u.name }}</v-card-title>
        <v-card-text>{{ u.bio }}</v-card-text>
        <v-card-actions
          ><v-btn color="success">view friend</v-btn
          ><v-btn color="error">delete friend</v-btn></v-card-actions
        >
      </v-card>
    </v-main>
  </v-app>
</template>
<script>
import sideNavVue from "../components/sideNav.vue";
export default {
  components: {
    sideNavVue,
  },
  data() {
    return {
      items: [
        { name: "user1", bio: "asdasd" },
        { name: "user2", bio: "asdasd" },
        { name: "user3", bio: "asdasd" },
      ],
    };
  },
};
</script>
