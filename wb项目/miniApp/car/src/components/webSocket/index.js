/**
 * websocket
 */
import baseApi from "../../services/api";
class WebSockets {
  init(userId) {
    let api = "";

    if (baseApi.indexOf("https") == 0) {
      api = `wss:${baseApi.substring(6, baseApi.length - 3)}`;
    } else {
      api = `ws:${baseApi.substring(5, baseApi.length - 3)}`;
    }
    return new Promise(function(resolve) {
      wx.connectSocket({
        url: `${api}liveWebsocket/${userId}/1`,
        data: {},
        header: {
          "content-type": "application/json"
        },
        method: "GET"
      });
      // 监听是否打开
      wx.onSocketOpen(function(res) {
        console.log("WebSocket连接已打开！");
      });
      // 收到数据
      wx.onSocketMessage(function(res) {
        resolve(res);
      });
      // 监听打开错误
      wx.onSocketError(function(res) {
        console.log("WebSocket连接打开失败，请检查！");
      });
    });
  }
}
export default new WebSockets();
