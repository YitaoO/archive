/**
 * 活动工单
 */
Page({
  data: {
    tabCard: 1,
    showNoNetwork: false
  },
  onLoad: function(options) {
    let that = this

    // 初始化数据
    that.setData({
      areaId: (options.areaId != undefined) ? options.areaId : ''
    })

  },
  onShow: function() {
    let that = this;
    // 获取数据
    that.getData()
    that.removeStorage()

  },
  getData() {
    let that = this
    wx.Dialog.showLoading()

    wx.customAjax.get(`${wx.Interface.workSelectByMap}`, {
      tabCard: that.data.tabCard, //1:我提交的;2:指派给我的
      areaId: that.data.areaId,
      userId: getApp().globalData.userInfo.UserID

    }, function(res) { //获取数据
      if (!res.ok) {
        that.setData({
          showNoNetwork: true
        })
      } else {
        if (res.data.data.length > 0) {
          that.renderData(res.data.data).then(function(list) {
            that.setData({
              list: list
            })
          })
        } else {
          that.setData({
            list: []
          })
        }

      }
      wx.Dialog.hideLoading()
    })
  },
  // 处理数据
  renderData(datas) {

    let that = this
    let newList = []
    return new Promise(function(resolve, reject) {

      datas.forEach(function(item, key) {
        if (item.imageList == null) {
          item.imageList = []
        }
        if (item.imageList.length == 0) {
          item.newImgList = []
        } else {
          let imageList = []
          // 处理图片
          item.imageList.forEach(function(item, key) {
            let image = {}
            let svrPath = wx.Tools.slash(item.svrPath)
            image.mUrl = `${wx.Interface.fileDownloadF}?p=${item.svrPathMIamge}`
            image.bUrl = `${wx.Interface.fileDownloadF}?p=${item.svrPathBImage}`
            image.sUrl = `${wx.Interface.fileDownloadF}?p=${item.svrPathSImage}`
            imageList.push(image)

          })
          item.newImgList = imageList

        }
        newList.push(item)
        resolve(newList)
      })
    })
  },
  removeStorage() {
    wx.removeStorage({
      key: 'saveParse',
      success: function(res) {}
    })
    wx.removeStorage({
      key: 'userParse',
      success: function(res) {}
    })
  },
  // tab 切换
  bindTab(e) {
    let that = this;

    let tabCard = e.currentTarget.dataset.tab

    that.setData({
      tabCard: tabCard
    })
    that.getData()

  },
  // 跳转事件
  goDetailView: function(event) {
    let that = this
    let kid = event.currentTarget.dataset.kid
    wx.navigateTo({
      url: `/pages/dataCenter/mandispatch/mandispatch?kid=${kid}&isEnd=${that.data.end}`,
    })
  },
  goNewView: function() {
    let that = this
    wx.navigateTo({
      url: `/pages/dataCenter/mandispatch/mandispatch?isEnd=${that.data.end}`,
    })
  }

})