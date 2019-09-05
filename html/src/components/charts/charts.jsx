import React from 'react';
import { makeStyles, formatMs } from '@material-ui/core/styles';
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import echarts from 'echarts';
import './world.js';
import Title from '../title/title.jsx';
import Loading from '../loading/loading.jsx';
import KovoBlock from '../kovoBlock/kovoBlock.jsx';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(0, 0, 2, 0),
    backgroundColor: 'transparent',
  },
  paperInner: {
    padding: theme.spacing(2),
    marginBottom: 0,
  },
}));

const ChartsMain = (props) => {
  const classes = useStyles();
  const langMap = _x.config.langsMap[_x.utils.langs.get()];

  return pug`
    Title(
      Icon='charts'
      Text=langMap[0xF001]
    )
    Paper(
      elevation=0
      className=classes.paper
    )
      div
        Grid(
          container
          spacing=2
        )
          Grid(
            item
            md=6
            xs=12
          )
            KovoBlock#123(className=classes.paperInner)
              #chart1.chart
          Grid(
            item
            md=6
            xs=12
          )
            KovoBlock(className=classes.paperInner)
              #chart2.chart
          Grid(
            item
            md=6
            xs=12
          )
            KovoBlock(className=classes.paperInner)
              #chart3.chart
          Grid(
            item
            md=6
            xs=12
          )
            KovoBlock(className=classes.paperInner)
              #chart4.chart
          Grid(
            item
            md=6
            xs=12
          )
            KovoBlock(className=classes.paperInner)
              #chart5.chart
          Grid(
            item
            md=6
            xs=12
          )
            KovoBlock(className=classes.paperInner)
              #chart6.chart
  `;
};

