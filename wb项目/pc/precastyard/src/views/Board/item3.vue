<!-- Item3模板 -->
<template>
<el-col :span="8" class="line-item" v-loading="loading">
  <div class="title">
    <div class="title-name">
      梁安装情况
    </div>
    <!-- <div class="title-sanjiao">
    </div> -->
  </div>
  <div class="item-situation center-wrap font-size-16">
    <p class="title">梁出厂总数：<span class="count">{{leaveCnt}}</span></p>
    <div class="progress">

    </div>
    <span class="label unfinish">未安装：<span class="count">{{((notSetupRate / 100) * leaveCnt).toFixed(0)}}， {{notSetupRate}}%</span></span>
    <span class="label finish">已安装：<span class="count">{{((setupRate / 100)  * leaveCnt).toFixed(0)}}，  {{setupRate}}%</span></span>
  </div>
</el-col>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      leaveCnt: "",
      notSetupRate: "",
      setupRate: ""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 请求数据
    getData() {
      // let that = this
      this.$customAxios
        .get("/wpBoard/getBridgeSetup", {
          params: {
            projYardId: this.$cookies.get("board_yardId")
          }
        })
        .then(resq => {
          let datas = resq.data;
          this.leaveCnt = datas.leaveCnt;
          this.notSetupRate = datas.notSetupRate;
          this.setupRate = datas.setupRate;
          this.setEcharts(datas);
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 生成echarts
    setEcharts(data) {
      this.$echarts.init(document.querySelector(".progress")).setOption({
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
            color: ["#00E396", "#006959"],
            hoverAnimation: false,
            legendHoverLink: false,
            data: [
              {
                value: ((data.setupRate / 100) * data.leaveCnt).toFixed(0),
                name: "完成"
              },
              {
                value: ((data.notSetupRate / 100) * data.leaveCnt).toFixed(0),
                name: "未完成"
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
.item-situation {
  position: relative;
  box-sizing: border-box;
  padding: 0 1rem;
  .title {
    text-align: right;
    .count {
      font-family: Impact;
      font-size: 0.8rem;
      color: #00e396;
      line-height: 1.1rem;
    }
  }
  .progress {
    position: absolute;
    left: 0;
    right: 0;
    width: 7rem;
    height: 7rem;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .label {
    position: absolute;

    background: #1d2040;
    padding: 0.25rem 0.5rem;
    &.unfinish {
      top: 5rem;
      left: 2.5rem;
    }
    &.finish {
      bottom: 5rem;
      right: 2.5rem;
    }
    .count {
      font-family: Impact;
      font-size: 0.8rem;
      color: #00e396;
      line-height: 1.1rem;
    }
  }
}
</style>
