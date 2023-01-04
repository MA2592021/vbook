<template>
  <v-dialog v-model="dialog" scrollable>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-comment" v-bind="props" />
    </template>
    <v-card>
      <v-card-title>Comments</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="max-height: 500px">
        <v-card v-for="n in 6" :key="n" class="ma-3">
          <v-card-title>username</v-card-title>
          <v-card-subtitle>date</v-card-subtitle>
          <v-card-text
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
            ab debitis necessitatibus exercitationem corporis! Rerum deleniti
            sapiente dolorum, quaerat beatae, consectetur libero atque a,
            quibusdam nobis voluptatibus sit recusandae temporibus!</v-card-text
          >
          <v-card-actions
            ><v-btn icon="mdi-close" :disabled="false"
          /></v-card-actions>
        </v-card>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-textarea
          bg-color="white"
          color="black"
          clearable
          auto-grow
          rows="1"
          row-height="15"
          clear-icon="mdi-close-circle"
          label="Leave a comment"
        ></v-textarea>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Post
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogm1: "",
      dialog: false,
    };
  },
};
</script>
