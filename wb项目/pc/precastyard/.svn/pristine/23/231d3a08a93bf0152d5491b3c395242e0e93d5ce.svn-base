/**
 * board页面入口
 */
import "@/common/js/resources"; //引用通用内容
import Vue from "vue";
import Board from "./board.vue";
import MobileBoard from "./mobileBoard.vue";

let component = null;
let WidthSize = 0;
let WidthRate = 0;

// ele-ui引入
import {
  Header,
  Progress,
  Select,
  Option,
  Button,
  Carousel,
  CarouselItem
} from "element-ui";
Vue.use(Header);
Vue.use(Progress);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Carousel);
Vue.use(CarouselItem);

//判读是PC还是移动
if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
  component = MobileBoard;
  WidthSize = 750;
  WidthRate = 40;
} else {
  component = Board;
  WidthSize = 1920;
  WidthRate = 20;
}
// 实例化
new Vue({
  el: "#app",
  render: h => h(component)
});
//设置html->font-size
let ele = document.getElementsByTagName("html")[0],
  size = (document.body.clientWidth / WidthSize) * WidthRate;
ele.style.fontSize = size + "px";
