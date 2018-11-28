<!-- Item5模板 -->
<template>
<el-col :span="8" class="line-item item5" v-loading="loading">
  <div class="title">
    <div class="title-name">
      台座状态统计
    </div>
    <!-- <div class="title-sanjiao"></div> -->
  </div>
  <div class="item5-center center-wrap grid-list">
    <div class="left grid-list-item">
      <div class="echart"></div>
    </div>
    <div class="right grid-list-item">
      <p class="item top">
        <span class="graphics"></span>
        <span class="title">正在生产：</span>
        <span class="count">{{producting}}%</span></p>
      <p class="item middle">
        <span class="graphics "></span>
        <span class="title">空闲：</span>
        <span class="count">{{bedFree}}%</span>
      </p>
      <p class="item bottom">
        <span class="graphics"></span>
        <span class="title">已完工：</span>
        <span class="count">{{bedFinish}}%</span>
      </p>
    </div>
  </div>
</el-col>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      bedFinish: "",
      bedFree: "",
      producting: ""
    };
  },
  mounted() {
    this.getData();
    // this.setArr()
  },
  methods: {
    // 请求数据
    getData() {
      // let that = this
      this.$customAxios
        .get("/wpBoard/getBedStateSum", {
          params: {
            projYardId: this.$cookies.get("board_yardId")
          }
        })
        .then(resq => {
          let datas = resq.data;
          this.bedFinish = datas.bedFinish;
          this.bedFree = datas.bedFree;
          this.producting = datas.producting;

          this.setEcharts(datas);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 生成echarts
    setEcharts(datas) {
      this.$echarts.init(document.querySelector(".echart")).setOption({
        series: [
          {
            type: "pie",
            radius: ["70%", "100%"],
            avoidLabelOverlap: false,
            labelLine: {
              normal: {
                show: false
              }
            },
            color: ["#0097FF ", "#fff", "#18FF5E"],
            hoverAnimation: false,
            legendHoverLink: false,
            data: [
              {
                value: datas.producting
              },
              {
                value: datas.bedFree
              },
              {
                value: datas.bedFinish
              }
            ]
          }
        ]
      });
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
.item5-center {
  .left {
    position: relative;
    width: 50%;
    .echart {
      width: 50%;
      height: 50%;
      @include verHorCenter;
    }
  }
  .right {
    .item {
      padding-bottom: 0.5rem;
      .count {
        font-family: Impact;
      }
    }
    .top {
      .graphics {
        background: #0097ff;
      }
      .count {
        color: #0097ff;
      }
    }
    .middle {
      .graphics {
        background: #fff;
      }
      .count {
        color: #fff;
      }
    }
    .bottom {
      .graphics {
        background: #18ff5e;
      }
      .count {
        color: #18ff5e;
      }
    }
    .graphics {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
    }
    .title {
      padding-left: 0.5rem;
    }
  }
}
</style>
