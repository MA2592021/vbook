<template>
  <v-app>
    <sideNavVue v-bind:m="true" />
    <appBarVue></appBarVue>
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
              v-model="password"
              :hidden="seen"
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
            <div class="text-subtitle-1 text-medium-emphasis">birthDate</div>

            <v-input variant="outlined" density="compact"
              ><input
                :disabled="seen"
                type="birthDate"
                v-model="user.birthDate" /></v-input
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
import appBarVue from "@/components/appBar.vue";

import axios from "axios";
import swal from "sweetalert";
export default {
  mounted() {
    this.getcountries();
    this.init();
  },
  components: {
    sideNavVue,
    appBarVue,
  },
  data() {
    return {
      user: {
        name: "name",
        email: "test@gmail.com",
        password: "12332145",
        bio: "ana asln wad moshkla",
        birthDate: "2/12/2022",
        country: "bahama",
        city: "omama",
      },
      tempuser: {
        name: "",
        email: "",
        password: "",
        bio: "",
        birthDate: "",
        country: "",
        city: "",
      },
      passowrd: "",
      seen: true,
      countries: [{ name: "done" }, { name: "okay" }],
    };
  },
  methods: {
    init: function () {
      axios
        .get("/user/" + localStorage.getItem("username"))
        .then((response) => {
          if (!response.errors) {
            this.user = response.data;
          }
        });
    },
    edit: function () {
      this.tempuser.name = this.user.name;
      this.tempuser.email = this.user.email;
      this.tempuser.password = this.user.password;
      this.tempuser.bio = this.user.bio;
      this.tempuser.birthDate = this.user.birthDate;
      this.tempuser.country = this.user.country;
      this.tempuser.city = this.user.city;
      this.seen = !this.seen;
    },
    cancel: function () {
      this.user.name = this.tempuser.name;
      this.user.email = this.tempuser.email;
      this.user.password = this.tempuser.password;
      this.user.bio = this.tempuser.bio;
      this.user.birthDate = this.tempuser.birthDate;
      this.user.country = this.tempuser.country;
      this.user.city = this.tempuser.city;
      this.password = "";
      this.seen = !this.seen;
    },

    confirm: function () {
      axios
        .post(`/user/${localStorage.getItem("username")}/update`, {
          name: this.user.name,
          email: this.user.email,
          password: this.password,
          birthDate: this.user.birthDate,
          city: this.user.city,
          country: this.user.country,
          bio: this.user.bio,
        })
        .then((response) => {
          if (!response.errors) {
            swal("success", response.msg, "success");
          } else {
            swal("error", response.errors[0].msg, "error");
          }
        })
        .catch((err) => {
          swal("error", err, "error");
        });
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
