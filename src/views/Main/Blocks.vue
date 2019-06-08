<template>
  <Panel class="blocks" panelTitle="Blocks">
    <BaseTable :columns="cols" :data="data" class="table" />
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import BaseTable from "@/components/BaseTable";
import Moment from "moment";

export default {
  name: "Blocks",
  components: { BaseTable, Panel },
  props: {
    data: Array
  },
  data() {
    return {
      cols: [
        {
          key: "block_num",
          label: "NUMBER",
          width: 80
        },
        {
          key: "transactions",
          label: "TRANSACTIONS",
          width: 120,
          render(h, val) {
            return val.length;
          }
        },
        {
          key: "producer",
          label: "PRODUCER",
          width: 110
        },
        {
          key: "timestamp",
          label: "TIME",
          width: 95,
          render(h, val) {
            const time = Moment(val);
            return [
              <span>{time.format("MMMM Do YYYY")}</span>,
              <span>{time.format("h:mm:ss a")}</span>
            ];
          }
        }
      ]
    };
  }
};
</script>

<style scoped lang="less">
@import "~@/assets/style/mixins.less";

.blocks {
  width: 440px;
  height: 495px;

  /deep/ .table {
    .block_num {
      /*cursor: pointer;*/
      .text("tiny", "empher", "NunitoSans-Regular");
    }
    .transactions {
      .text("text", "dark", "NunitoSans-Regular");
    }
    .producer {
      /*cursor: pointer;*/
      .text("tiny", "empher", "NunitoSans-Italic");
    }
    .timestamp {
      display: flex;
      flex-direction: column;
      align-items: center;
      .text("tiny", "dark", "NunitoSans-Regular");
    }
  }
}
</style>
