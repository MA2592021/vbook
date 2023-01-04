import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./routes";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

loadFonts();
const app = createApp(App);
app.use(vuetify);
app.use(router, axios);
app.mount("#app");
