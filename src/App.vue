<template>
  <div id="app" v-loading="loading">
    <nav-bar class="nav" />
    <div class="container" :style="{ overflow: loading ? 'hidden' : 'auto' }">
      <router-view class="main" />
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import EventBus from "@/eventBus";
import { Base64 } from "js-base64";

export default {
  components: { NavBar },
  data() {
    return {
      loading: false
    };
  },
  created() {
    EventBus.$on("goAccount", query => {
      this.$router.push({
        name: "account",
        query: {
          query: Base64.encode(query)
        }
      });
    });

    EventBus.$on("loading", loading => {
      this.loading = loading;
    });
  }
};
</script>
<style lang="less">
#app {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  padding-top: 70px;
  box-sizing: border-box;
  overflow: auto;

  .nav {
    z-index: 1;
    position: fixed;
    top: 0;
  }

  .container {
    height: 100%;
    overflow: auto;
    z-index: 0;
    .main {
      width: 1110px;
      margin: 0 auto;
    }
  }
}
</style>
