Page({
  onLoad: function(options) {
    let that = this

    wx.Dialog.showLoading()
    //获取tab信息
    wx.customAjax.get(`${wx.Interface.checkGetById}`, {
      kid: options.kid
    }, function(res) { //获取数据
      if (!res.ok) {
        that.setData({
          showNoNetwork: true
        })
      } else {
        that.renderImage(res.data.imageList).then(function(imageList) {
          res.data.imageList = imageList
          res.data.statusChecked = (Number(res.data.devStatus1) == 0) ? false : true
          that.setData({
            ...res.data
          })
        })

      }
      wx.Dialog.hideLoading()

    })
  },
  renderImage(imageList) {
    let that = this
    let lists = []
    return new Promise(function(resolve, reject) {
      imageList.forEach(function(item, key) {
        let imgB = `${wx.Interface.fileDownloadF}?p=${item.svrPathBImage}`

        lists.push(imgB)
      })
      resolve(lists)
    })
  },
  data: {
    focus: false,
    inputValue: ''
  },
  // 图片放大
  previewImage: function(e) {
    var that = this;
    var dataid = e.currentTarget.dataset.id;
    var imageList = that.data.imageList;
    wx.previewImage({
      current: imageList[dataid],
      urls: this.data.imageList
    });
  },
  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  xuantu() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
      }
    })
  },
})