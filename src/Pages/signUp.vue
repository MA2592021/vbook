<template>
  <div class="py-4">
    <v-img class="mx-auto mb-10" max-width="228" src="vbook.png"></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <h1 class="d-flex justify-center mb-6">Sign UP</h1>
      <div class="text-subtitle-1 text-medium-emphasis">user name</div>

      <v-text-field
        density="compact"
        placeholder="user name"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        v-model="user.name"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Email address</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="user.email"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        v-model="user.pass"
        @click:append-inner="visible = !visible"
      ></v-text-field>
      <div class="text-subtitle-1 text-medium-emphasis">Birth date</div>

      <v-input variant="outlined" density="compact"
        ><input type="date" v-model="date"
      /></v-input>

      <div class="text-subtitle-1 text-medium-emphasis">Country</div>

      <v-select
        v-model="user.country"
        :items="countries"
        item-title="country"
        return-object
      ></v-select>

      <div class="text-subtitle-1 text-medium-emphasis">city</div>

      <v-select
        v-model="user.city"
        :items="user.country.cities"
        return-object
      ></v-select>

      <div class="text-subtitle-1 text-medium-emphasis">bio</div>

      <v-textarea
        name="input-7-1"
        variant="filled"
        label="bio"
        auto-grow
        v-model="user.bio"
      ></v-textarea>

      <v-btn block class="mb-8" color="blue" size="large" variant="tonal">
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <router-link class="text-blue text-decoration-none" to="/"
          >already registered ?? log in
          <v-icon icon="mdi-chevron-right"></v-icon
        ></router-link>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    this.getcountries();
  },
  data: () => ({
    visible: false,
    user: { name: "", email: "", pass: "", country: "", city: "", bio: "" },
    date: "",
    countries: "",
  }),
  methods: {
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
