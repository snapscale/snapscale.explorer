<template>
  <div class="progress_bar">
    <div class="text">
      <span class="number">{{ current.toFixed(2) }} {{ unit }}</span>
      <span class="slash">/</span>
      <span class="number">{{ max.toFixed(2) }} {{ unit }}</span>
    </div>
    <div class="bar">
      <span
        class="current"
        :style="{ width: `${(current / max) * 100}%`, background: color }"
      />
      <span class="rest" :style="{ background: restColor }" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    max: Number,
    current: Number,
    unit: String,
    color: String,
    restColor: String
  }
};
</script>

<style scoped lang="less">
@import "~@/assets/style/mixins.less";
.progress_bar {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  .text {
    display: flex;
    align-items: center;
    .number {
      .text("text", "light", "NunitoSans-Regular");
    }

    .slash {
      margin: 0 4px;
      .text("text", "dark", "NunitoSans-Bold");
    }
  }
  .bar {
    display: flex;
    width: 300px;
    height: 3px;
    border-radius: 4px;
    align-items: stretch;
    .current {
      flex-shrink: 0;
      border-radius: 4px;
    }
    .rest {
      flex-grow: 1;
      border-radius: 4px;
    }
  }
}
</style>
