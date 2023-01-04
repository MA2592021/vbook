<template>
  <div class="py-4">
    <v-img class="mx-auto mb-10" max-width="228" src="vbook.png"></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <h1 class="d-flex justify-center mb-6">Sign in</h1>
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>
      <v-form ref="form" v-model="valid" lazy-validation
        ><v-text-field
          prepend-inner-icon="mdi-email-outline"
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
        ></v-text-field
      ></v-form>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click="login()"
      >
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <router-link class="text-blue text-decoration-none" to="/resgister"
          >Sign up now <v-icon icon="mdi-chevron-right"></v-icon
        ></router-link>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  data: () => ({
    visible: false,
    user: { email: "", pass: "" },
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordrules: [(v) => !!v || "password is required"],
  }),
  methods: {
    login: async function () {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        axios
          .post("/user/login", {
            email: this.user.email,
            password: this.user.pass,
          })
          .then((response) => {
            if (!response.errors) {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("username", response.data.name);
              localStorage.setItem("email", response.data.email);
              this.$router.push({
                path: "home",
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
