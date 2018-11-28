/**
 * 处理空调设备数据
 */
export default function renderData(data) {
  let modelType = data.deviceInfo.col2.split(',')[0]
  let windSpeedType = data.deviceInfo.col1.split(',')[1]
  let hotRange = data.deviceInfo.col5.split(',')
  let colRange = data.deviceInfo.col6.split(',')
  return {
    devTypeName: data.devName, //名字
    status: data.status, //状态:1:开机;2：关机;3:离线;4:停用;5:维修;6:报废
    devId: data.devId, //设备 id
    devType: data.devType, //类型
    devName: data.devName, //设备名字
    typeName: data.devTypeName, //设备类型名字:1:精密空调;2:普通空调;3:中央空调;4:加湿机
    template: Number(data.deviceInfo.col2.split(',')[1]), //室内温度
    modelType: modelType, //模式:0取暖:1制冷:2睡眠:3唤醒:4关闭
    windSpeedType: windSpeedType, //风机:0低速 1中速 2高速 3自动速度 4关闭
    intoTemperature: data.deviceInfo.col14.split(',')[1], //室内温度
    hotRange: hotRange, // 制热范围
    colRange: colRange // 制冷范围
  }
}
