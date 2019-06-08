import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ECharts from "vue-echarts";
import store from "./store";

const worldMap = require("echarts/map/json/world.json");
ECharts.registerMap("world", worldMap);
// register component to use
Vue.component("v-chart", ECharts);

import { Input, Select, Tabs, Collapse } from "ant-design-vue";
Vue.component(Input.Search.name, Input.Search);
Vue.component(Select.name, Select);
Vue.component(Select.Option.name, Select.Option);
Vue.component(Tabs.name, Tabs);
Vue.component(Tabs.TabPane.name, Tabs.TabPane);
Vue.component(Collapse.name, Collapse);
Vue.component(Collapse.Panel.name, Collapse.Panel);

import "@/assets/style/main.less";
import apis from "./utils/apis";
import "./filters";

import Loading from "@/components/Loading";
Vue.directive("loading", Loading);

Vue.config.productionTip = false;
Vue.prototype.$apis = apis;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
