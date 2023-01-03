<template>
  <v-app>
    <sideNavVue v-bind:n="true" />
    <v-app-bar color="grey-lighten-2">
      <div class="d-flex justify-center align-center w-100">
        Vbook
      </div></v-app-bar
    >
    <v-main>
      <postCardVue class="ma-4" v-for="n in 4" :key="n"></postCardVue>
    </v-main>
  </v-app>
</template>
<script>
import sideNavVue from "../components/sideNav.vue";
import postCardVue from "@/components/postCard.vue";
export default {
  components: {
    sideNavVue,
    postCardVue,
  },
  data() {
    return {};
  },
};
</script>
