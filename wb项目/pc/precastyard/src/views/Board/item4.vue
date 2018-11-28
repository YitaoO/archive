<!-- Item4模板 -->
<template>
<div class="line-item item4" v-loading="loading">
  <Title :index=4></Title>
  <div class="title-des des">
    <span class="graphics left"></span>
    <span class="title4">未完成</span>

    <span class="graphics right"></span>
    <span class="title4">已完成</span>
  </div>
  <div class="item-echart center-wrap">

  </div>
  <div class="noData" v-if="noData">暂无数据...</div>
</div>
</template>

<script>
import Title from "./title";
export default {
  components: {
    Title
  },
  data() {
    return {
      loading: true,
      noData: false
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
        .get("wpNewBoard/getProdSumRate", {
          params: {
            projYardId: this.$cookies.get("board_yardId")
          }
        })
        .then(resq => {
          if (JSON.stringify(resq.data) == "{}" || resq.data.length == 0) {
            this.loading = false;
            this.noData = true;

            return;
          }
          let datas = resq.data;

          this.setEcharts(datas);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 生成echarts
    setEcharts(datas) {
      let arrX = [];
      let planCntList = [];
      let actCntList = [];
      let unComplateList = [];
      let colorList = [];
      let borderWidth = [];
      datas.forEach(function(item) {
        arrX.push(item.makeM);
        planCntList.push(item.planCnt);
        actCntList.push(item.actCnt);
        unComplateList.push(Number(item.planCnt) - Number(item.actCnt));
        colorList.push(item.actCnt < item.planCnt ? "#FF2727" : "#00FF65");
        borderWidth.push(item.actCnt < item.planCnt ? 0 : 1);
      });

      this.$echarts.init(document.querySelector(".item-echart")).setOption({
        color: ["#FFE000"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        calculable: true,
        grid: {
          top: 20,
          bottom: 20,
          left: 30,
          right: 40
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            name: "(月)",
            data: arrX,
            axisLine: {
              lineStyle: {
                color: "#fff",
                opacity: 0.5
              }
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#fff",
                opacity: 0.5
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#fff",
                opacity: 0.3
              }
            }
          }
        ],
        series: [
          {
            data: planCntList,
            type: "bar",
            stack: "bar",
            barWidth: 15, //柱图宽度
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex];
                }
              }
            }
          },
          {
            data: unComplateList,
            type: "bar",
            stack: "bar",
            barWidth: 13, //柱图宽度
            show: false,
            itemStyle: {
              normal: {
                color: "#999",
                opacity: 0.5,
                borderColor: "#FF2727"
              }
            }
          }
        ]
      });

      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
.item4 {
  position: relative;

  .des {
    // position: absolute;

    .graphics {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;

      &.left {
        border: 1px solid #ff2727;
      }
      &.middle {
        background: #00ff42;
      }
      &.right {
        background: #00ff65;
      }
    }
    .title4 {
      font-family: PingFangSC-Regular;
      font-size: 0.8rem;
      color: #ffffff;
      padding-right: 0.8rem;
    }
  }
  .item-echart {
    padding: 1rem !important;
  }
}
</style>
