/**
 * 解析精密空调数据
 */
import Tools from "../Tools/utils";
export default function renderData(data) {
  if ((data.status == 1 || data.status == 2) && data.deviceInfo != null) {
    let deviceInfo = data.deviceInfo;
    let modelType = !Tools.isNull(deviceInfo.col9) ? deviceInfo.col9 : "";
    let systemExplainArr = !Tools.isNull(modelType)
      ? String(Number(deviceInfo.col10).toString(2)).split("")
      : ""; //转为16位二进制
    let SetRetTempHigh = !Tools.isNull(deviceInfo.col20)
      ? Number(deviceInfo.col20) / 10
      : ""; //设置回风高温告警阈值
    let SetRetTempLow = !Tools.isNull(deviceInfo.col21)
      ? Number(deviceInfo.col21) / 10
      : ""; //设置回风低温告警阈值
    let SetRetHimiHigh = !Tools.isNull(deviceInfo.col22)
      ? Number(deviceInfo.col22) / 10
      : ""; //设置回风高湿告警阈值
    let SetRetHimiLow = !Tools.isNull(deviceInfo.col23)
      ? Number(deviceInfo.col23) / 10
      : ""; //设置回风低湿告警阈值
    let SetSendTempHigh = !Tools.isNull(deviceInfo.col24)
      ? Number(deviceInfo.col24) / 10
      : ""; //设置送风高温告警阈值
    let SetSendTempLow = !Tools.isNull(deviceInfo.col25)
      ? Number(deviceInfo.col25) / 10
      : ""; //设置送风低温告告警阈值
    return {
      devTypeName: data.devName, //名字
      devId: data.devId, //设备 id
      devType: data.devType, //类型
      devName: data.devName, //设备名字
      typeName: data.devTypeName, //设备类型名字:1:精密空调;2:普通空调;3:中央空调;4:加湿机
      status: data.status, //状态:1:开机;2：关机;3:离线;4:停用;5:维修;6:报废;7:启用
      statusBoolean: data.status == 1 ? true : false,
      mqttId: data.mqttId, //设备所在mqt服务器
      statusName:
        data.status == 1
          ? "开机"
          : data.status == 2
            ? "关机"
            : data.status == 3
              ? "离线"
              : data.status == 4
                ? "停用"
                : data.status == 5
                  ? "维修"
                  : data.status == 6
                    ? "报废"
                    : "启用",
      template:
        modelType == 0
          ? Number(deviceInfo.col1) / 10
          : Number(deviceInfo.col5) / 10, //设定温度
      humidity: !Tools.isNull(deviceInfo.col2)
        ? Number(deviceInfo.col2) / 10
        : "", //设定湿度
      modelType: modelType, //模式:0回风:1送风
      modelTypeName: modelType == 0 ? "回风" : "送风",
      intoTem: !Tools.isNull(deviceInfo.col3)
        ? Number(deviceInfo.col3) / 10
        : "", //室内温度
      intoHum: !Tools.isNull(deviceInfo.col4)
        ? Number(deviceInfo.col4) / 10
        : "", //室内湿度
      windSpeedType: !Tools.isNull(deviceInfo.col19) ? deviceInfo.col19 : "", //风速
      hotTemRange: 35, // 调温热范围
      colTemRange: 15, // 调温冷范围
      hotHumRange: 80, // 调湿热范围
      colHumRange: 20, // 调湿冷范围

      //只读
      GetRetTemp: !Tools.isNull(deviceInfo.col3)
        ? Number(deviceInfo.col3) / 10
        : "", //回风温度测量值
      GetRetHimi: !Tools.isNull(deviceInfo.col4)
        ? Number(deviceInfo.col4) / 10
        : "", //回风湿度测量值
      GetHimiElec: !Tools.isNull(deviceInfo.col17) ? deviceInfo.col17 : "", //加湿电流
      GetConductivity: !Tools.isNull(deviceInfo.col18) ? deviceInfo.col18 : "", //电导率
      GetSpeed: !Tools.isNull(deviceInfo.col19) ? deviceInfo.col19 : "", //送风机转速
      GetsystemExplain:
        systemExplainArr.length > 15
          ? systemExplainArr
          : ["0", ...systemExplainArr], //系统状态
      GetVoltageA: !Tools.isNull(deviceInfo.col29) ? deviceInfo.col29 : "", //A相电压
      GetVoltageB: !Tools.isNull(deviceInfo.col30) ? deviceInfo.col30 : "", //B相电压
      GetVoltageC: !Tools.isNull(deviceInfo.col31) ? deviceInfo.col31 : "", //C相电压
      GetGridFreq: !Tools.isNull(deviceInfo.col32) ? deviceInfo.col32 : "", //电网频率

      //写入
      SetRetTemp: !Tools.isNull(deviceInfo.col1)
        ? Number(deviceInfo.col1) / 10
        : "", //设置回风温度
      SetRetHimi: !Tools.isNull(deviceInfo.col2)
        ? Number(deviceInfo.col2) / 10
        : "", //设置回风湿度
      SetSendTemp: !Tools.isNull(deviceInfo.col5)
        ? Number(deviceInfo.col5) / 10
        : "", //设置送风温度
      SetSendHimi: !Tools.isNull(deviceInfo.col6)
        ? Number(deviceInfo.col6) / 10
        : "", //设置送风湿度
      SetTempMode: !Tools.isNull(deviceInfo.col9)
        ? Number(deviceInfo.col9)
        : "", //温度控制方式:0:回风；1:送风
      SetRetTempHigh: SetRetTempHigh, //设置回风高温告警阈值
      SetRetTempLow: SetRetTempLow, //设置回风低温告警阈值
      SetRetHimiHigh: SetRetHimiHigh, //设置回风高湿告警阈值
      SetRetHimiLow: SetRetHimiLow, //设置回风低湿告警阈值
      SetSendTempHigh: SetSendTempHigh, //设置送风高温告警阈值
      SetSendTempLow: SetSendTempLow, //设置送风低温告告警阈值
      getRetTempRank:
        SetRetTempHigh != "" && SetRetTempLow != ""
          ? [SetRetTempLow, SetRetTempHigh]
          : "",
      getRetHimiRank:
        SetRetHimiHigh != "" && SetRetHimiLow != ""
          ? [SetRetHimiLow, SetRetHimiHigh]
          : "",
      getSendTempRank:
        SetSendTempLow != "" && SetSendTempHigh != ""
          ? [SetSendTempLow, SetSendTempHigh]
          : ""
    };
  } else {
    return {
      devTypeName: data.devName, //名字
      devId: data.devId, //设备 id
      devType: data.devType, //类型
      devName: data.devName, //设备名字
      typeName: data.devTypeName, //设备类型名字:1:精密空调;2:普通空调;3:中央空调;4:加湿机
      status: data.status, //状态:1:开机;2：关机;3:离线;4:停用;5:维修;6:报废;7:启用
      statusBoolean: data.status == 1 ? true : false,
      mqttId: data.mqttId, //设备所在mqt服务器
      statusName:
        data.status == 1
          ? "开机"
          : data.status == 2
            ? "关机"
            : data.status == 3
              ? "离线"
              : data.status == 4
                ? "停用"
                : data.status == 5
                  ? "维修"
                  : data.status == 6
                    ? "报废"
                    : "启用"
    };
  }
}
