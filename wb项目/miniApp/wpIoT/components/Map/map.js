/**
 * 地图功能
 * 1:获取点
 */

// 组件 - 登录功能
import Login from '../Login/login'

Component({

  behaviors: [],

  properties: {

  },
  data: {
    longitude: '113.324520',
    latitude: "23.099994",
    markers: []
  },
  created: function() {
    let that = this

    //登陆
    Login.init().then(function(userId) {
      // 初始化map
      that.mapCtx = wx.createMapContext('myMap')

      //获取点
      that.getPoint()
    })
  },

  methods: {
    // 获取点
    getPoint() {
      let that = this
      wx.customAjax.get(`${wx.Interface.selectAreaByUserId}`, {
        userId: getApp().globalData.userInfo.UserID
      }, function(res) {
        let areaList = []
        res.data.areaList.forEach(function(item, key, items) {
          areaList.push({
            longitude: item.longitude,
            latitude: item.latitude,
            name: item.areaName,
            iconPath: "../../img/map_dibiao.png",
            width: 40,
            height: 50,
            id: item.areaId

          })

        })
        that.setData({
          markers: areaList

        })
      })
    },
    makertap: function(e) {
      var that = this;
      var id = e.markerId;
      that.showSearchInfo(wxMarkerData, id);
      that.changeMarkerColor(wxMarkerData, id);
    }
  }


})