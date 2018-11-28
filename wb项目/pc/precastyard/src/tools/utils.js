/**
 * 工具类方法
 */
import {
  Loading,
  Notify
} from 'element-ui';
class Utils {

  // 判断值是否为空
  isNull(value) {
    if (value === '' || value === null || value === undefined) {
      return true
    } else {
      return false
    }
  }
  // notice提醒方法
  notice(me, type, title, message) {
    me.$notify({
      type,
      title,
      duration: 2000,
      // duration: 0,
      message
    });
  }

  // axios catch错误时的提示
  catchNotice(me, error, type, title, message) {

    if (this.isNull(error.response)) {
      this.notice(me, 'error', '错误', '查询失败，请联系开发人员！');
    } else {
      if (error.response.status !== 401) {
        me.$notify({
          type: type || 'error',
          title: title || '错误',
          duration: 2000,
          // duration: 0,
          message: message || '查询失败，请刷新后重试！'
        });
      }
    }
  }
}

export default new Utils()