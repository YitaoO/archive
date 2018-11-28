/**
 * 读取数据库样式
 */
export default function renderData(data) {
  return {
    devTypeName: data.devName, //名字
    status: data.status, //状态:1:开机;2：关机;3:离线;4:停用;5:维修;6:报废
    devId: data.devId, //设备 id
    devType: data.devType, //类型
    devName: data.devName, //设备名字
    typeName: data.devTypeName, //设备类型名字:1:精密空调;2:普通空调;3:中央空调;4:加湿机
    status: data.status,
    mqttId: data.mqttId, //设备所在mqt服务器
    statusName: data.statusName
  };
}
