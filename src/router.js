import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main";
import Account from "./views/Account";
import { Base64 } from "js-base64";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: Main
    },
    {
      path: "/account",
      name: "account",
      component: Account,
      props: route => ({
        query: route.query.query && Base64.decode(route.query.query)
      })
    }
  ]
});
