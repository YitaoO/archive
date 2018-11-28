/**
 * 百度地图功能
 */


Component({

  behaviors: [],

  properties: {

  },
  data: {
    markers: [],
    latitude: '',
    longitude: ''
  },
  created: function() {
    let that = this
    // 初始化地图
    let bmap = require('./bmap-wx.min')
    let wxMarkerData = []
    let BMap = new bmap.BMapWX({
      ak: 'oMgMfcXHHFnrZPxzruVSTtgrhZqZb3TU'
    });

    // 请求地点
    // that.getMarkerData()
    // 发起POI检索请求
    BMap.search({
      "query": '酒店',
      fail: fail,
      success: success,
      // 此处需要在相应路径放置图片文件
      iconPath: '../img/marker_red.png',
      // 此处需要在相应路径放置图片文件
      iconTapPath: '../img/marker_red.png'
    });

    var fail = function(res) {
      let that = this

    };
    var success = function(res) {
      let that = this

      // 返回数据
      wxMarkerData = res.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }


  },

  methods: {
    getMarkerData() {

    },
    makertap: function(e) {
      var that = this;
      var id = e.markerId;
      that.showSearchInfo(wxMarkerData, id);
      that.changeMarkerColor(wxMarkerData, id);
    }
  }

})