import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./routes";
import axios from "axios";
import swal from "sweetalert";

axios.defaults.baseURL = "http://192.168.1.2:5000";
axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");

router.beforeEach((to) => {
  if (to.path === "/" || to.path === "/resgister") {
    if (localStorage.getItem("token") !== null) {
      swal("welcome back", "youre already logged in", "success");
      router.push({
        path: "/home",
      });
      return false;
    } else {
      return true;
    }
  } else {
    if (localStorage.getItem("token") === null) {
      swal("error", "youre not logged in to view this page", "error");
      router.push({
        path: "/",
      });
      return false;
    } else {
      axios.get("/user/").then((response) => {
        if (!response.data.errors) {
          console.log("authorized");
          return true;
        } else {
          swal("error", "you have to log in", "error");
          localStorage.removeItem("token");
          router.push({
            path: "/",
          });
          return false;
        }
      });
    }
  }
});

loadFonts();
const app = createApp(App);
app.use(vuetify);
app.use(router, axios);
app.mount("#app");
