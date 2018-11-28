<!-- header模板 -->
<template>
<el-col :span="8" class="line-item item8">
  <div class="title">
    <div class="title-name">
      视频
    </div>
    <!-- <div class="title-sanjiao"></div> -->
  </div>
  <div class="center-wrap ">
    <videoLive :options="options"></videoLive>
  </div>


</el-col>
</template>

<script>
import videoLive from "@/components/Video/video";
export default {
  data() {
    return {
      options: {
        // url:
        // "rtmp://rtmp.open.ys7.com/openlive/251ba56b0e3842cb9b334265ce87169c"
        url:
          "http://hls.open.ys7.com/openlive/3ae96bfea34748ef8b312f722d89be27.m3u8"
      }
    };
  },
  components: {
    videoLive
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss">
.item8 {
  .title {
    z-index: 1;
  }
}
</style>
