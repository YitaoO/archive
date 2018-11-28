import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import * as echarts from "../../components/ec-canvas/echarts.common.min.js";
let barec = null;

@connect(({ statistics }) => ({
  statistics
}))
export default class OilAndDisEchart extends Component {
  config = {
    usingComponents: {
      "ec-canvas": "../../components/ec-canvas/ec-canvas" // 书写第三方组件的相对路径
    }
  };
  constructor(props) {
    super(props);

    this.state = {
      carName: "",
      carNumber: "",
      bdate: "",
      edate: "",
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
    const { WarningReports } = this.props.statistics;

    const xData = [];
    const y1Data = [];
    const y2Data = [];
    WarningReports.forEach(item => {
      xData.push(item.xParameter);
      y1Data.push(item.tankCalibration);
      y2Data.push(item.trafficMileage);
    });

    let Options = {
      calculable: true,
      // tooltip: {
      //   trigger: "item"
      // },
      toolbox: {
        show: false
      },
      legend: {
        data: ["耗油量", "行驶里程"]
      },
      grid: {
        top: "20%",
        left: "-2%",
        right: "10%",
        bottom: "3%",
        containLabel: true
      },
      color: ["#32b1dc", "#98e942"],
      xAxis: [
        {
          type: "value",
          name: "L",
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
          name: "km",
          show: true,
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
            show: false
          }
        }
      ],
      series: [
        {
          name: "耗油量",
          type: "bar",
          data: y1Data,
          barGap: "50%",
          label: {
            show: true,
            position: "right",
            distance: 4,
            color: "#666666"
          }
        },
        {
          name: "行驶里程",
          type: "bar",
          data: y2Data,
          xAxisIndex: 1,
          barCategoryGap: "30%",
          label: {
            show: true,
            position: "right",
            distance: 4,
            color: "#666666"
          }
        }
      ]
    };

    barec.setOption(Options);
  };
  render() {
    return (
      <ec-canvas
        id="mychart-OilAndDisEchart"
        canvas-id="mychart-OilAndDisEchart"
        canvas-disable={false}
        ec={this.state.ec}
      />
    );
  }
}
