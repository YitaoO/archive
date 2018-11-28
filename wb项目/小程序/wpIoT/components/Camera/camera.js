/**
 * Camera 组件
 * 需要优化:1:判断是否可以编辑
 */

Component({
  data: {
    kidText: '',
    enableClick: true, //是否可以编辑
    imageList: [] //图片列表
  },
  properties: { //获取页面传过来的值

    kidText: {
      type: String
    },
    newEdit: {
      type: Boolean
    }
  },
  ready: function() {
    let that = this

    if (!!that.data.kidText && that.data.kidText != '' && !that.data.newEdit) {
      that.getImageList(that.data.kidText)
    }

  },
  methods: {
    //获取图片
    getImageList(kid) {
      let that = this
      wx.customAjax.get(`${wx.Interface.workGetByKid}`, {
        userId: getApp().globalData.userInfo.UserID,
        kid: kid
      }, function(res) { //获取数据
        let imageLists = res.data.imageList
        let imageList = []
        imageLists.forEach(function(item) {
          imageList.push(wx.Tools.imagePath(item.svrPathMIamge))
        })

        that.setData({
          imageList: imageList,
          enableClick: (res.data.status == 2 || res.data.status == 1) ? false : true
        });
      })
    },
    // 选择图片
    chooseImage: function(event) {
      var that = this;

      wx.chooseImage({
        count: 1, // 一次最多可以选择2张图片一起上传
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 上传图片功能
          that.uploadImage(`${wx.Interface.upload}`, res.tempFilePaths[0], function(url) {
            that.setData({
              imageList: that.data.imageList.concat(res.tempFilePaths)
            });
          })


        }
      })
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
    // 上传图片(Todo:监听图片上传的过程)
    uploadImage(url, path, callback) {
      let that = this
      wx.uploadFile({
        url: url,
        filePath: path,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data',
          'Cookie': `WEBID=${getApp().globalData.sessionId}`
        },
        formData: {
          recordId: that.data.kidText
        },
        success: function(res) {
          let datas = JSON.parse(res.data).data
          let sevUrl = wx.Tools.slash(datas.svrPath)
          let url = `${wx.Interface.fileDownloadF}?p=${sevUrl}${datas.svrPathMIamge}`
          callback(url)

        },
        fail: function(err) {
          wx.showAlert('提交失败，请重试')
          console.log(err);
        }
      })
    }
  }

})