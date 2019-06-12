<template>
  <div class="nav-bar">
    <div class="brand" @click="$router.push('/')">
      <img class="logo" :src="require('@/assets/image/logo.png')" />
      <span class="name">SnapScale Explorer</span>
    </div>

    <div class="right">
      <a-input-search
        placeholder="Type to search account"
        v-model="inputQuery"
        @search="onSearch"
        class="search"
      />

      <a-select v-model="network" class="net">
        <a-select-option value="test">Testnet</a-select-option>
      </a-select>

      <a-select v-model="language" class="language">
        <a-select-option value="en">ENG</a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
import * as types from "@/store/mutation-types";
import { Base64 } from "js-base64";

export default {
  name: "NavBar",
  data() {
    return {
      language: "en",
      network: "test",
      inputQuery: null
    };
  },
  computed: {
    query() {
      return this.$store.state.query;
    }
  },
  methods: {
    onSearch(query) {
      this.$store.commit(types.SET_QUERY, query);
      this.$router.push({
        name: "account",
        query: {
          query: Base64.encode(query)
        }
      });
    }
  },
  created() {},
  watch: {
    query: {
      immediate: true,
      handler(query) {
        this.inputQuery = query;
      }
    }
  }
};
</script>

<style scoped lang="less">
.nav-bar {
  background: #ffffff;
  box-shadow: 0 6px 9px 0 rgba(144, 164, 183, 0.22);
  height: 70px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .brand {
    cursor: pointer;
    display: flex;
    align-items: center;

    .logo {
      width: 70px;
      height: 65px;
    }

    .name {
      margin-left: 2px;
      font-family: NunitoSans-Bold;
      font-size: 16px;
      line-height: 22px;
      color: #3f3755;
    }
  }

  .right {
    display: flex;
    align-items: center;
    .search {
      width: 260px;
      margin-right: 20px;
    }
    .net {
      width: 120px;
      margin-right: 20px;
    }
    .language {
      width: 120px;
    }
  }
}
</style>
