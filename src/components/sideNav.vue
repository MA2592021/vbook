<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="username"
      nav
    >
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
        prepend-icon="mdi-account-group-outline"
        title="My Friends"
        @click="myfriends()"
        v-bind="{ active: f }"
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
export default {
  data() {
    return {
      drawer: true,

      rail: true,
    };
  },
  methods: {
    logout: function () {
      this.$router.push({
        path: "/",
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
  },
  props: {
    n: Boolean,
    m: Boolean,
    f: Boolean,
    fr: Boolean,
    c: Boolean,
  },
};
</script>
