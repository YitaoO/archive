<!-- header模板 -->
<template>
<div id="mobile-title">
  <span class="image" :style="titleIcon"></span>
    <span class="title">{{titleName}}</span>
    
</div>
</template>

<script>
import Icon1 from "../../assets/item_title_1_icon.png";
import Icon2 from "../../assets/item_title_2_icon.png";
import Icon3 from "../../assets/item_title_3_icon.png";
import Icon4 from "../../assets/item_title_4_icon.png";
import Icon5 from "../../assets/item_title_5_icon.png";
import Icon6 from "../../assets/item_title_6_icon.png";

export default {
  data() {
    return {
      titleName: "",
      titleIcon: {}
    };
  },
  props: {
    index: Number
  },
  created() {
    let title = "";
    let icon = "";
    switch (this.index) {
      case 1:
        (title = "制梁进度"), (icon = Icon1);
        break;
      case 2:
        (title = "生产情况"), (icon = Icon2);

        break;
      case 3:
        (title = "梁安装比率"), (icon = Icon3);
        break;
      case 4:
        (title = "计划实际对比"), (icon = Icon4);
        break;
      case 5:
        (title = "梁场介绍"), (icon = Icon5);

        break;
      case 6:
        (title = "生产照片"), (icon = Icon6);
        break;

      default:
        break;
    }
    this.titleName = title;
    this.titleIcon = {
      background: `url(${icon}) no-repeat`,
      backgroundSize: "100% 100%"
    };
  },
  methods: {}
};
</script>

<style lang="scss">
#mobile-title {
  padding-bottom: 0.5rem;

  .title {
    font-family: PingFangSC-Semibold;
    font-size: 0.8rem;
    color: #2e3b46;
  }
  .image {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    vertical-align: sub;
  }
}
</style>
