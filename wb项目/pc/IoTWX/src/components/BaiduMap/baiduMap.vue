<!-- 百度map模块 -->
<template>
<div id="map-wrap" v-loading="mapLoading">
  <div id="map"></div>
  <div id="map-search" v-if="!!mapSearch">
    <el-input placeholder="请输入地点" v-model="searchInput" class="input-with-select" id="suggestId">
      <el-button slot="append" icon="el-icon-search" @click="bindSearch">搜索</el-button>
    </el-input>
  </div>
</div>
</template>

<script>
export default {
  /**
   * @markers  {[Array]}(监听)     瞄点
   * @searchInput  {Boolean}      是否显示搜索
   */
  props: {
    mapSearch: Boolean,
    default: false //这样可以指定默认的值
  },
  mounted() {
    this.initMap();
  },
  destroyed() {
    this.$bus.$off("mapMarkers");
    this.$bus.$off("setCenter");
  },
  data() {
    return {
      address: "", //当前位置
      markers: [], //标注点
      searchInput: "", //搜索内容
      latLog: {}, //搜索的经纬度
      mapLoading: true
    };
  },
  methods: {
    // 初始化地图
    initMap() {
      this.Map = new BMap.Map("map");
      this.$bus.$on("setCenter", markers => {
        this.Map.setViewport(
          [new BMap.Point(markers[0].longitude, markers[0].latitude)]
        );
      });
      this.point = new BMap.Point(116.404, 39.915);
      this.marker = new BMap.Marker(this.point);
      this.Map.centerAndZoom(this.point, !this.mapSearch ? 8 : 12);
      this.Map.enableScrollWheelZoom(true);
      // this.getGeolocation();
      this.getMarket();

      // 用于设备管理
      if (this.mapSearch) {
        this.getGeolocation();
        this.autocomplete(); // 搜索框的补全地址功能
        this.getGeocoder(); // 经纬度转换成地址功能
      }
    },
    autocomplete() {
      // 建立一个自动完成的对象
      var ac = new BMap.Autocomplete({
        input: "suggestId",
        location: this.Map
      });
      var myValue = "";
      ac.addEventListener("onconfirm", function(e) {
        //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
        setPlace();
      });
      var that = this;

      function setPlace() {
        that.Map.clearOverlays(); //清除地图上所有覆盖物
        var local = new BMap.LocalSearch(that.Map, {
          //智能搜索
          onSearchComplete: function() {
            var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
            that.Map.centerAndZoom(pp, 18);
            that.$bus.$emit("getMap", myValue, pp);
            // 添加标注
            var marker = new BMap.Marker(pp);
            that.Map.addOverlay(marker);
            let label = new BMap.Label(myValue, {
              offset: new BMap.Size(-10, -25)
            });
            label.setStyle({
              borderColor: "#17b990",
              padding: "2px 5px 2px 5px",
              color: "#333",
              cursor: "pointer"
            });
            marker.setLabel(label);
          }
        });
        local.search(myValue);
      }
    },
    // 经纬度转换成地址功能
    getGeocoder() {
      var that = this;
      var geocoder = new BMap.Geocoder();
      that.Map.addEventListener("click", function(e) {
        if (e.overlay === null) {
          // click的地方没有覆盖物时才执行
          geocoder.getLocation(e.point, function(rs) {
            that.searchInput = rs.address;
            that.$bus.$emit("getMap", rs.address, e.point);
            // 创建标注
            that.Map.clearOverlays();
            var marker = new BMap.Marker(e.point);
            that.Map.addOverlay(marker);
            //添加label标注
            let label = new BMap.Label(rs.address, {
              offset: new BMap.Size(-10, -25)
            });
            label.setStyle({
              borderColor: "#17b990",
              padding: "2px 5px 2px 5px",
              color: "#333",
              cursor: "pointer"
            });
            marker.setLabel(label);
          });
        }
      });
    },

    // 定位
    getGeolocation() {
      let that = this;

      function myFun(result) {
        let cityName = result.name;
        that.Map.setCenter(cityName);
        that.mapLoading = false;
      }
      let myCity = new BMap.LocalCity();
      myCity.get(myFun);
    },

    //获取标注点
    getMarket() {
      let that = this;
      // 注意: pop方式无法实时监听markers的变化，所以用这种全局监听方式
      this.$bus.$on("mapMarkers", markers => {
        this.markers = markers;
        let pointsView = [];
        //添加标注
        markers.forEach(function(item, key, items) {
          let point = new BMap.Point(item.longitude, item.latitude);
          pointsView.push(point);

          that.addMarker(point, key, item);
        });

        that.Map.setViewport(pointsView);
        that.mapLoading = false;
      });
    },

    // 添加market图标
    addMarker(point, index, item) {
      let that = this;
      // 创建标注对象并添加到地图
      let myIcon = new BMap.Icon(
        require("./map_marker_icon.png"),
        new BMap.Size(32, 38)
      );
      let marker = new BMap.Marker(point, {
        icon: myIcon
      });
      that.Map.addOverlay(marker);

      let labelName = !that.mapSearch ? item.areaName : item.name;

      //添加label标注
      let label = new BMap.Label(labelName, {
        offset: new BMap.Size(-10, -25)
      });
      label.setStyle({
        borderColor: "#17b990",
        padding: "2px 5px 2px 5px",
        color: "#333",
        cursor: "pointer"
      });
      marker.setLabel(label);

      //监听标记点击
      if (!that.mapSearch) {
        marker.addEventListener("click", function() {
          this.openInfoWindow(that.addMarkerInfoWindow(item));
        });
      }
    },
    // 添加market弹窗
    addMarkerInfoWindow(item) {
      let html = `
        <div style="font-size:14px;color:#666;">

        开启:<span style="font-size:16px;">:${item.onlineCount}</span>
          关闭:<span style="font-size:16px;">${item.shutDownCount}</span>
          离线:<span style="font-size:16px;">${item.offlineCount}</span>
          维修:<span style="font-size:16px;">${item.repairCount}</span>
          </div>
      `;
      let info = new BMap.InfoWindow(html, {
        width: 100, // 信息窗口宽度
        height: 30, // 信息窗口高度
        title: `<p style="text-align:center;padding-bottom:10px;">区域设备信息</p>`
        // title: `<p style="text-align:center;padding-bottom:10px;">区域设备信息</p>` // 信息窗口标题
      }); // 创建信息窗口对象
      return info;
    },
    // 搜索
    bindSearch() {
      let that = this;
      that.Map.clearOverlays();
      if (!this.$utils.isNull(that.searchInput)) {
        let local = new BMap.LocalSearch(that.Map, {
          renderOptions: {
            map: that.Map,
            autoViewport: true,
            panel: "r-result"
          },
          onSearchComplete: function(pois) {},
          pageCapacity: 5
        });
        local.searchInBounds(that.searchInput, that.Map.getBounds());
        local.setMarkersSetCallback(function(pois) {
          for (var i = 0; i < pois.length; i++) {
            pois[i].marker.addEventListener("infowindowopen", function(e) {
              let datas = e.target.z;
              that.searchInput = datas.title;
              that.latLog = {
                lat: datas.point.lat,
                lng: datas.point.lng
              };
              that.$bus.$emit("getMap", that.searchInput, that.latLog);
            });
          }
        });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#map-wrap {
  height: 100%;
  position: relative;
}
#map {
  width: 100%;
  height: 100%;
}
#map-search {
  position: absolute;
  width: 390px;
  height: 35px;
  // background: yellow;
  left: 20px;
  top: 25px;
  .el-input-group__append {
    width: 32px;
    text-align: center;
    background-color: #17b990;
    .el-button {
      color: white;
    }
  }
}
</style>
