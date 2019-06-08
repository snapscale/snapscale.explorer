<template>
  <div class="basic_panel">
    <div class="row">
      <div class="icon">
        <i class="iconfont iconblock" />
      </div>
      <div class="info" style="margin-bottom: 14px">
        <div class="top">
          <span class="label">Current Block</span>
          <span class="value big">{{ currentBlock }}</span>
        </div>
        <div class="bottom">
          <span class="label">Last Irreversible Block</span>
          <span class="value"
            >{{ irreversibleBlock
            }}<span class="value light" style="margin-left: 4px">{{
              blockDiff
            }}</span></span
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="icon">
        <i class="iconfont iconproducer" />
      </div>
      <div class="info">
        <div class="top">
          <span class="label">Current Producer</span>
          <span class="value">{{ producer }}</span>
        </div>
        <div class="bottom">
          <span class="label">Next Producer</span>
          <span class="value">{{ nextProducer }}</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="icon">
        <i class="iconfont icontransfer" style="font-size: 18px" />
      </div>
      <div class="info">
        <div class="top">
          <span class="label">Current/Max TPS</span>
          <span class="value">{{ currentTPS || 0 }}/7992</span>
        </div>
        <div class="bottom">
          <span class="label">Current/Max APS</span>
          <span class="value">{{ currentAPS || 0 }}/7992</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="icon">
        <i class="iconfont iconsupply" />
      </div>
      <div class="info">
        <div class="top">
          <span class="label">Total Supply of XST</span>
          <span class="value">{{ totalSupply | numberFormat }}</span>
        </div>
        <div class="bottom">
          <span class="label">Current XST/USD Prize</span>
          <span class="value">{{ currentXST }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasicPanel",
  props: {
    info: Object,
    producer: String,
    nextProducer: String,
    currentAPS: Number,
    currentTPS: Number
  },
  computed: {
    currentBlock() {
      return this.info?.head_block_num;
    },

    irreversibleBlock() {
      return this.info?.last_irreversible_block_num;
    },

    blockDiff() {
      if (!this.currentBlock || !this.irreversibleBlock) return null;
      return this.irreversibleBlock - this.currentBlock;
    },

    totalSupply() {
      return 100000000;
    },

    currentXST() {
      return "$1.01 USD";
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/assets/style/mixins.less";

.basic_panel {
  background: #ffffff;
  box-shadow: 0 6px 9px 0 rgba(144, 164, 183, 0.22);
  border-radius: 6px;
  box-sizing: border-box;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .row {
    height: calc((100% - 3px) / 4);
    display: flex;
    padding: 0 10px 0 15px;
    align-items: center;
    .icon {
      flex-shrink: 0;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(
        -130deg,
        #2b3648 4%,
        #525660 66%,
        #222226 100%
      );
      box-shadow: 4px 4px 9px 0 rgba(94, 95, 98, 0.5);
      border-radius: 6px;
      i {
        color: rgba(255, 255, 255, 0.8);
        font-size: 23px;
      }
    }
    .info {
      margin-left: 15px;
      min-width: 0;
      flex-grow: 1;
      .label {
        .text("title", "main", "NunitoSans-Bold");
      }
      .value {
        .text("title", "main", "OPTIEdgarBold-Extended");
        &.light {
          .text("title", "light", "NunitoSans-Bold");
        }
        &.big {
          .text("h1", "main", "OPTIEdgarBold-Extended");
        }
      }
      .top {
        margin-bottom: 5px;
      }
      .top,
      .bottom {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
      }
    }
    + .row {
      border-top: 1px solid #eaedf3;
    }
  }
}
</style>
