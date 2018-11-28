<!-- 头部tab -->
<template>
<div class="app-top grid-list ">
  <!-- logo -->
  <div class="top-logo grid-list-item">
    <span class="header-icon icon" src=""></span>
  </div>
  <!-- tabs -->
  <div class="top-tabs grid-list-item">
    <li class="primary-color-white cursor-point" :class="{active:index == menuIndex}" @click="bindTab(index,item.modId)" v-for="(item,index) in mainMenu" :key="item.modId">{{item.name}}</li>
  </div>
  <!-- card -->
  <el-popover class="top-card grid-list-item" width="300" placement="top-start" trigger="click">
    <div class="user-wrap primary-color-bg  primary-color-white">
      <div class="user-info">
        <p class="info-item font-size-14 ">欢迎 {{userInfo.name}} 回来！</p>
        <p class="info-item font-size-14">您的单位为: {{userInfo.compName}}</p>
        <p class="info-item">ID:{{userInfo.UserID}}</p>
      </div>
      <div class="user-btn grid-list">
        <div class="btn grid-list-item">
          <span class="icon password"></span>
          <span class="cursor-point" @click="handleReserPass()">修改密码</span>
        </div>
        <span class="line"></span>
        <div class="btn btn-right grid-list-item">
          <span class="icon out"></span>
          <span class="cursor-point" @click="handleOutLogin()">退出登录</span>
        </div>
      </div>
    </div>

    <div class="top-card grid-list-item cursor-point" slot="reference">
      <span class="line"></span>
      <span class="card-userName font-size-14 primary-color-white">Hi!  {{userInfo.name}}</span>
      <i :class="userInfoShow?'el-icon-caret-top':'el-icon-caret-bottom'" class="card-arrow primary-color"></i>
      <span class="card-icon icon"></span>
    </div>
  </el-popover>
  <dialogResetPass :dialog.sync="dialogshow"></dialogResetPass>
</div>
</template>

<script>
import dialogResetPass from "./dialogResetPass.vue";
export default {
  components: {
    dialogResetPass
  },
  props: {
    mainMenu: Array
  },
  data() {
    return {
      menuIndex: 0,
      userInfoShow: false,
      userInfo: this.$cookies.getJSON("userInfo"),
      dialogshow: {
        show: false
      }
    };
  },
  created() {
    let menuIndex = this.$cookies.getJSON("menuIndex");
    if (!!this.$utils.isNull(menuIndex)) {
      this.$cookies.set("menuIndex", 0, 7);
    }
    this.menuIndex = this.$cookies.getJSON("menuIndex");
  },
  methods: {
    //tab切换
    bindTab(index, modId) {
      let that = this;
      that.menuIndex = index;
      this.$cookies.set("renderRouter", true, 7);
      that.$cookies.set("menuIndex", index, 7);
      that.$bus.$emit("tabChange", modId); //传给navbar组件
    },
    // 获取设备信息
    getUsers() {
      this.userInfoShow = !!this.userInfoShow ? false : true;
    },

    // 退出登陆
    handleOutLogin() {
      this.$customAxios
        .get("logout", {})
        .then(resq => {
          window.location.href = "./login.html";
        })
        .catch(error => {});
    },
    // 修改密码
    handleReserPass() {
      this.dialogshow.show = true;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-top {
  position: relative;
}
.top-logo {
  height: 50px;
  position: relative;
  width: 250px;
  span {
    left: 20px;
    top: 9px;
    position: absolute;
    width: 218px;
    height: 30px;
    @include showGlobalImage("index_common_logo_icon");
  }
}
.top-tabs {
  li {
    position: relative;
    font-size: 16px;
    float: left;
    line-height: 50px;
    padding: 0 20px;
    opacity: 0.65;
    &.active {
      color: #fff;
      opacity: 1;
    }
  }
  li.active:after {
    position: absolute;
    right: 0;
    bottom: 2px;
    left: 0;
    display: block;
    width: 73%;
    height: 4px;
    margin: auto;
    content: "";
    background: #fff;
  }
}
.top-card {
  text-align: center;
  width: 200px;
  position: relative;
  .line {
    position: absolute;
    width: 1px;
    top: 0;
    left: 0;
    height: 50px;
    background: #dcdfe1;
  }
  .card-arrow {
    margin-right: 5px;
    margin-left: 5px;
  }
  .card-icon {
    width: 36px;
    height: 36px;
    @include showGlobalImage("header_default_icon");
  }
}

.user-wrap {
  padding: 10px;

  .user-info {
    padding: 10px 0;
    .info-item {
      padding-bottom: 8px;
    }
  }
  .user-btn {
    position: relative;
    height: 40px;
    line-height: 40px;
    text-align: center;
    .line {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      height: 100%;
      width: 1px;
      background: #fff;
    }
    .btn {
      width: 50%;
      .icon {
        width: 25px;
        height: 25px;
        &.password {
          @include showGlobalImage("login_password_icon");
        }
        &.out {
          @include showGlobalImage("login_out_icon");
        }
      }
    }
  }
}
</style>
