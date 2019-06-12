<template>
  <div class="token_tag">
    <span class="amount">{{ amount | numberFormat }}</span>
    <span class="currency">{{ currency }}</span>
    <AccountLink :name="contract" class="contract" />
  </div>
</template>

<script>
import AccountLink from "@/components/AccountLink";
export default {
  name: "TokenTag",
  components: { AccountLink },
  props: {
    amount: Number,
    currency: String,
    contract: String
  },
  methods: {}
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
    .text("tiny", "empher", "NunitoSans-Regular");
  }
}
</style>
