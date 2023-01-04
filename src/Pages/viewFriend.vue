<template>
  <v-app>
    <sideNavVue />
    <appBarVue></appBarVue>
    <v-main>
      <friendCardVue class="ma-4"></friendCardVue>
      <postCardVue class="ma-4" v-for="n in posts" :key="n" v-bind:c="n" />
    </v-main>
  </v-app>
</template>
<script>
import sideNavVue from "../components/sideNav.vue";
import postCardVue from "@/components/postCard.vue";
import appBarVue from "@/components/appBar.vue";
import friendCardVue from "@/components/friendCard.vue";
import axios from "axios";
export default {
  mounted() {
    this.getposts();
  },
  components: {
    sideNavVue,
    postCardVue,
    friendCardVue,
    appBarVue,
  },
  data() {
    return {
      posts: "",
    };
  },
  methods: {
    getposts: function () {
      axios.get(`/post/${this.$route.params.username}`).then((response) => {
        console.log(response.data);
        if (!response.data.errors) {
          this.posts = response.data;
        }
      });
    },
  },
};
</script>
