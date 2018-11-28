var WxSearch = require('../../components/Search/search');

Page({
  data: {},

  // 搜索栏
  onLoad: function() {
    var that = this;
  },
  //加载更多
  onReachBottom: function() {
    setTimeout(() => {
      this.setData({
        isHideLoadMore: true,
        recommends: [{
            goodId: 7,
            name: 'OLAY玉兰油精油沐浴露玫瑰滋养二合一450ml',
            url: 'bill',
            imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161213/148162245074.jpg',
            newprice: "￥36.60",
            oldprice: "￥40.00",
          },
          {
            goodId: 10,
            name: '兰蔻玫瑰清滢保湿柔肤水嫩肤水化妆水400ml补水保湿温和不刺激',
            url: 'bill',
            imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148057937593.jpg',
            newprice: "￥30.00",
            oldprice: "￥80.00",
          }, {
            goodId: 11,
            name: 'Lancome/兰蔻清莹柔肤爽肤水/粉水400ml补水保湿玫瑰水化妆水',
            url: 'bill',
            imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148057953326.jpg',
            newprice: "￥30.00",
            oldprice: "￥80.00",
          },
          {
            goodId: 12,
            name: '美国CLINIQUE倩碧黄油无油/特效润肤露125ml',
            url: 'bill',
            imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/14805828016.jpg',
            newprice: "￥239.00",
            oldprice: "￥320.00",
          },
          {
            goodId: 13,
            name: '法国LANCOME兰蔻柔皙轻透隔离防晒乳霜50ML2017年3月到期',
            url: 'bill',
            imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148058014894.jpg',
            newprice: "￥130.00",
            oldprice: "￥180.00",
          },
        ],
      })
    }, 1000)
  }

})