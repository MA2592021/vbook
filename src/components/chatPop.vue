<template>
  <v-dialog v-model="dialog" scrollable>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">join</v-btn>
    </template>
    <v-card>
      <v-card-title>Public chat</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="max-height: 500px; min-height: 500px">
        <v-card v-for="n in messages" :key="n" class="ma-3">
          <v-card-title>{{ n.id }}</v-card-title>
          <v-card-subtitle>{{ n.date }}</v-card-subtitle>
          <v-card-text>{{ n.text }}</v-card-text>
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
          label="send message"
          v-model="text"
          v-on:keyup.enter="sendMessage()"
        ></v-textarea>
        <v-btn color="blue-darken-1" variant="text" @click="sendMessage()">
          send
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import io from "socket.io-client";

export default {
  mounted() {
    this.join();
  },
  data() {
    return {
      dialog: false,
      text: "",
      messages: [],
    };
  },
  methods: {
    join() {
      this.joined = true;
      this.socketInstance = io("http://192.168.1.2:3000");

      this.socketInstance.on("message:received", (data) => {
        this.messages = this.messages.concat(data);
      });
    },
    sendMessage() {
      this.addMessage();

      this.text = "";
    },
    addMessage() {
      const message = {
        id: localStorage.getItem("username"),
        date: new Date(),
        text: this.text,
        user: this.currentUser,
      };

      this.messages = this.messages.concat(message);
      this.socketInstance.emit("message", message);
    },
  },
};
</script>
