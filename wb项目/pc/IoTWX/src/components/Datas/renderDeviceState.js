/**
 * 设备情况
 */

export default function renderDviStaData(globalVue, areaId) {
  return new Promise(function(resolve) {
    let params = {};
    params.userId = globalVue.$cookies.getJSON("userInfo").UserID;
    if (areaId != undefined) {
      params.areaId = areaId;
    }
    globalVue.$customAxios
      .get("device/getDeviceStatusCount", {
        params
      })
      .then(datas => {
        let deviceItem = {};
        deviceItem.devCount = datas.devCount; //设备总数
        deviceItem.hintCount = datas.hintCount; //轻微
        deviceItem.ordinaryCount = datas.ordinaryCount; //一般
        deviceItem.severityCount = datas.severityCount; //严重
        deviceItem.location = datas.location;

        deviceItem.list = [
          {
            percentage: Number(
              globalVue.$utils.getPercent(datas.onlineCount, datas.devCount)
            ),
            value: datas.onlineCount,
            name: "开启"
          }, //开机
          {
            percentage: Number(
              globalVue.$utils.getPercent(datas.shutDownCount, datas.devCount)
            ),
            value: datas.shutDownCount,
            name: "关闭"
          }, //关闭
          {
            percentage: Number(97),
            value: datas.offlineCount,
            name: "离线"
          }, //离线
          {
            percentage: Number(
              globalVue.$utils.getPercent(datas.repairCount, datas.devCount)
            ),
            value: datas.repairCount,
            name: "维修"
          }, //维修
          {
            percentage: Number(
              globalVue.$utils.getPercent(datas.pauseCount, datas.devCount)
            ),
            value: datas.pauseCount,
            name: "停用"
          }
        ];
        // deviceItem.list.forEach(function(item) {
        //   item.percentage = 94;
        //   if (item.percentage > 94 && item.percentage < 100) {
        //     item.percentage = item.percentage - 4;
        //   }
        // });

        resolve(deviceItem);
      })
      .catch(error => {});
  });
}
