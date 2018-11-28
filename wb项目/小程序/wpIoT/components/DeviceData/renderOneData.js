/**
 * 解析精密空调数据
 */
export default function renderData(data) {
  if ((data.status == 1 || data.status == 2) && data.deviceInfo != null) {
    let deviceInfo = data.deviceInfo
    let modelType = (!wx.Tools.isNull(deviceInfo.col9)) ? deviceInfo.col9 : ''
    let systemExplainArr = (!wx.Tools.isNull(modelType)) ? String(Number(deviceInfo.col10).toString(2)).split('') : '' //转为16位二进制
    return {
      devTypeName: data.devName, //名字
      devId: data.devId, //设备 id
      devType: data.devType, //类型
      devName: data.devName, //设备名字
      typeName: data.devTypeName, //设备类型名字:1:精密空调;2:普通空调;3:中央空调;4:加湿机
      status: data.status, //状态:1:开机;2：关机;3:离线;4:停用;5:维修;6:报废;7:启用
      mqttId: data.mqttId, //设备所在mqt服务器
      statusName: (data.status == 1) ? '开机' : (data.status == 2) ? '关机' : (data.status == 3) ? '离线' : (data.status == 4) ? '停用' : (data.status == 5) ? '维修' : (data.status == 6) ? '报废' : '启用',
      template: (modelType == 0) ? Number(deviceInfo.col1) / 10 : Number(deviceInfo.col5) / 10, //设定温度
      humidity: (!wx.Tools.isNull(deviceInfo.col2)) ? Number(deviceInfo.col2) / 10 : '', //设定湿度
      modelType: modelType, //模式:0回风:1送风
      intoTem: (!wx.Tools.isNull(deviceInfo.col3)) ? Number(deviceInfo.col3) / 10 : '', //室内温度
      intoHum: (!wx.Tools.isNull(deviceInfo.col4)) ? Number(deviceInfo.col4) / 10 : '', //室内湿度
      windSpeedType: (!wx.Tools.isNull(deviceInfo.col19)) ? deviceInfo.col19 : '', //风速
      hotTemRange: 35, // 调温热范围
      colTemRange: 15, // 调温冷范围
      hotHumRange: 80, // 调湿热范围
      colHumRange: 20, // 调湿冷范围

      //只读
      GetRetTemp: (!wx.Tools.isNull(deviceInfo.col3)) ? Number(deviceInfo.col3) / 10 : '', //回风温度测量值
      GetRetHimi: (!wx.Tools.isNull(deviceInfo.col4)) ? Number(deviceInfo.col4) / 10 : '', //回风湿度测量值
      GetHimiElec: (!wx.Tools.isNull(deviceInfo.col17)) ? deviceInfo.col17 : '', //加湿电流
      GetConductivity: (!wx.Tools.isNull(deviceInfo.col18)) ? deviceInfo.col18 : '', //电导率
      GetSpeed: (!wx.Tools.isNull(deviceInfo.col19)) ? deviceInfo.col19 : '', //送风机转速
      GetsystemExplain: (systemExplainArr.length > 15) ? systemExplainArr : ['0', ...systemExplainArr], //系统状态
      GetVoltageA: (!wx.Tools.isNull(deviceInfo.col29)) ? deviceInfo.col29 : '', //A相电压
      GetVoltageB: (!wx.Tools.isNull(deviceInfo.col30)) ? deviceInfo.col30 : '', //B相电压
      GetVoltageC: (!wx.Tools.isNull(deviceInfo.col31)) ? deviceInfo.col31 : '', //C相电压
      GetGridFreq: (!wx.Tools.isNull(deviceInfo.col32)) ? deviceInfo.col32 : '', //电网频率

      //写入
      SetRetTemp: (!wx.Tools.isNull(deviceInfo.col1)) ? Number(deviceInfo.col1) / 10 : '', //设置回风温度
      SetRetHimi: (!wx.Tools.isNull(deviceInfo.col2)) ? Number(deviceInfo.col2) / 10 : '', //设置回风湿度
      SetSendTemp: (!wx.Tools.isNull(deviceInfo.col5)) ? Number(deviceInfo.col5) / 10 : '', //设置送风温度
      SetSendHimi: (!wx.Tools.isNull(deviceInfo.col6)) ? Number(deviceInfo.col6) / 10 : '', //设置送风湿度
      SetTempMode: (!wx.Tools.isNull(deviceInfo.col9)) ? Number(deviceInfo.col9) : '', //温度控制方式:0:回风；1:送风
      SetRetTempHigh: (!wx.Tools.isNull(deviceInfo.col20)) ? Number(deviceInfo.col20) / 10 : '', //设置回风高温告警阈值
      SetRetTempLow: (!wx.Tools.isNull(deviceInfo.col21)) ? Number(deviceInfo.col21) / 10 : '', //设置回风低温告警阈值
      SetRetHimiHigh: (!wx.Tools.isNull(deviceInfo.col22)) ? Number(deviceInfo.col22) / 10 : '', //设置回风高湿告警阈值
      SetRetHimiLow: (!wx.Tools.isNull(deviceInfo.col23)) ? Number(deviceInfo.col23) / 10 : '', //设置回风低湿告警阈值
      SetSendTempHigh: (!wx.Tools.isNull(deviceInfo.col24)) ? Number(deviceInfo.col24) / 10 : '', //设置送风高温告警阈值
      SetSendTempLow: (!wx.Tools.isNull(deviceInfo.col25)) ? Number(deviceInfo.col25) / 10 : '' //设置送风低温告告警阈值
    }
  } else {
    return {
      devTypeName: data.devName, //名字
      devId: data.devId, //设备 id
      devType: data.devType, //类型
      devName: data.devName, //设备名字
      typeName: data.devTypeName, //设备类型名字:1:精密空调;2:普通空调;3:中央空调;4:加湿机
      status: data.status, //状态:1:开机;2：关机;3:离线;4:停用;5:维修;6:报废;7:启用
      mqttId: data.mqttId, //设备所在mqt服务器
      statusName: (data.status == 1) ? '开机' : (data.status == 2) ? '关机' : (data.status == 3) ? '离线' : (data.status == 4) ? '停用' : (data.status == 5) ? '维修' : (data.status == 6) ? '报废' : '启用'
    }
  }

}