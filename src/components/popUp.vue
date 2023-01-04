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
                  item-value="_id"
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
          <v-btn color="blue-darken-1" variant="text" @click="create()">
            Post
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  mounted() {
    this.getfriends();
  },
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
    create: function () {
      axios
        .post(`/post/${localStorage.getItem("username")}/create`, {
          author: localStorage.getItem("id"),
          body: this.text,
          tags: this.tagged,
        })
        .then((response) => {
          if (!response.data.errors) {
            swal("success", "post created", "success");
            this.$router.go();
          } else {
            swal("error", response.data.errors[0].msg, "error");
          }
        })
        .catch((err) => {
          swal("error", err, "error");
        });
    },
    getfriends: function () {
      axios
        .get(`/user/${localStorage.getItem("username")}/friends`)
        .then((response) => {
          this.friends = response.data.friends;
        });
    },
  },
};
</script>
