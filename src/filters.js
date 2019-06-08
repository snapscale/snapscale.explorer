/**
 * Created by Xinhe on 2019/2/13.
 */
import Vue from "vue";

Vue.filter("numberFormat", number => {
  return number?.toLocaleString();
});
