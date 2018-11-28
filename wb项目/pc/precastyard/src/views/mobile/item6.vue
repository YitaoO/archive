
<template>
<div class="mobile-item6">
  <Title :index=6></Title>
  <div class="item">
    <el-carousel >
      <el-carousel-item :style="itemBg1">
      </el-carousel-item>
      <el-carousel-item :style="itemBg2">
      </el-carousel-item>
    </el-carousel>
  </div>   
</div>

</template>

<script>
import Title from "./title";
import itemBg1 from "../../assets/test_photo_01.jpg";
import itemBg2 from "../../assets/test_photo_02.jpg";
export default {
  components: {
    Title
  },
  data() {
    return {
      itemBg1: {
        background: `url(${itemBg1}) no-repeat`,
        backgroundSize: "100% 100%"
      },
      itemBg2: {
        background: `url(${itemBg2}) no-repeat`,
        backgroundSize: "100% 100%"
      }
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    classOption() {
      return {
        step: 0.1,
        waitTime: 4500,
        limitMoveNum: 3
      };
    }
  },
  methods: {
    // 请求数据
    getData() {
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
.mobile-item6 {
  .item {
    width: 100%;
    height: 10rem;
    .pic-wrap {
      height: 48%;
      padding-bottom: 1%;

      .item-pic {
        height: 100%;
      }
    }
  }
}
.el-carousel {
  height: 100%;
}
.el-carousel__container {
  height: 100% !important;
  overflow: hidden !important;
}
.el-carousel__button {
  width: 20px !important;
}
</style>

