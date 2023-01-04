import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./routes";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");
router.beforeEach((to, from, next) => {
  if (to.path !== "/" && localStorage.getItem("token") === null)
    next({ path: "/" });
  else if (to.path === "/" && localStorage.getItem("token") !== null)
    next({ path: "/home" });
  else next();
});

loadFonts();
const app = createApp(App);
app.use(vuetify);
app.use(router, axios);
app.mount("#app");
