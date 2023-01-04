<template>
  <v-app>
    <sideNavVue v-bind:fr="true" />
    <appBarVue></appBarVue>
    <v-main>
      <v-card class="ma-4 d-flex">
        <v-text-field
          label="search"
          :rules="rules"
          hide-details="auto"
        ></v-text-field>
        <v-btn min-height="55"><v-icon>mdi-magnify</v-icon></v-btn>
      </v-card>
      <v-card class="ma-4 pa-5" v-for="u in friendreqs" :key="u">
        <v-card-title>{{ u.name }}</v-card-title>
        <v-card-text>{{ u.bio }}</v-card-text>
        <v-card-actions
          ><v-btn color="success" @click="accept(u._id)">Accept friend</v-btn
          ><v-btn color="error">ignore friend</v-btn></v-card-actions
        >
      </v-card>
    </v-main>
  </v-app>
</template>
<script>
import sideNavVue from "../components/sideNav.vue";
import appBarVue from "@/components/appBar.vue";
import axios from "axios";
import swal from "sweetalert";
export default {
  mounted() {
    this.getfriendreqs();
  },
  components: {
    sideNavVue,
    appBarVue,
  },
  data() {
    return {
      items: [
        { name: "user1", bio: "asdasd" },
        { name: "user2", bio: "asdasd" },
        { name: "user3", bio: "asdasd" },
      ],
      friendreqs: "",
    };
  },
  methods: {
    getfriendreqs: function () {
      axios
        .get(`/user/${localStorage.getItem("username")}/friendRequests`)
        .then((response) => {
          console.log(response.data);
          if (!response.data.errors) {
            this.friendreqs = response.data.friendRequests;
          } else {
            swal("error", response.data.errors[0].msg, "error");
          }
        })
        .catch((err) => {
          swal("error", err, "error");
        });
    },
    accept: function (id) {
      axios
        .post(`/user/${localStorage.getItem("username")}/acceptFriendRequest`, {
          _id: id,
        })
        .then((response) => {
          if (!response.data.errors) {
            swal("success", "friend request accepted", "success");
            this.$router.go();
          } else {
            swal("error", response.data.errors[0].msg, "error");
          }
        })
        .catch((err) => {
          swal("error", err, "error");
        });
    },
  },
};
</script>
