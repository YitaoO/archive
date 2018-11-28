<!-- item10模板 -->
<template>
<div class="line-item item8">
  <Title :index=6></Title>

  <div class="center-wrap">
    <el-carousel class="wrap">
      <el-carousel-item >
        <div class="list">
          <span class="item" :style="imageListBg">
            <span class="icon" :style="itemBg1"></span>
          </span>
         <span class="item" :style="imageListBg">
            <span class="icon" :style="itemBg2"></span>
         </span>
        </div>
        
      </el-carousel-item>
      <el-carousel-item >
         <div class="list">
          <span class="item" :style="imageListBg">
            <span class="icon" :style="itemBg1"></span>
          </span>
          <span class="item" :style="imageListBg">
            <span class="icon" :style="itemBg2"></span>
          </span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>


</div>
</template>

<script>
import Title from "./title";
import imageListBg from "../../assets/image_list_bg.png";
import itemBg1 from "../../assets/test_photo_01.jpg";
import itemBg2 from "../../assets/test_photo_02.jpg";
export default {
  components: {
    Title
  },
  data() {
    return {
      imageListBg: {
        background: `url(${imageListBg}) no-repeat`,
        backgroundSize: "100% 100%"
      },
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
  methods: {},
  computed: {}
};
</script>

<style lang="scss">
.item8 {
  .center-wrap {
    padding: 1rem;
    .item-wrap {
      height: 100%;

      //到时多张图片时把这行代码去掉
      margin-top: 5rem;
    }
    .pic-wrap {
      height: 48%;
      padding-bottom: 1%;

      .item-pic {
        height: 100%;
      }
    }
  }
  .wrap {
    height: 100%;
    .list {
      display: flex;
      height: 87%;
      .item {
        position: relative;
        flex: 1;
        border: 1px solid #32ffd9;
        box-shadow: inset 0 0 20px 0 rgba(50, 255, 217, 0.1);
        padding: 0.5rem;
        &:first-child {
          margin-right: 1.3rem;
        }
        .icon {
          display: inline-block;
          vertical-align: middle;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.el-carousel__container {
  height: 100% !important;
  overflow: hidden !important;
}
.el-carousel__button {
  width: 20px !important;
}
</style>
