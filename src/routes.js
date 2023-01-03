const { createRouter, createWebHistory } = require("vue-router");

const routes = [
  //sign up
  {
    path: "/",
    components: require("./Pages/logIn"),
  },
  {
    path: "/resgister",
    components: require("./Pages/signUp"),
  },
  {
    path: "/home",
    components: require("./Pages/newsFeed"),
  },
  {
    path: "/myacc",
    components: require("./Pages/myAcc"),
  },
  {
    path: "/myfriends",
    components: require("./Pages/myFriends"),
  },
  {
    path: "/friendreqs",
    components: require("./Pages/friendReq"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

module.exports = router;
