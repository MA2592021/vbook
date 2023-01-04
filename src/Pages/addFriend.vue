<template>
  <v-app>
    <sideNavVue v-bind:add="true" />
    <appBarVue></appBarVue>
    <v-main>
      <v-card class="ma-4 d-flex">
        <v-text-field
          label="search"
          :rules="rules"
          v-model="name"
          hide-details="auto"
        ></v-text-field>
        <v-btn min-height="55" @click="search()"
          ><v-icon>mdi-magnify</v-icon></v-btn
        >
      </v-card>
      <v-card class="ma-4 pa-5" v-for="u in people" :key="u">
        <v-card-title>{{ u.name }}</v-card-title>
        <v-card-text>{{ u.bio }}</v-card-text>
        <v-card-actions
          ><v-btn color="info" @click="viewfriend(u.name)">view friend</v-btn
          ><v-btn color="success" @click="add(u._id)"
            >Add friend</v-btn
          ></v-card-actions
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
  components: {
    sideNavVue,
    appBarVue,
  },
  data() {
    return {
      name: "",
      people: [],
    };
  },
  methods: {
    search: function () {
      axios
        .post("/user/search", {
          name: this.name,
        })
        .then((response) => {
          this.people = response.data;
        });
    },
    add: function (id) {
      axios
        .post(`/user/${localStorage.getItem("username")}/addFriendRequest`, {
          _id: id,
        })
        .then((response) => {
          if (!response.errors) {
            swal("success", "friend request sent", "success");
          } else {
            swal("error", response.errors[0].msg, "error");
          }
        });
    },
    viewfriend: function (username) {
      this.$router.push({
        path: "/viewfriend/" + username,
      });
    },
  },
};
</script>
