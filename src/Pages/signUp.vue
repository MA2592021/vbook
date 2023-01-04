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
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="user.name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          label="password"
          :rules="passwordrules"
          prepend-inner-icon="mdi-lock-outline"
          v-model="user.pass"
          @click:append-inner="visible = !visible"
          required
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Birth date</div>

        <v-input
          variant="outlined"
          density="compact"
          v-model="user.date"
          :rules="daterules"
          ><input required type="date" v-model="user.date"
        /></v-input>

        <div class="text-subtitle-1 text-medium-emphasis">Country</div>

        <v-select
          v-model="user.country"
          :items="countries"
          item-title="country"
          return-object
          required
          :rules="countryrules"
        ></v-select>

        <div class="text-subtitle-1 text-medium-emphasis">city</div>

        <v-select
          v-model="user.city"
          :items="user.country.cities"
          return-object
          :rules="cityrules"
          required
        ></v-select>

        <div class="text-subtitle-1 text-medium-emphasis">bio</div>

        <v-textarea
          name="input-7-1"
          variant="filled"
          label="bio"
          auto-grow
          v-model="user.bio"
          required
          :rules="biorules"
        ></v-textarea>

        <v-btn
          block
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          @click="signup()"
        >
          Sign Up
        </v-btn>
      </v-form>
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
import swal from "sweetalert";
export default {
  mounted() {
    this.getcountries();
  },
  data: () => ({
    valid: true,
    visible: false,
    user: {
      name: "",
      email: "",
      pass: "",
      country: "",
      city: "",
      bio: "",
      date: "",
    },
    countries: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordrules: [(v) => !!v || "password is required"],
    daterules: [(v) => !!v || "date is required"],
    countryrules: [(v) => !!v || "country is required"],
    cityrules: [(v) => !!v || "city is required"],
    biorules: [(v) => !!v || "bio is required"],
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
    signup: async function () {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        axios
          .post("/user/add", {
            name: this.user.name,
            email: this.user.email,
            password: this.user.pass,
            birthDate: this.user.date,
            city: this.user.city,
            country: this.user.country.country,
            bio: this.user.bio,
          })
          .then((response) => {
            if (!response.errors) {
              console.log(response.data);
              swal("success", "you have registered succesfully", "success");
              this.$router.push({
                path: "/",
              });
            } else {
              swal("error", response.errors[0].msg, "error");
            }
          })
          .catch((err) => {
            swal("error", err, "error");
          });
      }
    },
  },
};
</script>
