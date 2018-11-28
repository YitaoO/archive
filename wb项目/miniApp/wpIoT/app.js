/**
 * 程序基入口
 */

// 功能 - 接口
import "./components/Interface/interface";
// 功能 - 请求接口
import customAjax from "./components/CustomAjax/customAjax";
// 功能 - Dialog
import Dialog from "./components/Dialog/dialog";
// 功能 - 缓存
import Storage from "./components/Storage/storage";
// 功能 - 微信公用api
import WxTools from "./components/WxTools/wxTools";
// 功能 - Tools
import Tools from "./components/Tools/Tools";

import "./components/Tools/jsPrototype"; //扩充js工具类

App({
  // 定义全局变量
  globalData: {
    userInfo: {}
  },
  onLaunch: function() {
    let that = this;

    // 导入全局组件
    wx.customAjax = customAjax;
    wx.Dialog = Dialog;
    wx.WxTools = WxTools;
    wx.Tools = Tools;
    wx.Storage = Storage;

    that.removeStorage();

    // 展示本地存储能力
    var logs = wx.getStorageSync("logs") || [];
    wx.setStorageSync("logs", logs);
  },
  //清除缓存
  removeStorage() {
    let that = this;

    wx.removeStorage({
      //工单类型
      key: "tpyeMessage",
      success: function(res) {}
    });
  }
});
