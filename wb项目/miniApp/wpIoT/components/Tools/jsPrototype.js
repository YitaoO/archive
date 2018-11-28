/**
 * 为原型链添加方法
 */

/**
 * 日期格式化
 * new Date().format("yyyy-MM-dd hh:mm:ss"):2018-04-25 15:03:53
 *  new Date().format("yyyy-MM-dd"):2018-04-25
 *
 *
 */
 Date.prototype.format = function(fmt) {
    var o = {
       "M+" : this.getMonth()+1,                 //月份
       "d+" : this.getDate(),                    //日
       "h+" : this.getHours(),                   //小时
       "m+" : this.getMinutes(),                 //分
       "s+" : this.getSeconds(),                 //秒
       "q+" : Math.floor((this.getMonth()+3)/3), //季度
       "S"  : this.getMilliseconds()             //毫秒
   };
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt;
 }
