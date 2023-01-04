<template>
  <v-app>
    <sideNavVue v-bind:c="true" />
    <appBarVue></appBarVue>
    <v-main>
      <v-card class="ma-4">
        <v-tabs v-model="tab" bg-color="primary" fixed-tabs>
          <v-tab value="one">public chat</v-tab>
          <v-tab value="two">private chat</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one" class="d-flex justify-center ma-6">
              <chatpop></chatpop>
            </v-window-item>

            <v-window-item value="two"> private </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>
<script>
import sideNavVue from "../components/sideNav.vue";
import appBarVue from "@/components/appBar.vue";
import chatpop from "../components/chatPop.vue";
export default {
  components: {
    sideNavVue,
    appBarVue,
    chatpop,
  },
  data() {
    return { tab: null, joined: false };
  },
  methods: {
    join: function () {
      this.joined = true;
    },
  },
};
</script>
