<template>
  <Panel class="producer_rate" panelTitle="Block Producers">
    <BaseTable :columns="cols" :data="data" class="table" />
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import BaseTable from "@/components/BaseTable";
export default {
  name: "ProducerRate",
  components: { BaseTable, Panel },
  props: {
    data: Array,
    producer: String
  },
  data() {
    return {
      cols: [
        {
          key: "index",
          label: "#",
          width: 30
        },
        {
          key: "owner",
          label: "NAME",
          width: 200
        },
        {
          key: "status",
          label: "STATUS",
          width: 180,
          render: (h, val, row) => {
            if (row.index <= 21 && row.owner !== this.producer) {
              return <span class="top">TOP 21</span>;
            }
            if (row.owner === this.producer) {
              return <span class="producing">Producing</span>;
            }
            if (row.index > 21 && row.owner !== this.producer) {
              return <span class="standby">Standby</span>;
            }
          }
        },
        {
          key: "location",
          label: "LOCATION",
          width: 200,
          render(h, val, row) {
            return [
              <img src={row.image} class="flag" />,
              <span class="country">{row.location}</span>
            ];
          }
        },
        {
          key: "url",
          label: "URL",
          width: 280
        },
        {
          key: "rewards",
          label: "REWARDS PER DAY",
          width: 180,
          render(h, val) {
            return `${val} XST`;
          }
        }
      ]
    };
  }
};
</script>

<style scoped lang="less">
@import "~@/assets/style/mixins.less";

.producer_rate {
  width: 1110px;
  height: auto;
  /deep/ .table {
    .index {
      .text("tiny", "light", "NunitoSans-Regular");
    }
    .owner {
      .text("text", "dark", "NunitoSans-Bold");
    }

    .url {
      .text("tiny", "empher", "NunitoSans-Regular");
      /*cursor: pointer;*/
    }

    .location {
      display: flex;
      align-items: center;
      .flag {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
      .country {
        margin-left: 10px;
        .text("text", "dark", "NunitoSans-Regular");
        text-transform: capitalize;
      }
    }

    .status {
      .top,
      .producing,
      .standby {
        height: 24px;
        width: 80px;
        .text("tiny", #fff, "NunitoSans-Bold");
        border-radius: 4px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .top {
        background: #34aa44;
      }
      .standby {
        background: #1665d8;
      }
      .producing {
        background: #f6ab2f;
      }
    }

    .rewards {
      .text("text", "dark", "NunitoSans-Regular");
    }
  }
}
</style>
