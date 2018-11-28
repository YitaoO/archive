/**
 * 区域 - 我的区域
 */

// 组件 - 登录功能
import Login from '../../components/Login/login'
Page({
  // 页面初始化
  onLoad: function() {
    let that = this

  },
  onShow() {
    let that = this
    wx.Dialog.showLoading()

    //动态设置标题
    wx.WxTools.setTitle('我的区域')

    that.getData()
  },
  getData() {
    let that = this
    // 获取区域信息
    wx.customAjax.get(`${wx.Interface.selectAreaByUserId}`, {
      userId: getApp().globalData.userInfo.UserID
    }, function(res) { //获取数据
      if (!res.ok) {
        that.setData({
          showNoNetwork: true
        })
      } else {
        that.renderData(res).then(function(lists) {
          that.setData({
            list: lists
          })
        })
      }
      wx.stopPullDownRefresh;
      wx.Dialog.hideLoading()

    })
  },
  //处理数据
  renderData(res) {
    return new Promise(function(resolve) {
      let areaList = []
      res.data.areaList.forEach(function(item, key) {

        if (item.minHum == item.maxHum) {
          item.Hum = `${item.minHum}%`
        } else {
          item.Hum = `${item.minHum}%~${item.maxHum}%`
        }
        if (item.minTem == item.maxTem) {
          item.Tem = `${item.minTem}°`
        } else {
          item.Tem = `${item.minTem}°~${item.maxTem}°`
        }

        areaList.push(item)

      })
      resolve(areaList)
    })
  },
  //渲染数据
  data: {
    showNoNetwork: false
  },
  //下拉加载更多
  onPullDownRefresh() {
    let that = this
    that.getData()

  },

  // 跳转事件
  goDetailView: function(event) { //详情
    let that = this
    let AreaCount = event.currentTarget.dataset.subareacount
    let areaName = event.currentTarget.dataset.areaname
    if (AreaCount > 0) {
      wx.navigateTo({
        url: `/pages/dataCenter/childDataCenter/childDataCenter?&areaId=${event.currentTarget.dataset.areaid}&areaName=${areaName}`,
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
      url: `/pages/dataCenter/activework/activework?areaId=${event.currentTarget.dataset.areaid}&isEnd=false&title='活动工单'`,
    })
  }
})