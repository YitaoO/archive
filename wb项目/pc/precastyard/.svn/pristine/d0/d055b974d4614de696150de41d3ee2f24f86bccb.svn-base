
<template>
<div class="mobile-item2 " v-loading="loading">
  <Title :index=2></Title>
  <div class="item grid-list">
    <div class="left grid-list-item">
      <p class="title">
          <span class="icon" :style="iconUnFinishedQty"></span>
           <span class="des">未完成：<span class="count">{{unFinishedQty}}片</span></span>
        </p>
        <p class="title titledes1">
            <span class="des">已生产：<span class="count">{{ProductQty}}片</span></span>
          </p>
          <p class="title titledes1">
             <span class="icon" :style="iconProductQty"></span>
            <span class="des">存梁数：<span class="count">{{OutQty}}片</span></span>
          </p>
          <p class="title titledes1">
             <span class="icon" :style="iconInstalled"></span>
            <span class="des">已安装：<span class="count">{{Installed}}片</span></span>
          </p>
      </div>
      <div class="right grid-list-item">
      <div class="echart"></div>
    </div>
    </div>    
</div>

</template>

<script>
import Title from "./title";
import iconUnFinishedQty from "../../assets/item2_unfinish_icon.png";
import iconProductQty from "../../assets/item2_ProductQty_icon.png";
import iconInstalled from "../../assets/item2_Installed_icon.png";
export default {
  components: {
    Title
  },
  data() {
    return {
      loading: true,
      iconUnFinishedQty: {
        background: `url(${iconUnFinishedQty}) no-repeat`,
        backgroundSize: "100% 100%"
      },
      iconProductQty: {
        background: `url(${iconProductQty}) no-repeat`,
        backgroundSize: "100% 100%"
      },
      iconInstalled: {
        background: `url(${iconInstalled}) no-repeat`,
        backgroundSize: "100% 100%"
      },
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
        grid: {
          top: 20,
          left: 35,
          right: 15,
          bottom: 10
        },
        series: [
          {
            type: "pie",

            radius: "60%",
            // center: ["50%", "50%"],
            color: ["#0081FF ", "#EAC015", "#00DA01"],
            // label: {
            //   itemStyle: {
            //     color: "#777"
            //   }
            // },
            data: [
              {
                value: that.unfinishedRate,
                name: `${that.unfinishedRate}%`
              },
              {
                value: that.OutQtyRate,
                name: `${that.OutQtyRate}%`
              },
              {
                value: that.InstalledRate,
                name: `${that.InstalledRate}%`
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
.mobile-item2 {
  .item {
    height: 6.5rem;
  }
  .right {
    position: relative;
    width: 55%;
    height: 100%;
    text-align: center;
    .echart {
      width: 100%;
      height: 100%;
      display: inline-block;
    }
  }
  .left {
    font-size: 0.6rem;
    .title {
      padding-bottom: 0.5rem;
      &.titledes {
        padding-left: 0.3rem;
      }
      &.titledes1 {
        padding-left: 1rem;
      }
    }
    .des {
      padding-left: 0.2rem;
    }
    .icon {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      vertical-align: middle;
      margin-left: 0.3rem;
    }
    .count {
      font-family: Impact;
    }
  }
}
</style>

