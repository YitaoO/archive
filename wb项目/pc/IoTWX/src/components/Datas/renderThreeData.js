/**
 * 解析中央空调数据
 */
import Tools from "../Tools/utils";

export default function renderData(data) {
  if ((data.status == 1 || data.status == 2) && data.deviceInfo != null) {
    let deviceInfo = data.deviceInfo;
    let year = !Tools.isNull(deviceInfo.col15) ? deviceInfo.col15 : "";
    let month = !Tools.isNull(deviceInfo.col16)
      ? deviceInfo.col16.split(",")[0]
      : "";
    let week = !Tools.isNull(deviceInfo.col16)
      ? deviceInfo.col16.split(",")[1]
      : "";
    let day = !Tools.isNull(deviceInfo.col17)
      ? deviceInfo.col17.split(",")[0]
      : "";
    let hour = !Tools.isNull(deviceInfo.col17)
      ? deviceInfo.col17.split(",")[1]
      : "";
    let minute = !Tools.isNull(deviceInfo.col18)
      ? deviceInfo.col18.split(",")[0]
      : "";
    let second = !Tools.isNull(deviceInfo.col18)
      ? deviceInfo.col18.split(",")[1]
      : "";

    let TimeOne = !Tools.isNull(deviceInfo.col19)
      ? timeFor(deviceInfo.col19.split(","))
      : "";
    let TimeTwo = !Tools.isNull(deviceInfo.col20)
      ? timeFor(deviceInfo.col20.split(","))
      : "";
    let TimeThree = !Tools.isNull(deviceInfo.col21)
      ? timeFor(deviceInfo.col21.split(","))
      : "";
    let TimeFour = !Tools.isNull(deviceInfo.col22)
      ? timeFor(deviceInfo.col22.split(","))
      : "";
    let TimeOneCtrol = !Tools.isNull(deviceInfo.col19)
      ? arrFor(deviceInfo.col19.split(","))
      : ""; //是否第一时段控制
    let TimeTwoCtrol = !Tools.isNull(deviceInfo.col20)
      ? arrFor(deviceInfo.col20.split(","))
      : ""; //是否第二时段控制
    let TimeThreeCtrol = !Tools.isNull(deviceInfo.col21)
      ? arrFor(deviceInfo.col21.split(","))
      : ""; //是否第三时段控制
    let TimeFourCtrol = !Tools.isNull(deviceInfo.col22)
      ? arrFor(deviceInfo.col22.split(","))
      : ""; //是否第四时段控制

    let nowDataStart = !Tools.isNull(deviceInfo.col17)
      ? timeFor(deviceInfo.col17.split(","))
      : ""; //当前时间小时
    let nowDataEnd = !Tools.isNull(deviceInfo.col18)
      ? timeFor(deviceInfo.col18.split(","))
      : ""; //当前时间分钟

    let windSpeedType = !Tools.isNull(deviceInfo.col1)
      ? data.deviceInfo.col1.split(",")[1]
      : ""; //风速:0低速 1中速 2高速 3自动速度 4关闭
    let modelType = !Tools.isNull(deviceInfo.col2)
      ? deviceInfo.col2.split(",")[0]
      : ""; //模式:0取暖:1制冷:2睡眠:3唤醒:4关闭

    return {
      devTypeName: data.devName, //名字
      status: data.status, //状态:1:开机;2：关机;3:离线;4:停用;5:维修;6:报废
      statusBoolean: data.status == 1 ? true : false,
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
      devId: data.devId, //设备 id
      devType: data.devType, //类型
      devName: data.devName, //设备名字
      typeName: data.devTypeName, //设备类型名字:1:精密空调;2:普通空调;3:中央空调;4:加湿机
      mqttId: data.mqttId, //设备所在mqt服务器
      hotTemRange: !Tools.isNull(deviceInfo.col5)
        ? deviceInfo.col5.split(",")
        : "", // 制热范围
      colTemRange: !Tools.isNull(deviceInfo.col6)
        ? deviceInfo.col6.split(",")
        : "", // 制冷范围

      //写入
      windSpeedType: windSpeedType,
      windSpeedTypeName:
        windSpeedType == 0
          ? "低速"
          : windSpeedType == 1
            ? "中速"
            : windSpeedType == 2
              ? "高速"
              : windSpeedType == 3
                ? "自动速度"
                : "关闭",
      modelType: modelType,
      modelTypeName:
        modelType == 0
          ? "取暖"
          : modelType == 1
            ? "制冷"
            : modelType == 2
              ? "睡眠"
              : modelType == 3
                ? "唤醒"
                : "关闭",
      template: !Tools.isNull(deviceInfo.col2)
        ? Number(deviceInfo.col2.split(",")[1])
        : "", //室内温度
      TimeControl: !Tools.isNull(deviceInfo.col3)
        ? Boolean(Number(deviceInfo.col3.split(",")[1]))
        : "", //时间段控制
      HotHigh: !Tools.isNull(deviceInfo.col5)
        ? deviceInfo.col5.split(",")[0]
        : "", // 取暖温度上限
      HotLow: !Tools.isNull(deviceInfo.col5)
        ? deviceInfo.col5.split(",")[1]
        : "", // 取暖温度下限
      ColHigh: !Tools.isNull(deviceInfo.col6)
        ? deviceInfo.col6.split(",")[0]
        : "", // 制冷温度上限
      ColLow: !Tools.isNull(deviceInfo.col6)
        ? deviceInfo.col6.split(",")[1]
        : "", // 制冷温度下限
      TimeOneCtrol: TimeOneCtrol,
      TimeTwoCtrol: TimeTwoCtrol,
      TimeThreeCtrol: TimeThreeCtrol,
      TimeFourCtrol: TimeFourCtrol,
      TimeOneStart: TimeOne != "" ? `${TimeOne[0]}:${TimeOne[1]}` : "", //第一时段开始
      TimeOneEnd: TimeOne != "" ? `${TimeOne[2]}:${TimeOne[3]}` : "", //第一时段结束
      TimeTwoStart: TimeTwo != "" ? `${TimeTwo[0]}:${TimeTwo[1]}` : "", //第二时段开始
      TimeTwoEnd: TimeTwo != "" ? `${TimeTwo[2]}:${TimeTwo[3]}` : "", //第二时段结束
      TimeThreeStart: TimeThree != "" ? `${TimeThree[0]}:${TimeThree[1]}` : "", //第三时段开始
      TimeThreeEnd: TimeThree != "" ? `${TimeThree[2]}:${TimeThree[3]}` : "", //第三时段结束
      TimeFourStart: TimeFour != "" ? `${TimeFour[0]}:${TimeFour[1]}` : "", //第四时段开始
      TimeFourEnd: TimeFour != "" ? `${TimeFour[2]}:${TimeFour[3]}` : "", //第四时段结束

      //只读
      intoTem: !Tools.isNull(deviceInfo.col14)
        ? deviceInfo.col14.split(",")[1]
        : "", //室内温度
      clock:
        year != "" && hour != "" && second != ""
          ? `${year}-${month}-${day} ${hour}:${minute}:${second}`
          : "", //时钟
      week: week != "" ? week : "", //星期
      nowData:
        nowDataStart != "" && nowDataEnd != ""
          ? `${nowDataStart[1]}:${nowDataEnd[0]}`
          : "" //当前时间
    };
  } else {
    return {
      devTypeName: data.devName, //名字
      status: data.status, //状态:1:开机;2：关机;3:离线;4:停用;5:维修;6:报废
      statusBoolean: data.status == 1 ? true : false,
      devId: data.devId, //设备 id
      devType: data.devType, //类型
      devName: data.devName, //设备名字
      typeName: data.devTypeName, //设备类型名字:1:精密空调;2:普通空调;3:中央空调;4:加湿机
      status: data.status,
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
