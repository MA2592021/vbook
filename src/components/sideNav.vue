<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      nav
    >
      <v-list-item-title>{{ username }}</v-list-item-title>
      <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="News Feed"
        @click="newsgo()"
        v-bind="{ active: n }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        title="My Account"
        @click="myacc()"
        v-bind="{ active: m }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-antenna"
        title="My posts"
        @click="myposts()"
        v-bind="{ active: mp }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-group-outline"
        title="My Friends"
        @click="myfriends()"
        v-bind="{ active: f }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-plus"
        title="Add Friend"
        @click="addfriend()"
        v-bind="{ active: add }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-gavel"
        title="Friend requests"
        @click="friendreq()"
        v-bind="{ active: fr }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-message-text"
        title="Chat"
        @click="chat()"
        v-bind="{ active: c }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-call-split"
        title="logout"
        @click="logout()"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  mounted() {
    this.init();
    console.log(this.n);
  },
  data() {
    return {
      drawer: true,
      username: "",
      email: "",
      rail: true,
    };
  },
  methods: {
    init: function () {
      this.username = localStorage.getItem("username");
      this.email = localStorage.getItem("email");
    },
    logout: function () {
      console.log(localStorage.getItem("token"));
      axios
        .get("/user/" + localStorage.getItem("username") + "/logout")
        .then((response) => {
          if (!response.data.errors) {
            swal("logged out", "", "success");
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            this.$router.push({
              path: "/",
            });
          } else {
            swal("error", response.data.errors[0].msg, "error");
          }
        });
    },
    newsgo: function () {
      this.$router.push({
        path: "/home",
      });
    },
    myacc: function () {
      this.$router.push({
        path: "/myacc",
      });
    },
    myfriends: function () {
      this.$router.push({
        path: "/myfriends",
      });
    },
    friendreq: function () {
      this.$router.push({
        path: "/friendreqs",
      });
    },
    addfriend: function () {
      this.$router.push({
        path: "/add",
      });
    },
    myposts: function () {
      this.$router.push({
        path: "/myposts",
      });
    },
  },
  props: {
    n: Boolean,
    m: Boolean,
    f: Boolean,
    fr: Boolean,
    c: Boolean,
    add: Boolean,
    mp: Boolean,
  },
};
</script>
