import Vue from "vue";
import Vuex from "vuex";
import * as types from "@/store/mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    query: null
  },
  mutations: {
    [types.SET_QUERY](state, query) {
      state.query = query;
    }
  },
  actions: {},
  modules: {}
});
