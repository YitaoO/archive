<template>
<div id="Board-wrap" :style="pcBg">
  <div class="wrap" v-if="projectList.length>0">
  <Header :list="projectList"></Header>
  <div class="lists primary-color-white">
    <div class="list-left">
      <div class="left-top">
        <div class="top-left">
          <div class="item item-firest">
            <Item9 class="line-item"></Item9>    
          </div>
        <div class="item item-seconed">
          <Item0  class="line-item"></Item0>
        </div>
        </div>
        <div class="item11 top-right">
          <div class="bg" :style="itemBg"></div>
          <div class="center">
            <p class="date">{{startDate}}</p>
            <p class="time">总工期 <span class="count">{{durations}}</span> 天，已安全运作 <span class="count">{{safeRunDays}}</span> 天。</p>
          </div>
        </div>
        
      </div>
      <div class="item left-bottom">
        <Item2 class="line-item"></Item2>
      </div>
    </div>
    <div class="list-right">
      <div class="item right-item">
        <Item11 class="line-item"></Item11>
      </div>
      <div class="item right-item">
        <Item4 class="line-item"></Item4> 
      </div>
      <div class="item right-item">
        <Item10 class="line-item"></Item10>
      </div>
    </div>
    <!-- <el-row class="center-line">
      <Item0  class="line-item" :style="listItemBg"></Item0>
      <Item9 class="line-item" :style="listItemBg"></Item9>
      <Item2 class="line-item" :style="listItemBg"></Item2>

    </el-row>
    <el-row class="center-line">
      <Item11 class="line-item" :style="listItemBg"></Item11>
      <Item4 class="line-item" :style="listItemBg"></Item4>
      <Item10 class="line-item" :style="listItemBg"></Item10>
    </el-row> -->

    </div>
  </div>
  
</div>
</template>

<script>
import Header from "@/views/Board/header";
import Item0 from "@/views/Board/item0";
import Item2 from "@/views/Board/item2";
import Item4 from "@/views/Board/item4";
import Item9 from "@/views/Board/item9";
import Item10 from "@/views/Board/item10";
import Item11 from "@/views/Board/item11";
import pcBg from "../../assets/pc_bg.png";
import itemBg from "../../assets/item_right_bg.png";

export default {
  name: "Board",

  components: {
    Header,
    Item0,
    Item2,
    Item4,
    Item9,
    Item10,
    Item11
  },
  data() {
    return {
      projectList: [],
      yardId: "",
      startDate: "",
      durations: "",
      safeRunDays: "",
      pcBg: {
        background: `url(${pcBg}) no-repeat`,
        backgroundSize: "100% 100%"
      },
      itemBg: {
        background: `url(${itemBg}) no-repeat`,
        backgroundSize: "100% 100%"
      }
    };
  },
  mounted() {
    //获取当前时间
    this.startDate = this.$moment(new Date()).format("YYYY-MM-DD"); //修改为获取当前地址
    // this.login();
    this.setTimeOut();
    this.getData();
  },
  methods: {
    // 倒计时
    setTimeOut() {
      let times = 60 * 5; //十分钟后刷新页面
      let timeObj = setInterval(function() {
        times = times - 1; // 倒计时
        if (times === 0) {
          clearInterval(timeObj);

          window.location.reload();
        }
      }, 1000);
    },
    //登录
    login() {
      let ProdUrl = `/api/login?userId=6&password=e10adc3949ba59abbe56e057f20f883e`;
      let testUrl = `/api/login?userId=1001120&password=25f9e794323b453885f5181f1b624d0b`;
      // TODO: 一般不放在url上
      this.$customAxios
        .post(ProdUrl)
        .then(resq => {
          this.getData();
        })
        .catch(error => {});
    },
    // 获取项目列表
    getData() {
      let yardId = this.$cookies.get("board_yardId");
      this.$customAxios
        .get("wpNewBoard/switchYard")
        .then(resq => {
          if (!yardId) {
            this.$cookies.set("board_yardId", resq.data[0].yardId);
            this.yardId = resq.data[0].yardId;
          }

          this.projectList = resq.data;
          this.getDate();
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取日期
    getDate() {
      this.$customAxios
        .get("/wpNewBoard/getDuraSafeRun", {
          params: {
            projYardId: this.yardId
          }
        })
        .then(resq => {
          this.durations = resq.data.durations;
          this.safeRunDays = resq.data.safeRunDays;
        })
        .catch(error => {});
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "@/common/style/board/common.scss"; // 引用通用样式

#Board-wrap {
  height: 100%;
  overflow: hidden;
  .wrap {
    height: 100%;
    .center-line {
      height: 49%;
    }
    .lists {
      height: calc(100% - 5rem);
      padding: 0 1rem;
      display: flex;
      .list-left {
        flex: 1;
        width: 100%;
        padding-right: 0.5rem;
        .left-top {
          height: 55%;
          display: flex;
          .top-left {
            flex: 0 0 40%;
            .item-firest,
            .item-seconed {
              width: 100%;
              height: 50%;
            }
          }
          .top-right {
            flex: 1;
          }
        }
        .left-bottom {
          height: 45%;
        }
      }
      .list-right {
        flex: 0 0 30%;
        height: 100%;
        .right-item {
          height: 33%;
        }
      }
    }
    .line-item {
      height: 100%;
      position: relative;
    }
  }
}
.title-des {
  position: absolute;
  background-image: linear-gradient(
    to left,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  min-width: 20rem;
  height: 2rem;
  line-height: 2.3rem;
  right: 0;
  text-align: right;
  top: 1.3rem;
  font-size: 0.6rem;
}
.item11 {
  position: relative;
  .bg {
    width: 32.15rem;
    height: 26.7rem;
    @include verHorCenter;
  }
  .center {
    background-image: linear-gradient(
      -90deg,
      rgba(4, 14, 32, 0) 0%,
      rgba(0, 47, 122, 0.96) 48%,
      rgba(1, 14, 35, 0) 100%
    );
    height: 4.5rem;
    width: 90%;
    position: absolute;
    top: 6rem;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    .date {
      font-size: 1.4rem;
      padding: 0.8rem 0rem 0.5rem 0;
    }
    .time {
      font-size: 0.9rem;
      .count {
        color: #4ef5ff;
      }
    }
  }
}

.center-wrap {
  position: relative;
  height: calc(100% - 3.7rem);
  box-sizing: border-box;
}
.noData {
  position: absolute;
  left: 0;
  right: 0;

  top: 10rem;
  text-align: center;
  font-size: 0.8rem;
}
</style>
