<template>
  <v-app>
    <sideNavVue v-bind:mp="true" />
    <appBarVue></appBarVue>
    <v-main>
      <popUpVue class="mb-2 mt-3"></popUpVue>
      <postCardVue class="ma-4" v-for="n in posts" :key="n" v-bind:c="n" />
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
  mounted() {
    this.getposts();
  },
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
          // console.log(response.data.posts);
          if (!response.data.errors) {
            this.posts = response.data.posts;
          }
        });
    },
  },
};
</script>
