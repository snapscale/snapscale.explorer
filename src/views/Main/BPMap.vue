<template>
  <Panel class="bp_map" panelTitle="Block Producer Map">
    <v-chart :options="options" autoresize class="map" />
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import "echarts/lib/component/geo";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/chart/scatter";
import "echarts/lib/component/tooltip";

export default {
  name: "BPMap",
  components: { Panel },
  props: {
    data: Array,
    producer: String
  },
  computed: {
    options() {
      if (!this.data) return null;
      const others = this.data.filter(({ owner }) => {
        return owner !== this.producer;
      });

      const producerItem = this.data.find(
        ({ owner }) => owner === this.producer
      );
      return {
        tooltip: {
          show: true,
          backgroundColor: "rgba(62,63,66,0.6)",
          padding: [5, 15],
          borderRadius: 4,
          formatter({ data }) {
            const { name, url } = data;
            return `<div style="display: flex;align-items: flex-start;flex-direction: column">
                        <span style="font-size: 14px;line-height: 19px;color:#ffffff;font-family: NunitoSans-Bold">${name}</span>
                        <span style="font-size: 12px;line-height: 16px;color:#ffffff;font-family: NunitoSans-Regular">${url}</span>
                    </div>`;
          }
        },
        geo: {
          map: "world",
          silent: true,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          itemStyle: {
            borderWidth: 0,
            // borderColor: 'rgba(105,186,207)',
            borderColor: "#d9d9d9",
            areaColor: "#d9d9d9"
            // shadowColor: 'rgba(62,75,98,0.5)',
            // shadowBlur: 4
            // opacity: 0.3,
          }
        },
        // backgroundColor:{
        //   type: 'linear',
        //   x: 0,
        //   y: 0,
        //   x2: 1,
        //   y2: 1,
        //   colorStops: [{
        //     offset: 0, color: 'rgba(62,75,98,0.1)' // 0% 处的颜色
        //   }, {
        //     offset: 1, color: 'rgba(73,105,161,0.1)' // 100% 处的颜色
        //   }],
        // },
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#34aa44"
                // shadowBlur: 10,
                // shadowColor: '#333'
              }
            },
            zlevel: 1,
            data: others.map(producer => ({
              name: producer.owner,
              url: producer.url,
              value: [producer.longitude, producer.latitude]
            }))
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            symbolSize: 10,
            showEffectOn: "render",
            rippleEffect: {
              brushType: "fill",
              scale: 4,
              period: 3
            },
            itemStyle: {
              normal: {
                color: "#f6ab2f"
                // shadowBlur: 10,
                // shadowColor: '#333'
              }
            },
            label: {
              show: true,
              position: "top",
              distance: 8,
              fontSize: 14,
              color: "#3e4b62",
              lineHeight: 20,
              fontFamily: "NunitoSans-Regular",
              formatter(params) {
                return params.name;
              }
            },
            zlevel: 2,
            data: producerItem
              ? [
                  {
                    name: producerItem.owner,
                    url: producerItem.url,
                    value: [producerItem.longitude, producerItem.latitude]
                  }
                ]
              : null
          }
        ]
      };
    }
  }
};
</script>

<style scoped lang="less">
.bp_map {
  width: 500px;
  height: 330px;
  .map {
    width: 100%;
    height: 100%;
  }
}
</style>
