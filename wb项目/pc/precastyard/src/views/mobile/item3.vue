
<template>
<div class="mobile-item3">
  <Title :index=3></Title>
  <div class="item grid-list">
    <div class="item-right">
      <span class="icon" :style="iconFinish"></span>
      <span class="title">已完成</span>
      <span class="icon" :style="iconUnFinishrate"></span>
      <span class="title">完成率(%)</span>
    </div>
    <div class="item-scale center-wrap" :style="styleHeight"></div>
    <div class="noData" v-if="noData">暂无数据...</div>
  </div>    
</div>

</template>

<script>
import Title from "./title";
import iconFinish from "../../assets/item3_finish_icon.png";
import iconUnFinishrate from "../../assets/item3_finishrate_icon.png";

export default {
  components: {
    Title
  },
  data() {
    return {
      iconFinish: {
        background: `url(${iconFinish}) no-repeat`,
        backgroundSize: "100% 100%"
      },
      iconUnFinishrate: {
        background: `url(${iconUnFinishrate}) no-repeat`,
        backgroundSize: "100% 100%"
      },
      styleHeight: {
        // height: 0
        height: "28rem"
      },
      noData: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 请求数据
    getData() {
      this.$customAxios
        .get("/wpNewBoard/getBridgeSetupRate", {
          params: {
            projYardId: this.$cookies.get("board_yardId")
          }
        })
        .then(resq => {
          let list = resq.data;
          if (list.length == 0) {
            this.noData = true;
            return;
          }
          this.styleHeight = {
            // height: "28rem"
          };

          this.setEcharts(list);
        })
        .catch(error => {});
    },

    // 生成echarts
    setEcharts(list) {
      let nameList = [];
      let ValueRate = [];
      let actCntList = [];
      let planCntList = [];
      list.forEach(item => {
        nameList.push(item.bridgeName);
        actCntList.push(item.actCnt);
        planCntList.push(item.planCnt);
        ValueRate.push((item.actCnt / item.planCnt).toFixed(2) * 100);
      });

      this.$echarts.init(document.querySelector(".item-scale")).setOption({
        grid: {
          top: 40,
          left: 40,
          right: 20,
          bottom: 40
        },
        yAxis: {
          type: "category",
          top: 4,
          data: nameList,
          axisLabel: {
            interval: 0,
            rotate: 45,
            margin: 5,
            textStyle: {
              color: "#2E3B46"
            }
          }
        },
        xAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#2E3B46"
              }
            }
          },
          {
            type: "value",
            min: 0,
            max: 100,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: "{value} %",
              textStyle: {
                color: "#2E3B46"
              }
            }
          }
        ],
        series: [
          {
            data: actCntList,
            type: "bar",
            stack: "bar",
            barWidth: 13, //柱图宽度
            itemStyle: {
              color: "#862CF8",
              borderColor: "#862CF8"
            }
          },
          {
            data: planCntList,
            type: "bar",
            stack: "bar",
            barWidth: 13, //柱图宽度
            itemStyle: {
              color: "rgba(0,0,0, 0.1)",
              borderColor: "#862CF8"
            }
          },
          {
            data: ValueRate,
            type: "line",
            xAxisIndex: 1,
            itemStyle: {
              color: "#FFCB00"
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss">
.mobile-item3 {
  position: relative;
  .item-right {
    .icon {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
// .item-scale {
//   height: 11rem;
// }
</style>

