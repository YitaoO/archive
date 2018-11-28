import Taro from "@tarojs/taro";
import Dialog from "../components/dialog";
import BaseUrl from "./api";
function getSessionId(isLogin) {
  return new Promise(function(resolve) {
    if (!!isLogin) {
      resolve({
        "content-type": "application/json"
      });
    } else {
      wx.getStorage({
        key: "sessionId",
        success: function(res) {
          //TODO:这里逻辑待优化，太多判断
          resolve({
            "content-type": "application/json",
            Cookie: !!res.data ? `${res.data}` : ""
          });
        }
      });
    }
  });
}
export default function request(opt, isLogin) {
  return getSessionId(isLogin).then(function(header) {
    opt.header = header;
    return Taro.request(opt).then(res => {
      let { statusCode } = res;
      let { code, data } = res.data;

      Dialog.hideLoading();
      if (statusCode >= 200 && statusCode < 300) {
        switch (code) {
          case "0":
            if (data == null || data.length == 0) {
              Dialog.showAlert("暂无数据...", "", 1000);
              return data;
            }
            if (!!data.data) {
              if (data.data.length == 0) {
                Dialog.showAlert("暂无数据...", "", 1000);
                return data;
              }
            }
            return data;
            break;
          case "0012":
            //注册
            Dialog.showAlert("还未绑定，请绑定...", "none", 1000);
            setTimeout(() => {
              Taro.redirectTo({ url: "/pages/registration/index" });
            }, 1000);
            return false;
            break;
          case "0003":
            //重新登录
            Dialog.showAlert("还未登录，正在登录...", "none", 1000);

            Taro.getStorage({ key: "minicar_openId" }).then(res => {
              Taro.request({
                url: `${BaseUrl}/login?openID=${res.data}&weixin=weixin&act=10`,
                method: "POST",
                header: {
                  "content-type": "application/json"
                }
              }).then(res => {
                wx.setStorage({
                  key: "sessionId",
                  data: res.data.data.sessionId
                });
                setTimeout(() => {
                  Taro.redirectTo({ url: "/pages/index/index" });
                }, 1000);
              });
            });
            break;
          default:
            Dialog.showAlert(res.data.message, "none", 1000);
            return false;
            break;
        }
      } else {
        Dialog.hideLoading();
        Dialog.showAlert(`状态码-${statusCode}`, "", 1000);
        throw new Error(`网络请求错误，状态码${statusCode}`);
      }
    });
  });
}

function reLogin() {
  return Taro.request(opt).then(res => {});
}
