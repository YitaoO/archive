import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import * as echarts from "../../components/ec-canvas/echarts.common.min.js";
let barec = null;

@connect(({ statistics }) => ({
  statistics
}))
export default class AlermEchart extends Component {
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
    const y3Data = [];
    const y4Data = [];
    WarningReports.forEach(item => {
      xData.push(item.xParameter);
      y1Data.push(item.overSpeedWarning);
      y2Data.push(item.idelSpeedWarning);
      y3Data.push(item.oilWarning);
      y4Data.push(item.stationWarning);
    });

    barec.setOption({
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: [
          { name: "油位告警", icon: "diamond" },
          { name: "出围栏告警", icon: "diamond" }
        ]
      },
      toolbox: {
        show: false
      },
      color: ["#12d2d1", "#0dbe3f"],
      grid: {
        left: "4%",
        right: "3%",
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
          name: "次数",
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
        // {
        //   name:'超速告警',
        //   type: 'line',
        //   data: y1Data,
        //   symbol:'circle',
        //   symbolSize:4,
        //   label: {
        //     show: true,
        //     position: "top",
        //     distance:5,
        //     color:'#666666',
        //   }
        // },
        // {
        //   name:'怠速告警',
        //   type: 'line',
        //   data: y2Data,
        //   symbol:'circle',
        //   symbolSize:4,
        //   label: {
        //     show: true,
        //     position: "top",
        //     distance:5,
        //     color:'#666666',
        //   }
        // },
        {
          name: "油位告警",
          type: "line",
          data: y3Data,
          symbol: "circle",
          symbolSize: 4
          // label: {
          //   show: true,
          //   position: "top",
          //   distance:5,
          //   color:'#666666',
          // }
        },
        {
          name: "出围栏告警",
          type: "line",
          data: y4Data,
          symbol: "circle",
          symbolSize: 4
          // label: {
          //   show: true,
          //   position: "top",
          //   distance:5,
          //   color:'#666666',
          // }
        }
      ]
    });
  };
  render() {
    return (
      <ec-canvas
        id="mychart-AlermEchart"
        canvas-id="mychart-AlermEchart"
        canvas-disable={false}
        ec={this.state.ec}
      />
    );
  }
}
