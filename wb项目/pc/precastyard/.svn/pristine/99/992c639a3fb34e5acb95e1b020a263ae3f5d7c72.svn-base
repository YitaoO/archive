<!-- 组件 - video-play -->
<template>
<!-- <video id="myPlayer" poster="" controls autoplay>
    <source :src="options.url"/>
</video> -->
<video-player class="vjs-custom-skin player-wrap" ref="videoPlayer" :options="playerOptions">
</video-player>
</template>

<script>
/**
 * 基本用法
 * <videoLive :options="options"></videoLive>
 * 传参说明
 * options={
 *  url: hls播放地址
 * }
 */

import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
let videojs = require("video.js");
window.videojs = videojs;
require("videojs-contrib-hls");

export default {
  name: "live",
  data() {
    return {
      playerOptions: {
        autoplay: true,
        controls: false,
        height: "100%",
        width: "100%",
        sources: [
          {
            withCredentials: false,
            type: "application/x-mpegURL",
            src: this.options.url
          }
        ]
        // ,
        //  controlBar: {
        //     timeDivider: false,
        //     durationDisplay: false
        //   }
      }
    };
  },
  props: {
    options: {
      type: Object
    }
  },
  mounted() {
    // var player = new EZUIPlayer("myPlayer");
    // player.on("error", function() {
    //   console.log("error");
    // });
    // player.on("play", function() {
    //   console.log("play");
    // });
    // player.on("pause", function() {
    //   console.log("pause");
    // });
  },
  methods: {}
};
</script>

<style type="text/css">
#myPlayer {
  width: 100%;
  height: 100%;
}
.player-wrap {
  width: 100%;
  height: 100%;
}

.vjs_video_3-dimensions {
  height: 100% !important;
}
</style>
