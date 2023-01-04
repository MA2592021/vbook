<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Create Post </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Create Post</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-textarea
                v-model="text"
                bg-color="light-blue"
                color="black"
                label="whats on your mind"
              ></v-textarea>

              <v-col cols="12" sm="12">
                <v-autocomplete
                  v-model="tagged"
                  :items="friends"
                  item-title="name"
                  item-value="name"
                  label="Tag Friends"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>{{ tagged }}</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="close()">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Post
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    text: "",
    friends: [
      { name: "gamal" },
      { name: "amir" },
      { name: "khaled" },
      { name: "waleed" },
      { name: "omar" },
    ],
    tagged: null,
  }),
  methods: {
    close: function () {
      this.dialog = false;
      this.tagged = null;
      this.text = "";
    },
  },
};
</script>
