/**
 * 解析中央空调数据
 */
export default function renderData(data) {
  if ((data.status == 1 || data.status == 2) && data.deviceInfo != null) {
    let deviceInfo = data.deviceInfo
    let year = (!wx.Tools.isNull(deviceInfo.col15)) ? deviceInfo.col15 : ''
    let month = (!wx.Tools.isNull(deviceInfo.col16)) ? deviceInfo.col16.split(',')[0] : ''
    let week = (!wx.Tools.isNull(deviceInfo.col16)) ? deviceInfo.col16.split(',')[1] : ''
    let day = (!wx.Tools.isNull(deviceInfo.col17)) ? deviceInfo.col17.split(',')[0] : ''
    let hour = (!wx.Tools.isNull(deviceInfo.col17)) ? deviceInfo.col17.split(',')[1] : ''
    let minute = (!wx.Tools.isNull(deviceInfo.col18)) ? deviceInfo.col18.split(',')[0] : ''
    let second = (!wx.Tools.isNull(deviceInfo.col18)) ? deviceInfo.col18.split(',')[1] : ''

    let TimeOne = (!wx.Tools.isNull(deviceInfo.col19)) ? timeFor(deviceInfo.col19.split(',')) : ''
    let TimeTwo = (!wx.Tools.isNull(deviceInfo.col20)) ? timeFor(deviceInfo.col20.split(',')) : ''
    let TimeThree = (!wx.Tools.isNull(deviceInfo.col21)) ? timeFor(deviceInfo.col21.split(',')) : ''
    let TimeFour = (!wx.Tools.isNull(deviceInfo.col22)) ? timeFor(deviceInfo.col22.split(',')) : ''
    let TimeOneCtrol = (!wx.Tools.isNull(deviceInfo.col19)) ? arrFor(deviceInfo.col19.split(',')) : '' //是否第一时段控制
    let TimeTwoCtrol = (!wx.Tools.isNull(deviceInfo.col20)) ? arrFor(deviceInfo.col20.split(',')) : '' //是否第二时段控制
    let TimeThreeCtrol = (!wx.Tools.isNull(deviceInfo.col21)) ? arrFor(deviceInfo.col21.split(',')) : '' //是否第三时段控制
    let TimeFourCtrol = (!wx.Tools.isNull(deviceInfo.col22)) ? arrFor(deviceInfo.col22.split(',')) : '' //是否第四时段控制

    let nowDataStart = (!wx.Tools.isNull(deviceInfo.col18)) ? timeFor(deviceInfo.col17.split(',')) : '' //当前时间小时
    let nowDataEnd = (!wx.Tools.isNull(deviceInfo.col18)) ? timeFor(deviceInfo.col18.split(',')) : '' //当前时间分钟

    return {
      devTypeName: data.devName, //名字
      status: data.status, //状态:1:开机;2：关机;3:离线;4:停用;5:维修;6:报废
      statusName: (data.status == 1) ? '开机' : (data.status == 2) ? '关机' : (data.status == 3) ? '离线' : (data.status == 4) ? '停用' : (data.status == 5) ? '维修' : (data.status == 6) ? '报废' : '启用',
      devId: data.devId, //设备 id
      devType: data.devType, //类型
      devName: data.devName, //设备名字
      typeName: data.devTypeName, //设备类型名字:1:精密空调;2:普通空调;3:中央空调;4:加湿机
      mqttId: data.mqttId, //设备所在mqt服务器
      hotTemRange: (!wx.Tools.isNull(deviceInfo.col5)) ? deviceInfo.col5.split(',') : '', // 制热范围
      colTemRange: (!wx.Tools.isNull(deviceInfo.col6)) ? deviceInfo.col6.split(',') : '', // 制冷范围

      //写入
      windSpeedType: (!wx.Tools.isNull(deviceInfo.col1)) ? deviceInfo.col1.split(',')[1] : '', //风速:0低速 1中速 2高速 3自动速度 4关闭
      modelType: (!wx.Tools.isNull(deviceInfo.col2)) ? deviceInfo.col2.split(',')[0] : '', //模式:0取暖:1制冷:2睡眠:3唤醒:4关闭
      template: (!wx.Tools.isNull(deviceInfo.col2)) ? Number(deviceInfo.col2.split(',')[1]) : '', //室内温度
      TimeControl: (!wx.Tools.isNull(deviceInfo.col3)) ? Boolean(Number(deviceInfo.col3.split(',')[1])) : '', //时间段控制
      HotHigh: (!wx.Tools.isNull(deviceInfo.col5)) ? deviceInfo.col5.split(',')[0] : '', // 取暖温度上限
      HotLow: (!wx.Tools.isNull(deviceInfo.col5)) ? deviceInfo.col5.split(',')[1] : '', // 取暖温度下限
      ColHigh: (!wx.Tools.isNull(deviceInfo.col6)) ? deviceInfo.col6.split(',')[0] : '', // 制冷温度上限
      ColLow: (!wx.Tools.isNull(deviceInfo.col6)) ? deviceInfo.col6.split(',')[1] : '', // 制冷温度下限
      TimeOneCtrol: TimeOneCtrol,
      TimeTwoCtrol: TimeTwoCtrol,
      TimeThreeCtrol: TimeThreeCtrol,
      TimeFourCtrol: TimeFourCtrol,
      TimeOneStart: (TimeOne != '') ? `${TimeOne[0]}:${TimeOne[1]}` : '', //第一时段开始
      TimeOneEnd: (TimeOne != '') ? `${TimeOne[2]}:${TimeOne[3]}` : '', //第一时段结束
      TimeTwoStart: (TimeTwo != '') ? `${TimeTwo[0]}:${TimeTwo[1]}` : '', //第二时段开始
      TimeTwoEnd: (TimeTwo != '') ? `${TimeTwo[2]}:${TimeTwo[3]}` : '', //第二时段结束
      TimeThreeStart: (TimeThree != '') ? `${TimeThree[0]}:${TimeThree[1]}` : '', //第三时段开始
      TimeThreeEnd: (TimeThree != '') ? `${TimeThree[2]}:${TimeThree[3]}` : '', //第三时段结束
      TimeFourStart: (TimeFour != '') ? `${TimeFour[0]}:${TimeFour[1]}` : '', //第四时段开始
      TimeFourEnd: (TimeFour != '') ? `${TimeFour[2]}:${TimeFour[3]}` : '', //第四时段结束

      //只读
      intoTemperature: (!wx.Tools.isNull(deviceInfo.col14)) ? deviceInfo.col14.split(',')[1] : '', //室内温度
      clock: (year != '' && hour != '' && second != '') ? `${year}-${month}-${day} ${hour}:${minute}:${second}` : '', //时钟
      week: (week != '') ? week : '', //星期
      nowData: (nowDataStart != '' && nowDataEnd != '') ? `${nowDataStart[1]}:${nowDataEnd[0]}` : '' //当前时间
    }

  } else {
    return {
      devTypeName: data.devName, //名字
      status: data.status, //状态:1:开机;2：关机;3:离线;4:停用;5:维修;6:报废
      devId: data.devId, //设备 id
      devType: data.devType, //类型
      devName: data.devName, //设备名字
      typeName: data.devTypeName, //设备类型名字:1:精密空调;2:普通空调;3:中央空调;4:加湿机
      status: data.status,
      mqttId: data.mqttId, //设备所在mqt服务器
      statusName: (data.status == 1) ? '开机' : (data.status == 2) ? '关机' : (data.status == 3) ? '离线' : (data.status == 4) ? '停用' : (data.status == 5) ? '维修' : (data.status == 6) ? '报废' : '启用'
    }
  }
}

/**
 * 数组循环
 * return 是否控制时间
 */
function arrFor(arr) {
  let OldLength = arr.length
  let newLength = 0
  arr.forEach(function(item) {
    if (item == 0) {
      newLength++
    }
  })
  return (OldLength == newLength) ? false : true
}
/**
 * 修改时间格式
 *
 */
function timeFor(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 10) {
      arr[i] = '0' + arr[i]
    }
  }
  return arr
}