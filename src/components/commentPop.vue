<template>
  <v-dialog v-model="dialog" scrollable>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-comment" v-bind="props" />
    </template>
    <v-card>
      <v-card-title>Comments</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="max-height: 500px">
        <v-card v-for="n in comments" :key="n" class="ma-3">
          <v-card-title>{{ n.userName }}</v-card-title>
          <v-card-subtitle>{{ n.createdAt }}</v-card-subtitle>
          <v-card-text>{{ n.body }}</v-card-text>
          <v-card-actions
            ><v-btn icon="mdi-close" :disabled="false" @click="delet(n._id)"
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
          v-model="text"
        ></v-textarea>
        <v-btn color="blue-darken-1" variant="text" @click="add(c._id)">
          Post
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  mounted() {
    this.getcomments();
    console.log(this.c);
  },
  data() {
    return {
      text: "",
      dialog: false,
      comments: "",
    };
  },
  methods: {
    add: function (id) {
      axios
        .post(`/comment/${localStorage.getItem("username")}/add`, {
          postId: id,
          body: this.text,
        })
        .then((response) => {
          if (!response.data.errors) {
            swal("success", "comment posted", "success");
            this.$router.go();
          }
        });
    },
    delet: function (id) {
      //console.log(id);
      axios
        .delete(`/comment/${localStorage.getItem("username")}/delete`, {
          data: { commentId: id },
        })
        .then((response) => {
          //console.log(id);
          if (!response.data.errors) {
            //console.log(response.data);
            swal("success", "comment deleted successfully", "success");
          } else {
            swal("error", response.data.errors[0].msg, "error");
          }
        });
    },
    getcomments: function () {
      axios
        .post(`/comment/${localStorage.getItem("username")}/post`, {
          postId: this.c._id,
        })
        .then((response) => {
          console.log(response.data);
          this.comments = response.data;
        });
    },
  },
  props: {
    c: Boolean,
  },
};
</script>
