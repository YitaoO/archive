/**
 * 封装小程序的请求接口
 */
// 功能 - 登录
import Login from "../Login/login";

class customAjax {
  // GET请求
  get(url, params, callback) {
    let that = this;
    wx.request({
      url: url,
      data: params,
      method: "GET",
      header: {
        "content-type": "application/json",
        Cookie: `${getApp().globalData.sessionId}`
      },
      success: function(res) {
        if (res.data.code == "0003") {
          //session过期，重新登陆
          that.reLoad(url, params, 0).then(function(datas) {
            callback(datas);
          });
        } else {
          callback(res.data);
        }
      },
      // TODO: 这里网络异常需要后期处理
      fail: function(e) {
        wx.Dialog.showAlert(`网路异常,请稍后重试!`, function() {});
      }
    });
  }
  // 重新登录
  reLoad(url, params, type) {
    let that = this;
    return new Promise(function(resolve) {
      Login.init().then(function() {
        // 重新请求接口
        if (Number(type == 0)) {
          that.get(url, params, function(res) {
            resolve(res);
          });
        } else {
          that.post(url, params, function(res) {
            resolve(res);
          });
        }
      });
    });
  }
  // POST请求
  post(url, params, callback) {
    let that = this;
    wx.request({
      url: url,
      data: params,
      method: "POST",
      header: {
        "content-type": "application/json",
        Cookie: `WEBID=${getApp().globalData.sessionId}`
      },
      success: function(res) {
        if (res.data.code == "0003") {
          //session过期，重新登陆
          that.reLoad(url, params, 1).then(function(datas) {
            callback(datas);
          });
        } else {
          callback(res.data);
        }
      },
      // TODO: 这里网络异常需要后期处理
      fail: function(e) {
        console.log(e);
        wx.Dialog.showAlert(`网路异常,请稍后重试!`, function() {});
      }
    });
  }
}

export default new customAjax();
