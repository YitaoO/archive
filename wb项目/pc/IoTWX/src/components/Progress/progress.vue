<!-- 进度条组件 -->
<template>
<div id="progress">
  <div id="dragbox" class="dragnum " ref="dragbox">
    <!-- 进度条 -->
    <div class="progress" @mouseup="mouseMove($event)" @mouseleave="timeEnd($event)">
      <div class="progressbar" :style="{width:(endData-beginData)+'%',transition:'width '+transTime+'s',left:(beginData+1)+'%'}">
      </div>
    </div>
    <!-- 开始滑块 -->
    <div id="beginBtn" class="bardrag" @mousedown="mouseDown($event,0)" :style="{left:beginData+'%'}"></div>
    <!-- 结束滑块 -->
    <div id="endBtn" class="bardrag" @mousedown="mouseDown($event,1)" :style="{left:endData+'%'}"></div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      pos: {},
      beginData: 20, //开始数据
      endData: 80, //结束数据


      startX: null,
      locked: false,
      distance: 0, //移动位置
      endDistance: 0, //上次操作结束位置
      transTime: .3, //点击拖动动画
      dragWidth: 0, //进度条宽度

      startNum: 10,
      endNum: 50,
      nowNum: 10
    }
  },
  methods: {
    mousePos: function(e) {
      var pos = {};
      pos.x = e.pageX;
      this.pos = pos;
      return pos;
    },
    timeEnd: function(e) {},
    // 按下鼠标
    mouseDown: function(e, type) {
      this.transTime = 0;
      this.startX = this.mousePos(e).x //开始x坐标

      console.log(this.startX);
      if (type == 0) { //最小值

      } else { //最大值

      }

      // console.log(this.pos);
    },
    // 移动鼠标
    mouseMove: function(e, type) { // 当鼠标指针移动到元素上方移动时

      console.log("放开了");
      // if (!this.locked) return;
      let moveX = this.mousePos(e).x - this.startX; //移动位置
      console.log(moveX);

      if (type == 0) { //最小值
        // console.log(this.distance);
      } else { //最大值
      }

      // console.log(moveX);
    },
    // 获得距离
    getDistance() {
      var xScroll, yScroll;
      if (self.pageYOffset) {
        yScroll = self.pageYOffset;
        xScroll = self.pageXOffset;
      } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
        yScroll = document.documentElement.scrollTop;
        xScroll = document.documentElement.scrollLeft;
      } else if (document.body) { // all other Explorers
        yScroll = document.body.scrollTop;
        xScroll = document.body.scrollLeft;
      }
      let arrayPageScroll = new Array(xScroll, yScroll);
      return arrayPageScroll;
    },

    timeEnd: function(e) {
      this.transTime = .3;
      this.locked = false;
    },
    countNum: function(num) {
      var len = this.endNum - this.startNum;
      var scale = Math.ceil(this.dragWidth / len);
      this.nowNum = this.startNum + Math.ceil(num / scale);
    }

  },
  mounted: function() {
    this.dragWidth = document.getElementById('dragbox').clientWidth //总宽度
  }
}
</script>
<style lang="scss"scoped>
#progress {
    text-align: center;
}
#dragbox {
    width: 90%;
    position: relative;
    background-color: #f5f8fa;
    border-radius: 2px;
    margin-bottom: 0;
    height: 5px;
}

.progress {
    background-color: #f5f8fa;
    border-radius: 2px;
    margin-bottom: 0;
    height: 5px;
    margin-bottom: 20px;
    overflow: hidden;
}

.progressbar {
    position: absolute;
    background-color: #fd7762;
    float: left;
    width: 0;
    height: 100%;
    font-size: 12px;
    line-height: 5px;
    color: #fff;
    text-align: center;
    -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
    -webkit-transition: width 0.6s ease;
    -o-transition: width 0.6s ease;
    transition: width 0.6s ease;
}

.bardrag {
    position: absolute;
    top: -9px;
    left: 10px;
    display: inline-block;
    width: 23px;
    height: 23px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkJBQTVGRjk1Q0QwMTFFOEJBRTM5OTNDRTY2N0E3MkYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkJBQTVGRkE1Q0QwMTFFOEJBRTM5OTNDRTY2N0E3MkYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGQkFBNUZGNzVDRDAxMUU4QkFFMzk5M0NFNjY3QTcyRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQkFBNUZGODVDRDAxMUU4QkFFMzk5M0NFNjY3QTcyRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv8VWh8AAAGzSURBVHjanJXfSgJBFMbXISHDPyShdZMFQhh1WXcJvUqvENk75EMF211dRVFEQuSNVpKYkheW2zfxCYfTqNsc+MHu7My3Z/59J/F9ehRMiQRYAasgD1IgCUZgCN5BG3RA5BJYmCJcBBWQcXxLkizYAH1wD17miRuwA0pB/LAJ7INncAvGUkw+7/1TWEaJ440r811QcKz7AaiCLZADPfAAQnCh1rtAnevfwdzQIqcmw25kDZRnZNsAZ9xYGZd2DwyzqziE63OEA36vs7+MbatreNwyailqXII4kWP/hGhLW13j+Gs1RsauGVT17A0viIxDz9Oix+UNb57Owic21XvK8LbJyHqK69ucNPQKGR+e4n31PjI0IX12feJJvQ+teFc1nnuK63FdK95SjaFH9g2Ok9Ey9OOBaIx4pXsxhXvsLz3G6nUMG+/UAOsVJzFm0GA/7S1WL5q4ojX6JlhXPzgWrljmMbWn4pGOGDqqUHNSOKTl3oBFZbsRBcKYS/RGnT/FwlaQK/7ZJ5q02vG0Mjem0bdpm+kYogOu8dwaGog9eKUdr4FlsMT+X+CT96M1q/r/CDAATPVkbMiK6PMAAAAASUVORK5CYII=") no-repeat;
    border-radius: 2px;
    cursor: e-resize;
}

.dragnum {
    display: inline-block;
    vertical-align: middle;
}

.nowbar {
    margin-top: 10px;
}
</style>
