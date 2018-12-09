import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import * as echarts from "../../components/ec-canvas/echarts.common.min.js";
import Dialog from "../../components/dialog";
import { reqStatisticsDetail } from "../../services/api";
import "./index.scss";
let barec = null;

export default class oilWaterDetail extends Component {
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
        // disableTouch: true,
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
    const params = this.$router.params;

    Taro.setNavigationBarTitle({
      title: params.index == 4 ? "燃油详情" : "洒水详情"
    });

    setTimeout(() => {
      this.setState({
        carName: params.carName,
        carNumber: params.carNumber,
        bdate: params.bdate.substr(0, 10),
        edate: params.edate.substr(0, 10)
      });
      this.getData(params);
    }, 500);
  }

  getData = params => {
    Dialog.showLoading("请等待...");
    params.bdate =
      params.bdate.length > 13 ? params.bdate : `${params.bdate} 00:00:00`;
    params.edate =
      params.edate.length > 13 ? params.edate : `${params.edate} 23:59:59`;
    reqStatisticsDetail("/gpsdevicebuffers/getCarFuleLevel", {
      simno: params.simno,
      bdate: `${params.bdate}`,
      edate: `${params.edate}`,
      type: params.index == 4 ? 2 : 3
    }).then(function(datas) {
      let arr = [];
      let yArr = [];
      datas.forEach(item => {
        let value = 0;
        switch (params.index) {
          case "4":
            value = item.orgFuelLevel > 0 ? item.orgFuelLevel : item.fuelLevel;
            break;
          default:
            value =
              item.orgWaterLevel > 0 ? item.orgWaterLevel : item.waterLevel;
            break;
        }
        arr.push({
          name: value,
          value: [item.addDate, value]
        });
        yArr.push(value);
      });

      let max = parseInt(Math.max(...yArr)) + 1;
      let min = parseInt(Math.min(...yArr));

      Dialog.showLoading("请等待...");
      barec.setOption({
        color: "#3ab363",
        xAxis: {
          type: "time"
        },
        yAxis: {
          name:
            params.index == 4
              ? !!datas[0].fuelLevelFlag
                ? "耗油量(L)"
                : "耗油量(cm)"
              : !!datas[0].waterLevelFlag
              ? "洒水量(T)"
              : "洒水量(cm)",
          type: "value",
          // data: yArr,
          max: max,
          min: params.index == 4 ? min : 0,
          boundaryGap: [0, "100%"]
        },
        grid: {
          top: 30,
          bottom: 20,
          left: 35,
          right: 35
          // containLabel: true
        },
        series: [
          {
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            data: arr
          }
        ]
      });
      Dialog.hideLoading();
    });
  };
  render() {
    return (
      <View className="oil-water-detail-wrap">
        <View className="detail-top">
          <View className="name">{this.state.carName}</View>
          <View className="number">车牌号： {this.state.carNumber}</View>
          <View className="time">
            {this.state.bdate} 至 {this.state.edate}
          </View>
        </View>
        <ec-canvas
          id="mychart-dom-area"
          canvas-id="mychart-area"
          canvas-disable={true}
          ec={this.state.ec}
        />
      </View>
    );
  }
}
