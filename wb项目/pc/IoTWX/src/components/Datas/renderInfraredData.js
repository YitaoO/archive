/**
 * 解析红外数据
 */

export default function renderData(data) {
  let item = {
    devTypeName: data.devName, //名字
    status: data.status, //状态:1:开机;2：关机;3:离线;4:停用;5:维修;6:报废
    devId: data.devId, //设备 id
    devType: data.devType, //类型
    devModel: data.devModel, //具体类型
    devName: data.devName, //设备名字
    typeName: data.devTypeName, //设备类型名字:1:精密空调;2:普通空调;3:中央空调;4:加湿机
    temperature: data.temperature, //温度
    humidity: data.humidity / 10, //湿度
    mqttId: data.mqttId, //设备所在mqt服务器
    statusName: data.statusName, //状态名字
    deviceControls: data.deviceControls
  };

  if ((data.status == 1 || data.status == 2) && data.deviceInfo != null) {
    let deviceInfo = data.deviceInfo;
    item.constrolState = data.deviceInfo.col0 == 0 ? false : true;
    // item.constrolState = data.deviceInfo.col0.split(",")[0] == 0 ? false : true; //自控是否开启:第一个位 0 表示关闭 1 表示开启
    item.TimeStartHour = deviceInfo.col18; //控制开始时间
    item.TimeStarMin = deviceInfo.col19; //控制开始时间
    item.TimeStartState = deviceInfo.col20; //当没有值 设置为 255（1 开机，0 关机 ，255 默认
    item.TimeEndHour = deviceInfo.col21; //控制结束时间
    item.TimeEndMin = deviceInfo.col22; //控制结束时间
    item.TimeEndState = deviceInfo.col23;
    item.rankTop = deviceInfo.col14;
    item.rankTopState =
      deviceInfo.col16 == 1 ? "1" : deviceInfo.col16 == 0 ? "0" : "255";
    item.rankLow = deviceInfo.col15;
    item.rankLowState =
      deviceInfo.col17 == 1 ? "1" : deviceInfo.col17 == 0 ? "0" : "255";

    item.timeOptions = [
      {
        value: "1",
        label: "开机"
      },
      {
        value: "0",
        label: "关机"
      },
      {
        value: "255",
        label: "默认"
      }
    ];
    // 测试数据
    item.TimeControl = true;
    return item;
  } else {
    return item;
  }
}

/**
 * 数组循环
 * return 是否控制时间
 */
function arrFor(arr) {
  let OldLength = arr.length;
  let newLength = 0;
  arr.forEach(function(item) {
    if (item == 0) {
      newLength++;
    }
  });
  return OldLength == newLength ? false : true;
}
/**
 * 修改时间格式
 *
 */
function timeFor(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 10) {
      arr[i] = "0" + arr[i];
    }
  }
  return arr;
}
