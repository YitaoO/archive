<!-- header模板 -->
<template>
<div id="header">
  <span class="header-top" :style="headerBg">
    <p class="title ">预制梁场生产监控大屏</p>
  </span>
  <!-- <div class="header-right primary-color-white">
    
    <span class="time ">{{startDate}}</span>
    <span class="icon time-icon"></span>
    <span class="time-title ">总工期 <span class="count">{{durations}}</span> 天，已安全运作 <span class="count">{{safeRunDays}}</span> 天</span>
    <span @click="logout"  class="top-logout">登出</span>
  </div>
   <el-select class="header-select" size="small" @change="handleSelect" v-model="yardId" placeholder="请选择">
      <el-option
        v-for="item in list"
        :key="item.yardId"
        :label="item.yardName"
        :value="item.yardId">
      </el-option>
    </el-select>  -->
</div>
</template>

<script>
import headerBg from "../../assets/header_bg.png";
export default {
  data() {
    return {
      durations: "",
      safeRunDays: "",
      time: "",
      yardId: "",
      startDate: "",
      headerBg: {
        background: `url(${headerBg}) no-repeat`,
        backgroundSize: "100% 100%"
      }
    };
  },
  props: {
    list: Array
  },
  created() {
    let that = this;

    this.yardId = this.$cookies.get("board_yardId");
    this.startDate = this.$moment(new Date()).format("YYYY-MM-DD"); //修改为获取当前地址

    // setInterval(function() {
    //   that.time = that.$moment(new Date()).format("YYYY-MM-DD");
    // }, 1000);

    this.getData();
  },
  methods: {
    getData() {
      this.$customAxios
        .get("/wpNewBoard/getDuraSafeRun", {
          params: {
            projYardId: this.yardId
          }
        })
        .then(resq => {
          this.durations = resq.data.durations;
          this.safeRunDays = resq.data.safeRunDays;
          // this.startDate = resq.data.startDate;
        })
        .catch(error => {});
    },
    // 登出
    logout() {
      this.$customAxios
        .get("api/logout")
        .then(resq => {
          this.$cookies.remove("wb_userId");
          this.$cookies.remove("wb_password");
          window.history.go(-1);
        })
        .catch(error => {});
    },
    handleSelect(yardId) {
      if (this.$cookies.yardId == yardId) return;
      this.$cookies.set("board_yardId", yardId);
      window.location.reload();
    }
  }
};
</script>

<style lang="scss">
#header {
  position: relative;
  height: 5.5rem;
}
.header-select {
  position: absolute !important;
  top: 3.5rem;
  right: 1rem;
  .el-input {
    border: 1px solid #32ffd8;
    padding-left: 0.2rem;
  }
  .el-input__inner {
    background: #122f34 !important;
    border: none !important;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #00ffd1;
  }
  .el-icon-arrow-up:before {
    color: #32ffd8 !important;
  }
}
.header-top {
  text-align: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 4.25rem;
  .title {
    color: #4ef5ff;
    line-height: 3rem;
    font-size: 1.7rem;
    padding-right: 20px;
  }
}

.header-right {
  position: absolute;
  right: 0.75rem;
  height: 2.5rem;
  line-height: 2.5rem;
  .time {
    font-family: Impact;
    font-size: 0.8rem;
    color: #ffffff;
    padding-right: 10px;
  }
  .time-title {
    font-family: PingFangSC-Regular;
    font-size: 0.8rem;
    color: #ffffff;
    padding-left: 0.25rem;
    padding-right: 0.5rem;
    .count {
      font-family: Impact;
      font-size: 1rem;
      color: #2effd8;
      line-height: 1.4rem;
    }
  }
  .time-icon {
    vertical-align: sub;
    width: 1.2rem;
    height: 1.1rem;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAABGdBTUEAALGPC/xhBQAAAYBJREFUSA3tUrFOAkEQnb2QUGtiaWFijdr4BzbYWvFfNnaW2lFQSfwCYyeKBmOhNc0liMCN783uHie5ay45C+PAMrsz783svkFkw1R1gEUbbKQqj8Qao4TTOliNVReJyJcTt4RfW/dw8q4a4roIefh8D7zDuWDdo8uZCustgYdPNAMgK0AKW2Vc8YV36nH5HnHylL5oAWc55BPJNJBxs5XI8HFk8JuHkcWtMIvYwq1YIC5eAGt4P/acuyfUADDkgRbX+XxWk4bPwnOnV32ZT96kvbsnW6dnFmOesjDvsdhTnhCf3l7L/ONV2jv7sn3cA87XYt51Zi/QjGQS1vpGcoxHEgt7vG8Sz9SbulsuNsf8IFHQN5cAQMRM/5DjnOI8TCrG+Ql609ssTBrPZw1ik6ixgSwYNfSN1WbkC0Zt6WPTYhMrCrzPe34r6Z3bgKp+8OjaRlFcmqb0jRkEa9Z+v8HJRV+4yqxOrvEX/MEh19GZ86ri/c+g7N/8I9a4RI03+AYVfv4K/oHUNgAAAABJRU5ErkJggg==")
      no-repeat;
    background-size: 100% 100%;
  }
  .top-logout {
    box-shadow: inset 0 0 8px 0 rgba(50, 255, 217, 0.53),
      inset 0 17px 0 0 rgba(50, 255, 217, 0.1);
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #32ffd9;
    padding: 5px;
  }
}
</style>
