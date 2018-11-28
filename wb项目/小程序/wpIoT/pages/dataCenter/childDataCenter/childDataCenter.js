/**
 * 区域 - 我的区域
 */

Page({
  // 页面初始化
  onLoad: function(options) {
    let that = this

    wx.Dialog.showLoading()

    //动态设置标题
    wx.WxTools.setTitle(options.areaName)

    // 获取区域信息
    wx.customAjax.get(`${wx.Interface.selectAreaByUserId}`, {
      userId: getApp().globalData.userInfo.UserID,
      areaId: options.areaId
    }, function(res) { //获取数据

      that.renderData(res).then(function(lists) {
        that.setData({
          list: lists
        })
        wx.Dialog.hideLoading()
      })

    })
  },
  //处理数据
  renderData(res) {
    return new Promise(function(resolve) {
      let areaList = []
      res.data.areaList.forEach(function(item, key) {

        if (item.minHum == item.maxHum) {
          item.Hum = `${item.minHum}°`
        } else {
          item.Hum = `${item.minHum}°~${item.maxHum}°`
        }
        if (item.minTem == item.maxTem) {
          item.Tem = `${item.minTem}°`
        } else {
          item.Tem = `${item.minTem}°~${item.maxTem}°`
        }
        if (item.minTem == undefined) {
          item.Tem = '暂无设备'
        }

        console.log(item);

        areaList.push(item)

      })
      resolve(areaList)
    })
  },
  //渲染数据
  data: {
    list: [],
    showNoNetwork: false
  },

  // 跳转事件
  goDetailView: function(event) { //详情
    let that = this
    let AreaCount = event.currentTarget.dataset.subareacount
    let areaName = event.currentTarget.dataset.areaname

    if (AreaCount > 0) {
      wx.navigateTo({
        url: `/pages/dataCenter/childTwoDataCenter/childTwoDataCenter?&areaId=${event.currentTarget.dataset.areaid}&areaName=${areaName}`
      })
    } else {
      wx.navigateTo({
        url: `/pages/dataCenter/monitoring/monitoring?title=${event.currentTarget.dataset.title}&areaId=${event.currentTarget.dataset.areaid}&areaName=${areaName}`,
      })
    }

  },
  goDevView: function(event) { //设备
    let areaId = event.currentTarget.dataset.areaid
    let areaName = event.currentTarget.dataset.areaname
    wx.navigateTo({
      url: `/pages/dataCenter/equipment/equipment?areaId=${areaId}&areaName=${areaName}`,
    })
  },
  goDanView: function(event) { //活动工单
    wx.navigateTo({
      url: `/pages/dataCenter/activework/activework?areaId=${event.currentTarget.dataset.areaid}`,
    })
  }
})