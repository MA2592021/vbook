<template>
  <v-app>
    <sideNavVue v-bind:n="true" />
    <appBarVue></appBarVue>
    <v-main>
      <popUpVue class="mb-2 mt-3"></popUpVue>
      <postCardVue class="ma-4" v-for="n in 4" :key="n"></postCardVue>
    </v-main>
  </v-app>
</template>
<script>
import sideNavVue from "../components/sideNav.vue";
import postCardVue from "@/components/postCard.vue";
import popUpVue from "@/components/popUp.vue";
import appBarVue from "@/components/appBar.vue";
import axios from "axios";
export default {
  components: {
    sideNavVue,
    postCardVue,
    popUpVue,
    appBarVue,
  },
  data() {
    return {
      posts: "",
    };
  },
  methods: {
    getposts: function () {
      axios
        .get(`/post/${localStorage.getItem("username")}`)
        .then((response) => {
          if (!response.data.errors) {
            this.posts = response.data;
          }
        });
    },
  },
};
</script>
