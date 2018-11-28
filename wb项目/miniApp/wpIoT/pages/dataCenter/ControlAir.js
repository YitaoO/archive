/**
 * 控制空调逻辑
 */

// 组件 - websocket
import WebScoket from "../../components/WebSocket/webSocket";
// 功能 - 处理空调数据
import renderDataThree from "../../components/DeviceData/renderThreeData";
import renderDataOne from "../../components/DeviceData/renderOneData";

class ControlAir {
  /**
   * [init 初始化WebScoket]
   * @param  {[type]} devId   [设备id]
   * @param  {[type]} pageObj [页面对象]
   * @param  {[type]} type    [方式] 1:修改设备;2:控制空调;3:列表监听
   * @return {[type]}         [description]
   */
  init(devId, pageObj, type) {
    let that = this;

    that.socketLock = true; //加锁
    that.socketList = []; //webSocket数据
    that.pageObj = pageObj;

    //建立webSocket
    if (
      !!getApp().globalData.openSocket &&
      getApp().globalData.openSocket != null
    ) {
      that.socketList = [];
      wx.closeSocket();
    }
    wx.onSocketClose(function(res) {
      //关闭重启webSocket
      console.log("webSocket已关闭");
      getApp().globalData.openSocket = false;
    });
    WebScoket.init(devId).then(function(socketData) {
      that.devId = devId;
    });
    //网络状态改变重连websocket
    wx.onNetworkStatusChange(function(res) {
      if (!!res.isConnected) {
        WebScoket.init(that.devId).then(function(socketData) {});
      } else {
        wx.closeSocket();
      }
    });

    // 监听websocket发回信息
    wx.onSocketMessage(function(res) {
      console.log("收到服务器内容：" + res.data);
      if (JSON.parse(res.data).deviceInfo == null) return;
      that.socketList.push(res.data); //头部插入数据

      if (!!that.socketLock) {
        that.renderSocket(type);
      }
    });
  }
  // 处理webScoket数据
  renderSocket(type) {
    let that = this;
    that.socketLock = false;
    let socketList = that.socketList;
    let item = JSON.parse(socketList[socketList.length - 1]);

    that.renderData(item, type);

    // 关闭提示
    if (item.changeOrder == 1) {
      //非巡检
      that.socketData = item;
    }
    that.socketList.length = that.socketList.length - 1;
    that.socketLock = true;
  }
  //渲染页面
  renderData(item, type) {
    let that = this;

    if (type == 1) {
      //修改设备
      that.pageObj.setData({
        info: item,
        detail: wx.Tools.renderControlData(item)
      });
    } else if (type == 2) {
      //控制空调
      that.pageObj.setData({
        ...wx.Tools.renderControlData(item)
      });
    } else if (type == 3) {
      //列表监听
      let lists = that.pageObj.data.list;
      for (let i = 0; i < lists.length; i++) {
        if (Number(lists[i].devId) == item.devId) {
          lists[i] = wx.Tools.renderControlData(item);
        }
      }
      that.pageObj.setData({
        list: lists
      });
    }
  }

  //控制空调
  hindleControl(params) {
    let that = this;
    let mqttId = that.pageObj.data.mqttId;
    wx.Dialog.showLoading();
    wx.customAjax.get(
      `${wx.Interface.changeValue}`,
      {
        mqttId: mqttId,
        ...params
      },
      function(res) {
        //改变数据
        if (res.ok == true) {
          that.socketData = null;
          that.setInterval().then(function() {});
        } else {
          //网络出错
          if (!!that.pageObj.data.statusControl) {
            //控制开关
            wx.Dialog.showAlert("设备已离线，无法控制！", function() {
              wx.customAjax.post(
                `${wx.Interface.updateDevice}`,
                {
                  devId: that.devId,
                  status: 3
                },
                function(res) {
                  let data = res.data;
                  that.pageObj.setData({
                    info: data,
                    detail:
                      data.devType == 1
                        ? renderDataOne(data)
                        : data.devType == 3
                          ? renderDataThree(data)
                          : ""
                  });
                }
              );
            });
          } else {
            wx.Dialog.showAlert("修改失败,请重试！", function() {});
          }
        }
      }
    );
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
            wx.Dialog.showAlert("请求失败,请重试！", function() {});
            clearInterval(timer);
            resolve();
          }
        } else {
          clearInterval(timer);
          wx.Dialog.showAlert("修改成功", function() {
            resolve(that.socketData);
          });
        }
      }, 1000);
    });
  }
}
export default new ControlAir();
