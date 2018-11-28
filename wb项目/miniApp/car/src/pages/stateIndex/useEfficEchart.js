import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import * as echarts from "../../components/ec-canvas/echarts.common.min.js";
let barec = null;

@connect(({ statistics }) => ({
  statistics
}))
export default class UseEfficEchart extends Component {
  config = {
    usingComponents: {
      "ec-canvas": "../../components/ec-canvas/ec-canvas" // 书写第三方组件的相对路径
    }
  };
  constructor(props) {
    super(props);

    this.state = {
      ec: {
        onInit: function(canvas, width, height) {
          barec = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(barec);
          return barec;
        }
      }
    };
  }
  componentWillMount() {
    setTimeout(() => {
      this.renderEchart();
    }, 500);
  }

  renderEchart = () => {
    const { UseEffic } = this.props.statistics;

    const xData = [];
    const trafficData = [];
    const idleData = [];
    const effic = [];
    UseEffic.forEach(item => {
      xData.push(item.carNumber);
      trafficData.push((item.trafficDuration / 3600).toFixed(1));
      idleData.push((item.idleDuration / 3600).toFixed(1));
      effic.push(item.effic);
    });

    barec.setOption({
      //TODO:这里如果折线图的话会重叠，所以暂时全部用方块，待解决
      legend: {
        data: [
          { name: "行驶时长", icon: "rect" },
          { name: "怠速时长", icon: "rect" },
          { name: "使用率", icon: "diamond" }
        ]
      },
      tooltip: {
        trigger: "axis"
      },
      toolbox: {
        show: false
      },
      color: ["#678af2", "#98e942", "#f6de16"],
      grid: {
        left: "-2%",
        right: "10%",
        bottom: "10%",
        containLabel: true
      },
      yAxis: [
        {
          type: "category",
          data: xData,
          axisLabel: {
            rotate: 40
          },
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#dddddd",
              type: "dashed"
            }
          }
        }
      ],
      xAxis: [
        {
          type: "value",
          name: "h",
          position: "left",
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          splitLine: {
            show: false
          }
        },
        {
          type: "value",
          // name: "%",
          show: true,
          position: "right",
          axisLabel: {
            formatter: "{value} %"
          },
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: "怠速时长",
          type: "bar",
          stack: "总量",
          data: idleData,
          barMaxWidth: 15
        },
        {
          name: "行驶时长",
          type: "bar",
          stack: "总量",
          barMaxWidth: 15,
          data: trafficData,
          label: {
            show: true,
            // position: "right",
            distance: 10,
            color: "#666666",
            formatter: function(p) {
              let data = "";
              effic.forEach((item, key) => {
                if (p.dataIndex == key) {
                  data = `${item}%`;
                  return;
                }
              });
              return data;
            }
          }
        },
        {
          name: "使用率",
          xAxisIndex: 1,
          type: "line",
          data: effic,
          // symbol: "circle",
          // symbolSize: 6,
          itemStyle: {
            normal: {
              color: "#ffa210"
            }
          },
          // label: {
          //   show: true,
          //   position: "right",
          //   distance: 8,
          //   color: "#666666"
          // },
          lineStyle: {
            color: "#f6de16"
          }
        }
      ]
    });
  };
  render() {
    return (
      <ec-canvas
        id="mychart-UseEfficEchart"
        canvas-id="mychart-UseEfficEchart"
        canvas-disable={false}
        ec={this.state.ec}
      />
    );
  }
}
