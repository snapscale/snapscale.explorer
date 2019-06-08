<template>
  <Panel class="transaction" panelTitle="Transactions">
    <div class="tips" slot="extra_header">
      <span>ATPM</span>
      <span>(accumulated transaction per minute)</span>
    </div>
    <v-chart :options="options" autoresize class="chart" />
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import "echarts/lib/chart/line";

export default {
  name: "Transaction",
  components: { Panel },
  props: {
    tpsBlocks: Array
  },
  data() {
    return {
      interval: null,
      readyUpdateTpsValue: null,
      readyUpdateApsValue: null,
      tpsValues: []
    };
  },
  computed: {
    accumTpsValues() {
      let last = this.tpsValues.slice(0, 60).reduce((prev, v) => prev + v, 0);
      const res = [];
      this.tpsValues.slice(60).forEach((val, i) => {
        res.push(last);
        last = last - this.tpsValues[i];
        last = last + val;
      });
      return res;
    },
    options() {
      return {
        // tooltip: {
        //   trigger: 'axis',
        //   formatter: function (params) {
        //     params = params[0];
        //     var date = new Date(params.name);
        //     return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        //   },
        //   axisPointer: {
        //     animation: false
        //   }
        // },
        xAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          min: 0,
          max: 60,
          //   splitNumber: 15,
          minInterval: 1,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            align: "right",
            formatter(val) {
              if (val === 60) return "Present";
              if (val === 0) return "";
              return val % 10 !== 0 ? "" : -(60 - val) + "s";
            },
            fontSize: 12,
            lineHeight: 16,
            fontFamily: "NunitoSans-Regular",
            color: "#9ea0a5"
          },
          animation: false
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          min: 0,
          // max: 1500,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            fontSize: 12,
            lineHeight: 16,
            fontFamily: "NunitoSans-Regular",
            color: "#9ea0a5"
          }
        },
        series: [
          {
            type: "line",
            showSymbol: false,
            // hoverAnimation: false,
            data: this.accumTpsValues.map((d, i) => {
              return {
                value: [i, d]
              };
            }),
            animation: false,
            lineStyle: {
              color: "#E60000",
              width: 1
            },
            smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#E60000" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#FFFFFF" // 100% 处的颜色
                  }
                ]
              }
            }
          }
        ],
        grid: {
          top: 30,
          bottom: 20,
          right: 30,
          left: 30,
          containLabel: true
        }
      };
    }
  },
  created() {
    this.tpsValues = [...Array(120)].fill(0);
    this.interval = setInterval(() => {
      this.tpsValues.shift();
      this.tpsValues.push(this.readyUpdateTpsValue || 0);
      this.readyUpdateTpsValue = 0;
      this.readyUpdateApsValue = 0;
    }, 1000);
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  watch: {
    tpsBlocks(tpsBlocks) {
      this.readyUpdateTpsValue = tpsBlocks.reduce((prev, { transactions }) => {
        return prev + transactions.length;
      }, 0);

      this.readyUpdateApsValue = tpsBlocks.reduce(
        (prev, { transactions }) =>
          prev +
          transactions.reduce(
            (prev, txn) => prev + (txn?.transaction?.actions?.length || 1),
            0
          ),
        0
      );

      this.$emit("currentTPS", this.readyUpdateTpsValue);
      this.$emit("currentAPS", this.readyUpdateApsValue);
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/assets/style/mixins.less";

.transaction {
  width: 500px;
  height: 280px;

  .tips {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .text("tiny", "light", "NunitoSans-Regular");
  }

  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
