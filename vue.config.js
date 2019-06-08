/**
 * Created by Xinhe on 2019/1/23.
 */
module.exports = {
  productionSourceMap: false,
  transpileDependencies: ["vue-echarts", "resize-detector"],
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      "/v1": {
        target: "http://35.236.144.252:8888"
      }
    }
  }
};
