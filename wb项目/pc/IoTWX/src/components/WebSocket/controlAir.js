/**
 * 控制空调逻辑
 */

class ControlAir {
  /**
   * [init 初始化WebScoket]
   * @param  {[type]} devId   [设备id]
   * @param  {[type]} vueObj [Vue对象]
   * @param  {[type]} type    [方式] 1:详情;2:列表
   */
  init(devId, vueObj, type) {
    let that = this;

    that.socketLock = true; //加锁
    that.socketList = []; //webSocket数据
    that.vueObj = vueObj;
    that.devId = devId;
    that.type = type;

    // 开启
    that.webSocketInit(vueObj, devId).then(function(socketData) {
      // 监听websocket发回信息
      that.vueObj.webSocket.onmessage = function(res) {
        //发送完数据后，从服务器端接收相应返回的方法
        console.log("收到服务器内容：" + res.data);
        if (JSON.parse(res.data).deviceInfo == null) return;
        that.socketList.push(res.data); //头部插入数据

        if (!!that.socketLock) {
          that.renderSocket();
        }
      };
    });
  }
  // 初始化webScoket
  webSocketInit(Vue, id) {
    let that = this;
    return new Promise(function(resolve) {
      let baseUrl = "";
      if (process.env.NODE_ENV !== "development") {
        // 这里开发环境因为要跨域，所以开发环境不用这个配置,后期看下可以优化吗
        let url = window.location.href;
        // let url = "https://192.168.1.94:9030/portal-equipment/index";
        let index =
          url.indexOf("login") > 0
            ? url.indexOf("login")
            : url.indexOf("index");

        baseUrl =
          url.indexOf("https") == 0
            ? `wss://${url
                .slice(0, index)
                .split("https://")
                .join("")}equipmentWebSocket/`
            : `ws://${url
                .slice(0, index)
                .split("http://")
                .join("")}equipmentWebSocket/`;
      } else {
        baseUrl = `ws://192.168.1.94:9030/portal-equipment/equipmentWebSocket/`;
      }

      //建立链接
      that.vueObj.webSocket = new WebSocket(`${baseUrl}${id}`);

      // 监听是否打开
      that.vueObj.webSocket.onopen = function(evt) {
        that.vueObj.websocketOn = true;
        console.log("WebSocket连接已打开！");
        resolve();
      };
      that.vueObj.webSocket.onclose = function() {
        // 关闭 websocket
        console.log("连接已关闭...");
      };
      // 路由跳转时结束websocket链接
      that.vueObj.$router.afterEach(function() {
        that.vueObj.webSocket.close();
      });
    });
  }
  // 处理webScoket数据
  renderSocket() {
    let that = this;
    that.socketLock = false;
    let socketList = that.socketList;
    let item = JSON.parse(socketList[socketList.length - 1]);

    that.renderData(item);
    that.socketData = item;
    that.socketList.length = that.socketList.length - 1;
    that.socketLock = true;
  }
  //渲染页面
  renderData(item) {
    let that = this;
    if (that.type == 1) {
      //详情
      if (item.devId == that.devId) {
        that.vueObj.deviceItem = that.vueObj.$utils.renderControlData(item);
        // 红外空调额外设置
        if (that.vueObj.deviceItem.devType == 2) {
          that.vueObj.intraredConstrolList.forEach(function(item) {
            item.valueObj =
              that.vueObj.deviceItem.deviceControls[item.controlId];
          });
        }
      }
    } else if (that.type == 2) {
      //列表
      let deviceLists = that.vueObj.deviceLists;
      for (let i = 0; i < deviceLists.length; i++) {
        if (Number(deviceLists[i].devId) == item.devId) {
          deviceLists[i] = that.vueObj.$utils.renderControlData(item);
          // that.vueObj.$bus.$emit("webScoketListChange", deviceLists);
        }
      }
    }
  }

  //控制空调
  hindleControl(params) {
    let that = this;
    let mqttId = that.vueObj.deviceItem.mqttId;
    that.vueObj.$customAxios
      .get(`device/changeValue`, {
        params: {
          mqttId: mqttId,
          ...params
        }
      })
      .then(resq => {
        if (resq == true) {
          that.socketData = null;
          that.setInterval().then(function() {});
        } else {
          //网络出错
          if (!!that.vueObj.data.statusControl) {
            //控制开关
            that.vueObj.$ele.Notification.error({
              title: "warning",
              message: `设备已离线，无法控制！`,
              onClick() {
                that.vueObj.$customAxios
                  .post(`updateDevice`, {
                    devId: that.devId,
                    status: 3
                  })
                  .then(res => {
                    let data = res.data;
                    that.vueObj.deviceItem =
                      data.devType == 1
                        ? renderDataOne(data)
                        : data.devType == 3
                          ? renderDataThree(data)
                          : "";
                  });
              }
            });
          } else {
            that.vueObj.loading = false;
            that.vueObj.$ele.Notification.error({
              title: "错误",
              message: `修改失败,请重试！`
            });
          }
        }
      })
      .catch(error => {
        // that.vueObj.loading = false
      });
  }
  //计时器
  setInterval() {
    let that = this;
    return new Promise(function(resolve) {
      let over = 10;
      let timer = setInterval(function() {
        if (that.socketData == null) {
          over = over - 1;
          if (over === 0) {
            that.vueObj.loading = false;
            that.vueObj.$ele.Notification.error({
              title: "错误",
              message: `设置失败,请重试！`
            });
            that.vueObj.deviceItem = that.vueObj.$utils.renderControlData(
              that.vueObj.deviceOldItem
            );
            clearInterval(timer);
            resolve();
          }
        } else {
          clearInterval(timer);
          that.vueObj.loading = false;
          that.vueObj.$ele.Notification.success({
            title: "成功",
            message: `修改成功！`
          });
          resolve(that.socketData);
        }
      }, 1000);
    });
  }
}
export default new ControlAir();
