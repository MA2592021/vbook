<template>
  <v-app>
    <sideNavVue v-bind:m="true" />
    <v-app-bar color="grey-lighten-2">
      <div class="d-flex justify-center align-center w-100">
        Vbook
      </div></v-app-bar
    >
    <v-main>
      <v-card
        class="mx-auto pa-12 pb-8 mt-5"
        elevation="8"
        max-width="800"
        min-width="300"
        rounded="lg"
      >
        <h1 class="d-flex justify-center mb-6">My Account</h1>
        <v-row no-gutters>
          <v-col cols="12" sm="12">
            <v-text-field
              label="username"
              :rules="rules"
              hide-details="false"
              :disabled="seen"
              v-model="user.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" class="mt-4">
            <v-text-field
              label="E-mail"
              :rules="rules"
              hide-details="false"
              :disabled="seen"
              v-model="user.email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" class="mt-4">
            <v-text-field
              label="password"
              :rules="rules"
              hide-details="false"
              :disabled="seen"
              v-model="user.pass"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" class="mt-4">
            <v-text-field
              label="bio"
              :rules="rules"
              hide-details="false"
              :disabled="seen"
              v-model="user.bio"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" class="mt-4">
            <div class="text-subtitle-1 text-medium-emphasis">Birth date</div>

            <v-input variant="outlined" density="compact"
              ><input
                :disabled="seen"
                type="date"
                v-model="user.date" /></v-input
          ></v-col>
          <v-col cols="12" sm="12" class="mt-4">
            <v-select
              label="country"
              v-model="user.country"
              :items="countries"
              item-title="country"
              return-object
              :disabled="seen"
            ></v-select
          ></v-col>
          <v-col cols="12" sm="12" class="mt-4">
            <v-select
              label="city"
              v-model="user.city"
              :items="user.country.cities"
              return-object
              :disabled="seen"
            ></v-select
          ></v-col>
        </v-row>
        <div class="d-flex justify-center mb-6" v-if="seen" id="hide">
          <v-btn color="info" @click="edit()">Edit</v-btn>
        </div>
        <div v-if="!seen" id="hide" class="d-flex justify-center mb-6">
          <v-btn color="success" @click="confirm()">Confirm</v-btn>
        </div>
        <div v-if="!seen" id="hide" class="d-flex justify-center mb-6">
          <v-btn color="error" @click="cancel()">Cancel</v-btn>
        </div>
      </v-card>
    </v-main>
  </v-app>
</template>
<script>
import sideNavVue from "../components/sideNav.vue";
import axios from "axios";
export default {
  mounted() {
    this.getcountries();
  },
  components: {
    sideNavVue,
  },
  data() {
    return {
      user: {
        name: "name",
        email: "test@gmail.com",
        pass: "12332145",
        bio: "ana asln wad moshkla",
        date: "2/12/2022",
        country: "bahama",
        city: "omama",
      },
      tempuser: {
        name: "",
        email: "",
        pass: "",
        bio: "",
        date: "",
        country: "",
        city: "",
      },
      seen: true,
      countries: [{ name: "done" }, { name: "okay" }],
    };
  },
  methods: {
    edit: function () {
      this.tempuser.name = this.user.name;
      this.tempuser.email = this.user.email;
      this.tempuser.pass = this.user.pass;
      this.tempuser.bio = this.user.bio;
      this.tempuser.date = this.user.date;
      this.tempuser.country = this.user.country;
      this.tempuser.city = this.user.city;
      this.seen = !this.seen;
    },
    cancel: function () {
      this.user.name = this.tempuser.name;
      this.user.email = this.tempuser.email;
      this.user.pass = this.tempuser.pass;
      this.user.bio = this.tempuser.bio;
      this.user.date = this.tempuser.date;
      this.user.country = this.tempuser.country;
      this.user.city = this.tempuser.city;
      this.seen = !this.seen;
    },
    confirm: function () {
      alert("test");
    },
    getcountries: function () {
      axios
        .get("https://countriesnow.space/api/v0.1/countries")
        .then((response) => {
          this.countries = response.data.data;
          console.log(response.data);
        });
    },
  },
};
</script>
