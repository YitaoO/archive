<!-- Item11模板 -->
<template>
<div class="line-item item6" v-loading="loading">
  <Title :index=3></Title>
  <div class="item6-center center-wrap">
    <vue-seamless-scroll :data="list" class="scroll-list">
      <ul>
        <li class="item" v-for="(item,index) in list" :key="index">
          <span>{{item.profile}}</span>
          <!-- <span :class="item.infoType == 1?'warm':''">{{item.infoTitle}},{{item.infoDesc}}</span> -->
        </li>
      </ul>
    </vue-seamless-scroll>

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
      list: []
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    classOption() {
      return {
        // singleHeight: 60,
        step: 0.1,
        waitTime: 4500,
        limitMoveNum: 3
      };
    }
  },
  methods: {
    // 请求数据
    getData() {
      // let that = this
      this.$customAxios
        .get("/wpNewBoard/getMKInfo", {
          params: {
            projYardId: this.$cookies.get("board_yardId")
          }
        })
        .then(resq => {
          this.list = resq.data;

          this.loading = false;
        })
        .catch(error => {});
    }
  }
};
</script>

<style lang="scss">
.item6-center {
  font-family: PingFangSC-Regular;
  font-size: 0.8rem;
  padding: 1rem 0;
  p {
    padding-bottom: 0.8rem;
  }
  .item {
    width: 100%;
    padding-bottom: 0.5rem;
    line-height: 1.2rem;

    .warm {
      color: red;
    }
  }
  .scroll-list {
    height: 100%;
    overflow: hidden;
    background-image: linear-gradient(
      0deg,
      rgba(0, 79, 255, 0) 0%,
      rgba(0, 86, 255, 0.31) 100%
    );
    padding: 0.5rem;
  }
}
</style>
