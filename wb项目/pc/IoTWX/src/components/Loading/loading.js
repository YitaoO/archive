/**
 * loading组件入口
 */
import LoadingComponent from './loading'
import Vue from "vue";

let instance;

const LoadingConstructor = Vue.extend(LoadingComponent);

instance = newLoadingConstructor({
  el: document.createElement("div");
})

instance.show = false;
const loading = {
  show(options = {}) {
    instance.show = true;
    if (options) {
      options.el.appendchild(instance.$el);
      instance.text = options.text;
    }

  },
  hide() {
    instance.show = false;

  }
};

export default {
  install() {
    if (!Vue.$loading) {
      Vue.$loading = loading;
    }
  }
  Vue.mixin({
    created() {
      this.$loading = Vue.$loading;
    }
  })
}