class Charts extends React.Component {
  componentDidMount() {
    const langMap = _x.config.langsMap[_x.utils.langs.get()];

    const Chart1 = echarts.init(document.getElementById('chart1'));

    let tps = [];
    let aps = [];

    const option = {
      backgroundColor: 'transparent',
      title: {
        text: langMap[0x3000],
        left: 'center',
        textStyle: {
          color: '#333333',
          fontSize: 16,
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      legend: {
        itemGap: 20,
        itemWidth: 16,
        itemHeight: 16,
        data: [{
          name: 'TPS',
          icon: 'roundRect',
          textStyle: {
            color: '#333333',
          },
        }, {
          name: 'APS',
          icon: 'roundRect',
          textStyle: {
            color: '#333333',
          },
        }],
        right: 0,
        bottom: 0,
      },
      grid: {
        top: '40',
        left: '20',
        right: '0',
        bottom: '40',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['', '', '', '', '', '', '', '', '', ''],
        axisLabel: {
          margin: 30,
          color: '#9e9e9e',
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: true,
          length: 25,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
      },
      yAxis: [{
        type: 'value',
        position: 'right',
        axisLabel: {
          margin: 20,
          color: '#9e9e9e',
        },
        axisTick: {
          show: true,
          length: 15,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
            width: 1,
          },
        },
      }],
      series: [{
        name: 'TPS',
        type: 'line',
        smooth: 0.5,
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 0,
        lineStyle: {
          normal: {
            color: '#92E7FF', // 线条颜色
          },
        },
        itemStyle: {
          color: '#92E7FF',
          borderColor: '#fff',
          borderWidth: 0,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#0CB5E533',
            },
            {
              offset: 1,
              color: '#0CB5E500',
            },
            ], false),
          },
        },
        data: tps,
      }, {
        name: 'APS',
        type: 'line',
        smooth: 0.5,
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 0,
        lineStyle: {
          normal: {
            color: '#F6587A',
          },
        },
        itemStyle: {
          color: '#F6587A',
          borderColor: '#fff',
          borderWidth: 0,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#F6587A33',
            },
            {
              offset: 1,
              color: '#F6587A00',
            },
            ], false),
          },
        },
        data: aps,
      }],
    };

    Chart1.setOption(option);

    const Chart2 = echarts.init(document.getElementById('chart2'));

    const chinaGeoCoordMap = {
      beijing: {
        name: '北京市',
        value: [116.4551, 40.2539],
      },
      chongqing: {
        name: '重庆',
        value: [108.384366, 30.439702],
      },
      shanghai: {
        name: '上海',
        value: [121.4648, 31.2891],
      },
    };

    let currentProducer = 'beijing';
    let otherProducer = ['shanghai', 'chongqing'];

    const option2 = {
      backgroundColor: 'transparent',
      title: {
        text: langMap[0x3001],
        left: 'center',
        textStyle: {
          color: '#333333',
          fontSize: 16,
        },
      },
      grid: {
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        containLabel: true,
      },
      geo: {
        map: 'world',
        silent: true,
        left: 0,
        right: 0,
        top: 60,
        bottom: 60,
        emphasis: {
          label: {
            show: false,
          },
        },
        roam: false,
        itemStyle: {
          normal: {
            color: '#cecece',
            borderColor: '#cecece',
            borderWidth: 1,
          },
        },
      },
      tooltip: {
        show: true,
        backgroundColor: 'rgba(62,63,66,0.6)',
        padding: [5, 15],
        borderRadius: 4,
        formatter({ data }) {
          const { name } = data;
          return `<div style="display: flex;align-items: flex-start;flex-direction: column">
            <span style="font-size: 14px;line-height: 19px;color:#ffffff;font-family: NunitoSans-Bold">${name}</span>
          </div>`;
        },
      },
      series: [{
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          period: 2,
          brushType: 'fill',
          scale: 4,
        },
        label: {
          normal: {
            show: true,
            position: 'right', // 显示位置
            offset: [5, 0], // 偏移设置
            formatter: chinaGeoCoordMap[currentProducer].name,
            fontSize: 13,
          },
          emphasis: {
            show: true,
          },
        },
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          normal: {
            show: false,
            color: '#382AC7',
          },
        },
        data: [{
          name: chinaGeoCoordMap[currentProducer].name,
          value: chinaGeoCoordMap[currentProducer].value,
        }],
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#F6587A',
          },
        },
        zlevel: 1,
        data: otherProducer.map(item => chinaGeoCoordMap[item]),
      }],
    };

    Chart2.setOption(option2);

    _x.utils.handles.dashboard.list.charts = (data) => {
      tps.push(data.performance.tps);
      aps.push(data.performance.aps * 2);
      tps = tps.slice(-10);
      aps = aps.slice(-10);
      option.series[0].data = tps;
      option.series[1].data = aps;
      Chart1.setOption(option);

      currentProducer = data.producers.current_producer;
      const id = Object.keys(chinaGeoCoordMap).lastIndexOf(currentProducer);
      otherProducer = Object.keys(chinaGeoCoordMap);
      otherProducer.splice(id, 1);
      option2.series[0].label.normal.formatter = chinaGeoCoordMap[currentProducer].name;
      option2.series[0].data = [{
        name: chinaGeoCoordMap[currentProducer].name,
        value: chinaGeoCoordMap[currentProducer].value,
      }];
      option2.series[1].data = otherProducer.map(item => chinaGeoCoordMap[item]);
      Chart2.setOption(option2);
    };

    const Chart3 = echarts.init(document.getElementById('chart3'));
    const option3 = {
      backgroundColor: 'transparent',
      title: {
        text: langMap[0x3002],
        left: 'center',
        textStyle: {
          color: '#0c0c0c',
          fontSize: 16,
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      grid: {
        top: '40',
        left: '20',
        right: '0',
        bottom: '20',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['', '', '', '', '', '', '', '', '', ''],
        axisLabel: {
          margin: 30,
          color: '#9e9e9e',
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: true,
          length: 25,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
      },
      yAxis: [{
        type: 'value',
        position: 'right',
        axisLabel: {
          margin: 20,
          color: '#9e9e9e',
        },
        axisTick: {
          show: true,
          length: 15,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
            width: 1,
          },
        },
      }],
      series: [{
        name: langMap[0x3002],
        type: 'line',
        smooth: 0.5,
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 0,
        lineStyle: {
          normal: {
            color: '#92E7FF', // 线条颜色
          },
        },
        itemStyle: {
          color: '#92E7FF',
          borderColor: '#fff',
          borderWidth: 0,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#0CB5E533',
            },
            {
              offset: 1,
              color: '#0CB5E500',
            },
            ], false),
          },
        },
        data: [100, 100.75, 105.33, 99.88, 89.98, 102.02, 111.33, 105.23, 99.87, 99.99],
      }],
    };

    Chart3.setOption(option3);

    const Chart4 = echarts.init(document.getElementById('chart4'));
    const option4 = {
      backgroundColor: 'transparent',
      title: {
        text: langMap[0x3003],
        left: 'center',
        textStyle: {
          color: '#333333',
          fontSize: 16,
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      grid: {
        top: '40',
        left: '20',
        right: '0',
        bottom: '20',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['', '', '', '', '', '', '', '', '', ''],
        axisLabel: {
          margin: 30,
          color: '#9e9e9e',
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: true,
          length: 25,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
      },
      yAxis: [{
        type: 'value',
        position: 'right',
        axisLabel: {
          margin: 20,
          color: '#9e9e9e',
        },
        axisTick: {
          show: true,
          length: 15,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
            width: 1,
          },
        },
      }],
      series: [{
        name: langMap[0x3003],
        type: 'line',
        smooth: 0.5,
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 0,
        lineStyle: {
          normal: {
            color: '#92E7FF', // 线条颜色
          },
        },
        itemStyle: {
          color: '#92E7FF',
          borderColor: '#fff',
          borderWidth: 0,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#0CB5E533',
            },
            {
              offset: 1,
              color: '#0CB5E500',
            },
            ], false),
          },
        },
        data: [10000, 12075, 11533, 9988, 8998, 10202, 14133, 15523, 9987, 8899],
      }],
    };

    Chart4.setOption(option4);

    const Chart5 = echarts.init(document.getElementById('chart5'));
    const option5 = {
      backgroundColor: 'transparent',
      title: {
        text: langMap[0x3004],
        left: 'center',
        textStyle: {
          color: '#333333',
          fontSize: 16,
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      grid: {
        top: '40',
        left: '20',
        right: '0',
        bottom: '20',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['', '', '', '', '', '', '', '', '', ''],
        axisLabel: {
          margin: 30,
          color: '#9e9e9e',
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: true,
          length: 25,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
      },
      yAxis: [{
        type: 'value',
        position: 'right',
        axisLabel: {
          margin: 20,
          color: '#9e9e9e',
        },
        axisTick: {
          show: true,
          length: 15,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
            width: 1,
          },
        },
      }],
      series: [{
        name: langMap[0x3004],
        type: 'line',
        smooth: 0.5,
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 0,
        lineStyle: {
          normal: {
            color: '#92E7FF', // 线条颜色
          },
        },
        itemStyle: {
          color: '#92E7FF',
          borderColor: '#fff',
          borderWidth: 0,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#0CB5E533',
            },
            {
              offset: 1,
              color: '#0CB5E500',
            },
            ], false),
          },
        },
        data: [10000, 10075, 11003, 11155, 11212, 11255, 12301, 12499, 12511, 12600],
      }],
    };

    Chart5.setOption(option5);


    const Chart6 = echarts.init(document.getElementById('chart6'));
    const option6 = {
      backgroundColor: 'transparent',
      title: {
        text: langMap[0x3005],
        left: 'center',
        textStyle: {
          color: '#333333',
          fontSize: 16,
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      grid: {
        top: '40',
        left: '20',
        right: '0',
        bottom: '20',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['', '', '', '', '', '', '', '', '', ''],
        axisLabel: {
          margin: 30,
          color: '#9e9e9e',
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: true,
          length: 25,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
      },
      yAxis: [{
        type: 'value',
        position: 'right',
        axisLabel: {
          margin: 20,
          color: '#9e9e9e',
        },
        axisTick: {
          show: true,
          length: 15,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(209,209,209,0.5)',
            width: 1,
          },
        },
      }],
      series: [{
        name: langMap[0x3005],
        type: 'line',
        smooth: 0.5,
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 0,
        lineStyle: {
          normal: {
            color: '#92E7FF', // 线条颜色
          },
        },
        itemStyle: {
          color: '#92E7FF',
          borderColor: '#fff',
          borderWidth: 0,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#0CB5E533',
            },
            {
              offset: 1,
              color: '#0CB5E500',
            },
            ], false),
          },
        },
        data: [400, 415, 425, 450, 477, 533, 550, 600, 612, 666],
      }],
    };

    Chart6.setOption(option6);
  }

  render() {
    return pug`
      ChartsMain
    `;
  }
}

export default Charts;