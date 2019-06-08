<template>
  <div class="panel">
    <div class="header">
      <slot name="title">
        <span class="title">
          {{ panelTitle }}
        </span>
      </slot>
      <slot name="extra_header"></slot>
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Panel",
  props: {
    panelTitle: String
  }
};
</script>

<style scoped lang="less">
.panel {
  background: #ffffff;
  box-shadow: 0 6px 9px 0 rgba(144, 164, 183, 0.22);
  border-radius: 6px;
  position: relative;
  .header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: #ffffff linear-gradient(-130deg, #2b3648 5%, #222226 100%);
    box-shadow: 0 5px 7px 0 rgba(71, 73, 77, 0.5);
    border-radius: 6px 6px 2px 2px;
    height: 74px;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-family: OPTIEdgarBold-Extended;
      font-size: 18px;
      color: #c2cddf;
      line-height: 28px;
    }
  }
  padding-top: 74px;
  box-sizing: border-box;
}
</style>
