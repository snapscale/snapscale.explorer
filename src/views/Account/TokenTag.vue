<template>
  <div class="token_tag">
    <span class="amount">{{ amount | numberFormat }}</span>
    <span class="currency">{{ currency }}</span>
    <span class="contract" @click="goAccount(contract)">{{ contract }}</span>
  </div>
</template>

<script>
import EventBus from "@/eventBus";
export default {
  name: "TokenTag",
  props: {
    amount: Number,
    currency: String,
    contract: String
  },
  methods: {
    goAccount(name) {
      EventBus.$emit("goAccount", name);
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/assets/style/mixins.less";
.token_tag {
  padding: 5px 15px;
  background: #fbfbfd;
  border: 1px solid #eaedf3;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  .amount {
    .text("tiny", "light", "NunitoSans-Regular");
  }
  .currency {
    margin-left: 5px;
    .text("text", "dark", "NunitoSans-Regular");
  }
  .contract {
    margin-left: 5px;
    cursor: pointer;
    .text("tiny", "empher", "NunitoSans-Regular");
  }
}
</style>
