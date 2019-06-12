<template>
  <router-link :to="getAccountPath(name)" class="account_link">
    {{ name }}
  </router-link>
</template>

<script>
import { Base64 } from "js-base64";

export default {
  name: "AccountLink",
  props: {
    name: String
  },
  methods: {
    getAccountPath(name) {
      return {
        name: "account",
        query: {
          query: Base64.encode(name)
        }
      };
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/assets/style/mixins.less";
.account_link {
  color: inherit;
}
</style>
