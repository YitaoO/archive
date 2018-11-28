import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import * as echarts from "../../components/ec-canvas/echarts.common.min.js";
import "./index.scss";
let barec = null;

@connect(({ statistics }) => ({
  statistics
}))
export default class HundredEchart extends Component {
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
      },
      noData: false
    };
  }
  componentWillMount() {
    setTimeout(() => {
      this.renderEchart();
    }, 500);
  }

  renderEchart = () => {
    const { FuelPerOneHunKm } = this.props.statistics;

    if (FuelPerOneHunKm.length == 0) {
      this.setState({
        noData: true
      });
      return;
    }

    const xData = [];
    const tankData = [];
    const tankHistoryData = [];
    FuelPerOneHunKm.forEach(item => {
      xData.push(item.carNumber);
      tankData.push(item.avgTankCalibration);
      tankHistoryData.push(item.avgHistoryTankCalibration);
    });

    barec.setOption({
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: [
          { name: "历史均值", icon: "diamond" },
          { name: "怠速时长", icon: "diamond" }
        ]
      },

      toolbox: {
        show: false
      },
      color: ["#f6de16", "#0dbe3f"],
      grid: {
        left: "4%",
        right: "2%",
        bottom: "5%",
        // top:'8%',
        containLabel: true
      },
      xAxis: [
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
            show: true,
            lineStyle: {
              color: "#dddddd",
              type: "dashed"
            }
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "L/100km",
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#dddddd",
              type: "dashed"
            }
          }
        }
      ],
      series: [
        {
          name: "历史均值",
          type: "line",
          data: tankHistoryData,
          symbol: "circle",
          symbolSize: 4
          // label: {
          //   show: true,
          //   position: "top",
          //   distance: 10,
          //   color: "#666666"
          // }
        },
        {
          name: "怠速时长",
          type: "line",
          data: tankData,
          symbol: "circle",
          symbolSize: 1
          // label: {
          //   show: true,
          //   position: "top",
          //   bottom: 20,
          //   distance: 10,
          //   color: "#666666"
          // }
        }
      ]
    });
  };
  render() {
    return (
      <View className="echart-wrap">
        {!noData && (
          <ec-canvas
            id="mychart-HundredEchart"
            canvas-id="mychart-HundredEchart"
            canvas-disable={false}
            ec={this.state.ec}
          />
        )}
        {!!noData && <View className="no-date">暂无数据</View>}
      </View>
    );
  }
}
