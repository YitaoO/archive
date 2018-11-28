<!-- Item9模板 -->
<template>
<div class="line-item item5" v-loading="loading">
  <Title :index=1></Title>
  <div class="title-des des">已生产：{{ProductQty}}片（{{ProductQty}}%）</div>
  <div class="item5-center center-wrap grid-list">
     <div class="echart"></div>
    <!-- <div class="left grid-list-item">
      <div class="echart"></div>
    </div>
    <div class="right grid-list-item">
      <div class="item">
        <p class="title">
          <span class="graphics unFinishedQty"></span>
           <span class="">未完成：<span class="count">{{unFinishedQty}}片</span></span>
        </p>
        <div class="item-bottom">
          <p class="bottom">
            <span class="">已生产：<span class="count">{{ProductQty}}片</span></span>
          </p>
          <p class="bottom">
             <span class="graphics ProductQty"></span>
            <span class="">存梁数：<span class="count">{{OutQty}}片</span></span>
          </p>
          <p class="bottom">
             <span class="graphics Installed"></span>
            <span class="">已安装：<span class="count">{{Installed}}片</span></span>
          </p>
        </div>
      </div>
    </div> -->
  </div>
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
      Installed: "",
      InstalledRate: "",
      OutQty: "",
      OutQtyRate: "",
      ProductQty: "",
      unFinishedQty: "",
      unfinishedRate: ""
    };
  },
  mounted() {
    this.getData();
    // this.setArr()
  },
  methods: {
    // 请求数据
    getData() {
      let that = this;
      this.$customAxios
        .get("/wpNewBoard/getProdStatus", {
          params: {
            projYardId: this.$cookies.get("board_yardId")
          }
        })
        .then(resq => {
          let datas = resq.data;
          this.Installed = datas.Installed;
          this.InstalledRate = datas.InstalledRate;
          this.OutQty = datas.OutQty;
          this.OutQtyRate = datas.OutQtyRate;
          this.ProductQty = datas.ProductQty;
          this.unFinishedQty = datas.unFinishedQty;
          this.unfinishedRate = datas.unfinishedRate;

          this.setEcharts();
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    //计算百分比
    rate(data, tatolData) {
      return ((data * 100) / (data + tatolData)).toFixed(0);
    },

    // 生成echarts
    setEcharts() {
      let that = this;
      this.$echarts.init(document.querySelector(".echart")).setOption({
        series: [
          {
            type: "pie",
            radius: "80%",
            center: ["50%", "60%"],
            color: ["#FF7B26 ", "#FFFE00 ", "#00FF65"],
            label: {
              normal: {
                show: true,
                // color: "#FFE500",
                formatter: "{b}: {c}片({d}%)"
              }
            },
            data: [
              {
                value: that.unFinishedQty,
                name: `未完成`
              },
              {
                value: that.OutQty,
                name: `存梁数`
              },
              {
                value: that.Installed,
                name: `已安装`
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
.item5 {
  .echart {
    width: 100%;
    height: 100%;
    padding-top: 1rem;
  }
  .des {
    color: #4ef5ff;
  }
}
</style>
