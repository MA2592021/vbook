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
      "Turns out semicolon-less style is easier and safer in TS because most
      gotcha edge cases are type invalid as well."
    </v-card-text>

    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-avatar
            color="grey-darken-3"
            image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-avatar>
        </template>

        <v-list-item-title>username</v-list-item-title>

        <v-list-item-subtitle>date</v-list-item-subtitle>

        <template v-slot:append>
          <div class="justify-self-end">
            <v-btn icon="mdi-heart" :class="{ test: liked }" @click="like()" />
            <span class="subheading mr-2">256</span>
            <span class="mr-1">·</span>
            <commentpop></commentpop>
            <span class="subheading">45</span>
            <span class="mr-1">·</span>
            <v-btn icon="mdi-share-variant" v-bind="props" />
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
<script>
import commentpop from "../components/commentPop.vue";

export default {
  components: { commentpop },
  data: () => ({
    liked: false,
  }),
  methods: {
    like: function () {
      this.liked = !this.liked;
    },
  },
};
</script>
<style scoped>
.test {
  color: red;
}
</style>
