// 组件 - 搜索
const WxSearch = require("../../../components/Search/search");
Page({
  data: {
    showNoNetwork: false,
    areaId: "",
    checkNum: 0,
    tabShow: true,
    filter: false
  },
  onLoad: function(options) {
    let that = this;

    wx.Dialog.showLoading();

    that.setData({
      type: options.type //列表类型:0：巡检列表;1:延保列表
    });
    //设置标题
    wx.WxTools.setTitle(options.type == "0" ? "巡检记录" : "设备延保");
    //获取tab信息
    wx.customAjax.get(
      `${wx.Interface.areaSelectDeviceAreaByUserId}`,
      {
        userId: getApp().globalData.userInfo.UserID,
        compId: getApp().globalData.userInfo.compId
      },
      function(res) {
        //获取数据
        if (!res.ok) {
          that.setData({
            showNoNetwork: true
          });
        } else {
          that.setData({
            tabs: res.data.data
          });
          if (res.data.data.length > 0) {
            that.data.areaId = res.data.data[0].areaId;
            that.getListDate(that.data.areaId);
          } else {
            that.setData({
              list: []
            });
          }
        }
        //初始化搜索
        WxSearch.init(
          that, // 本页面一个引用
          [],
          [],
          that.mySearchFunction, // 提供一个搜索回调函数
          that.myGobackFunction //提供一个返回回调函数
        );

        wx.Dialog.hideLoading();
      }
    );
  },
  // 获取列表
  getListDate(areaId, keyWord) {
    let that = this;
    let params, url;
    if (Boolean(that.data.type == 0)) {
      //巡检列表
      (url = `${wx.Interface.checkRecordSelectByMap}`),
        (params = {
          areaId: areaId,
          userId: getApp().globalData.userInfo.UserID
        });
      if (keyWord != undefined) {
        params.keyWord = keyWord;
      }
    } else if (Boolean(that.data.type == 1)) {
      // 过保设备
      (url = `${wx.Interface.deviceSelectByMap}`),
        (params = {
          areaId: areaId,
          showTerm: !!that.data.filter ? true : "",
          maintainTerm: wx.Tools.formate(new Date()),
          userId: getApp().globalData.userInfo.UserID
        });
    }
    wx.customAjax.get(url, params, function(res) {
      //获取数据
      if (!res.ok) {
        that.setData({
          showNoNetwork: true
        });
      } else {
        for (let i = 0; i < res.data.data.length; i++) {
          if (Number(that.data.type) == 1) {
            //处理延保
            res.data.data[i].isChecked = false;
          }
          if (
            !!res.data.data[i].picturePath &&
            res.data.data[i].picturePath != null
          ) {
            //处理标题
            res.data.data[i].picturePath = wx.Tools.imagePath(
              res.data.data[i].picturePath
            );
          }
        }

        that.setData({
          list: res.data.data
        });
      }
    });
  },

  // tab切换功能
  tabChecked(e) {
    let that = this;

    that.setData({
      checkNum: e.currentTarget.dataset.tabnum,
      areaId: e.currentTarget.dataset.areaid
    });
    that.getListDate(that.data.areaId);
  },

  // 搜索功能
  bindSearch() {
    //搜索
    let that = this;
    that.setData({
      tabShow: false
    });
  },
  wxSearchInput: WxSearch.wxSearchInput, // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap, // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm, // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear, // 清空函数
  mySearchFunction: function(value) {
    // 搜索回调函数
    let that = this;
    that.getListDate(that.data.areaId, value);
  },
  myGobackFunction: function() {
    // 返回回调函数
    let that = this;

    that.getListDate(that.data.areaId);
    that.setData({
      tabShow: true
    });
  },

  // 选中事件
  bindChecked(e) {
    let that = this;
    let id = e.currentTarget.id;
    let oldCheck = that.data.list[id].isChecked;
    let isChecked = "list[" + id + "].isChecked";

    that.setData({
      [isChecked]: !!oldCheck ? false : true
    });
  },
  // 筛选
  bindFilter() {
    let that = this;
    that.setData({
      filter: !that.data.filter ? true : false
    });
    that.getListDate(that.data.areaId);
  },
  // 跳转事件
  toInspeminfoView(e) {
    // 设备详情
    let kid = e.currentTarget.dataset.kid;
    if (!!kid) {
      wx.navigateTo({
        url: `/pages/workBench/inspectioninfo/inspectioninfo?kid=${kid}`
      });
    }
  },
  toOverPublishView(e) {
    // 延保
    let that = this;
    if (that.data.list.length == 0) {
      return;
    }
    let devList = [];
    that.data.list.forEach(function(item) {
      let obj = {};
      if (!item.isChecked) return;
      obj.devId = item.devId;
      devList.push(obj);
    });
    if (devList.length == 0) {
      wx.Dialog.showAlert("请选择要延保的设备", function() {});
      return;
    }
    wx.Storage.setKey("overDevId", devList);
    wx.navigateTo({
      url: `/pages/workBench/overPublish/overPublish`
    });
  }
});
