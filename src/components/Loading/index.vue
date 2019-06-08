<template>
  <div class="loading_wrapper" v-show="visible">
    <div class="loading">
      <span class="ball1 ball"></span>
      <span class="ball2 ball"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SjLoading",
  data() {
    return {
      text: "Loading...",
      visible: false
    };
  },
  methods: {
    setText(text) {
      this.text = text;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.loading-parent--relative {
  position: relative;
}

.loading_wrapper {
  position: absolute;
  z-index: 2000;
  background-color: fade(#000000, 70%);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  .loading {
    .ball {
      display: inline-block;
      padding: 8px;
      border-radius: 50%;
      &.ball1 {
        background: fade(#e60000, 60%);
        animation: move-left 800ms ease-in-out infinite alternate;
      }
      &.ball2 {
        background: fade(#3f3755, 60%);
        animation: move-right 800ms ease-in-out infinite alternate;
      }
    }
  }
}

@-webkit-keyframes move-left {
  .ball-first;
}
@-moz-keyframes move-left {
  .ball-first;
}
@-ms-keyframes move-left {
  .ball-first;
}
@-o-keyframes move-left {
  .ball-first;
}
@keyframes move-left {
  .ball-first;
}

@-webkit-keyframes move-right {
  .ball-second;
}
@-moz-keyframes move-right {
  .ball-second;
}
@-ms-keyframes move-right {
  .ball-second;
}
@-o-keyframes move-right {
  .ball-second;
}
@keyframes move-right {
  .ball-second;
}

.ball-first() {
  from {
  }
  to {
    transform: translate(20px, 0);
    background: fade(#e60000, 60%);
  }
}
.ball-second () {
  from {
  }
  to {
    transform: translate(-20px, 0);
    background: fade(#3f3755, 60%);
  }
}
</style>
