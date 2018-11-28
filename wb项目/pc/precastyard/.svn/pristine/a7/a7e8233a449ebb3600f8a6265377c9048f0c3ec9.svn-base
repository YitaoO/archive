<!-- header模板 -->
<template>
<el-col :span="8" class="line-item item7" v-loading="loading">
  <div class="title">
    <div class="title-name">
      梁产量统计
    </div>
    <!-- <div class="title-sanjiao"></div> -->
  </div>
  <div class="item7-scale center-wrap"></div>
</el-col>
</template>

<script>
export default {
  data() {
    return {
      loading: true
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
        .get("/wpBoard/getProductionSum", {
          params: {
            projYardId: this.$cookies.get("board_yardId")
          }
        })
        .then(resq => {
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
      let valueList = [];

      for (let i in datas) {
        arrX.push(i);
        valueList.push(datas[i]);
      }
      this.$echarts.init(document.querySelector(".item7-scale")).setOption({
        color: ["#2EFFD8"],
        xAxis: {
          type: "category",
          data: arrX,
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          }
        },
        grid: {
          top: 20,
          bottom: 25
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            data: valueList,
            type: "bar",
            barWidth: 20 //柱图宽度
          }
        ]
      });
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
</style>
