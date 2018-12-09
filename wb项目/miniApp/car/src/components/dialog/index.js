/**
 * 弹窗提示
 */
import Taro from "@tarojs/taro";
//TODO:后期这里应该放在全局，不用每次调用
class Dialog {
  // 警告弹窗
  showAlert(message, myIcon, timer, callBack) {
    Taro.showToast({
      title: message,
      icon: !!myIcon && myIcon != "" ? myIcon : "none", //TODO:这里引用本地图片显示不出来，需要优化
      duration: timer != undefined && timer != "" ? timer : 2000,
      mask: true,
      success: function() {
        if (!!callBack) callBack();
      }
    });
  }
  // 等待中
  showLoading(message) {
    Taro.showLoading({
      title: message != undefined && message != "" ? message : "加载中...",
      mask: true
    });
  }
  // 关闭
  hideLoading() {
    Taro.hideLoading();
  }
  // 底部弹窗
  showDraw(messageArr, callBack) {
    let nameArr = [];
    messageArr.forEach(item => {
      nameArr.push(item.typeName);
    });
    Taro.showActionSheet({
      itemList: nameArr,
      success: function(res) {
        callBack({
          code: 0,
          choiceItem: messageArr[res.tapIndex]
        });
      },
      fail: function(error) {
        callBack({
          code: -1
        });
      }
    });
  }
  // 模拟弹窗(后期实现)
  modelDialog(title, callBack) {
    Taro.showModal({
      title: "提示",
      content: title,
      success: function(res) {
        if (res.confirm) {
          callBack();
        } else if (res.cancel) {
        }
      }
    });
  }
}

export default new Dialog();
