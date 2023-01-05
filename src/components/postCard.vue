<template>
  <v-card
    class="mx-auto"
    color="#26c6da"
    theme="dark"
    max-width="800"
    min-width="300"
    prepend-icon="mdi-antenna"
    title="Vbook"
  >
    <template v-slot:prepend>
      <v-icon size="x-large"></v-icon>
    </template>

    <v-card-text class="text-h5 py-2">
      {{ c.body }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-avatar
            color="grey-darken-3"
            image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-avatar>
        </template>

        <v-list-item-title>{{ c.author.name }}</v-list-item-title>

        <v-list-item-subtitle
          >{{ c.createdAt.slice(0, 10) }}
          {{ c.createdAt.slice(12, 16) }}</v-list-item-subtitle
        >

        <template v-slot:append>
          <div class="justify-self-end">
            <v-btn icon="mdi-heart" :class="{ test: liked }" @click="like()" />
            <span class="subheading mr-2">{{ c.likes.length }}</span>
            <span class="mr-1">·</span>
            <commentpop v-bind:c="c" />
            <span class="subheading">{{ c.comments.length }}</span>
            <span class="mr-1">·</span>
            <v-btn icon="mdi-share-variant" @click="share()" />
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
<script>
import commentpop from "../components/commentPop.vue";
import axios from "axios";
import swal from "sweetalert";
export default {
  mounted() {
    console.log(this.c);
  },
  components: { commentpop },
  data: () => ({
    liked: false,
    username: localStorage.getItem("username"),
  }),
  methods: {
    like: function () {
      axios
        .post(`post/${localStorage.getItem("username")}/like`, {
          postId: this.c._id,
        })
        .then((response) => {
          if (!response.data.errors) {
            this.liked = true;
          }
        });
    },
    share: function () {
      axios
        .post(`post/${localStorage.getItem("username")}/share`, {
          postId: this.c._id,
        })
        .then((response) => {
          if (!response.data.errors) {
            swal("success", "post shared successfully", "success");
            this.$router.go();
          } else {
            swal("err", response.data.errors[0].msg, "error");
          }
        });
    },
  },
  props: {
    c: Boolean,
  },
};
</script>
<style scoped>
.test {
  color: red;
}
</style>
