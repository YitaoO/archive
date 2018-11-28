import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import * as echarts from "../../components/ec-canvas/echarts.common.min.js";
import { View } from "_@tarojs_components@1.0.7@@tarojs/components/types";
let barec = null;
import "./index.scss";
@connect(({ statistics }) => ({
  statistics
}))
export default class WaterEchart extends Component {
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
    const { WarningReports } = this.props.statistics;
    const xData = [];
    const yData = [];
    let noDataLenght = 0;
    WarningReports.forEach(item => {
      xData.push(item.xParameter);
      yData.push(item.waterConsumption);
      if (item.waterConsumption == 0) {
        noDataLenght++;
      }
    });
    if (noDataLenght == WarningReports.length) {
      this.setState({
        noData: true
      });
      return;
    }

    barec.setOption({
      // tooltip: {
      //   trigger: "item"
      // },
      toolbox: {
        show: false
      },
      color: ["#32b1dc"],
      grid: {
        top: "5%",
        left: "-2%",
        right: "10%",
        bottom: "3%",
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
            show: false
          }
        }
      ],
      xAxis: [
        {
          type: "value",
          name: "T",
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
          name: "",
          type: "bar",
          data: yData,
          barMaxWidth: 15,
          label: {
            show: true,
            position: "right",
            distance: 8,
            color: "#666666"
          }
        }
      ]
    });
  };
  render() {
    return (
      <View className="echart-wrap">
        {!noData && (
          <ec-canvas
            id="mychart-WaterEchart"
            canvas-id="mychart-WaterEchart"
            canvas-disable={false}
            ec={this.state.ec}
          />
        )}
        {!!noData && <View className="no-date">暂无数据</View>}
      </View>
    );
  }
}
