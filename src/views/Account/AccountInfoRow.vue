<template>
  <div class="account_info_row">
    <div class="info_label">{{ label }}</div>
    <div class="info_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountInfoRow",
  props: {
    label: String
  }
};
</script>

<style scoped lang="less">
@import "~@/assets/style/mixins.less";

.account_info_row {
  .info_label {
    .text("title", "main", "NunitoSans-Bold");
    width: 250px;
    margin-right: 5px;
    flex-shrink: 0;
  }
  .info_content {
    flex-grow: 1;
    min-width: 0;
  }
  display: flex;
  align-items: flex-start;
}
</style>
