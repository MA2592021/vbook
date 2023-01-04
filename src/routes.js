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
    path: "/myposts",
    components: require("./Pages/myPosts"),
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
  {
    path: "/viewfriend/:username",
    components: require("./Pages/viewFriend"),
  },
  {
    path: "/add",
    components: require("./Pages/addFriend"),
  },
  {
    path: "/chat",
    components: require("./Pages/chatView"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

module.exports = router;
