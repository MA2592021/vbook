<template>
  <v-card
    class="mx-auto"
    color="#26c6da"
    theme="dark"
    max-width="700"
    prepend-icon="mdi-account"
    title="profile"
  >
    <template v-slot:prepend>
      <v-icon size="x-large"></v-icon>
    </template>

    <v-card-text class="text-h5 py-2"> {{ user.bio }} </v-card-text>

    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-avatar
            color="grey-darken-3"
            image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-avatar>
        </template>

        <v-list-item-title>{{ user.name }}</v-list-item-title>

        <v-list-item-subtitle
          >{{ user.createdAt.slice(0, 10) }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  beforeMount() {
    this.username = this.$route.params.username;
    console.log(this.username);
    this.getuser();
  },

  data() {
    return {
      username: "",
      user: { createdAt: "   ", likes: [] },
    };
  },
  methods: {
    getuser: function () {
      axios.get("/user/" + this.username).then((response) => {
        if (!response.errors) {
          this.user = response.data;
          console.log(response.data);
        }
      });
    },
    add: function () {},
  },
};
</script>
<style scoped>
.test {
  color: rgb(6, 247, 6);
}
</style>
