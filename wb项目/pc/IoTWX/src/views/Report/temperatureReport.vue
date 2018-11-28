<template>
  <div class="temperatureReport" style="height:100%">
    <search :flag="1"></search>
    <div style="height:calc(100% - 81px);overflow:auto;">
      <el-row style="margin-bottom:10px;">
        <div class="temperatureHistory"></div>
      </el-row>
      <el-row>
        <div class="humidityHistory"></div>
      </el-row>
    </div>
  </div>
</template>

<script>
import search from '@/views/Report/search'
export default {
  components: { search },
  name: "temperatureReport",
  data() {
    return {
      one: null,
      two: null
    }
  },
  destroyed(){
    this.$bus.$off('temperatureReport');
  },
  mounted() {
    this.getList({
      areaIds: '',
      userId: this.$cookies.getJSON('userInfo').UserID,
      type: 2, 
      beginDate: this.$moment().subtract(7, 'days').format('YYYY-MM-DD'),
      endDate: this.$moment(new Date()).format('YYYY-MM-DD'),
      itype: 1
    }, {
      areaIds: '',
      userId: this.$cookies.getJSON('userInfo').UserID,
      type: 2, 
      beginDate: this.$moment().subtract(7, 'days').format('YYYY-MM-DD'),
      endDate: this.$moment(new Date()).format('YYYY-MM-DD'),
      itype: 2
    })
    this.$bus.$on('temperatureReport', (params) => {
      var params1 = Object.assign({}, params)
      params1.itype = 2;
      params.itype = 1;
      this.getList(params, params1);
    })
  },
  methods: { 
    getList(params, params1){
      var loading = this.$utils.loading(document.getElementsByClassName('temperatureReport')[0]);
      this.$customAxios.get('timeHumiture/getTimeHumitureData', {params: params}).then(resq => {
        this.$customAxios.get('timeHumiture/getTimeHumitureData', {params: params1}).then(resq1 => {
          this.one = this.getLine('.temperatureHistory', '温度历史曲线图', '温度(°C)', resq.devNames, resq.devData);
          this.two = this.getLine('.humidityHistory', '湿度历史曲线图', '湿度(RH)', resq1.devNames, resq1.devData);
          var that = this;
          loading.close();
          window.onresize = function(){
            that.one.resize();
            that.two.resize();
          }
          resolve(resq)
        }).catch(error => {loading.close();});
      }).catch(error => {loading.close();});
    },
    getLine (className, title, unit, names, datas) {
      const echartLine = this.$echarts.init(document.querySelector(className))
      echartLine.clear();
      var me = this
      var option = {
        title: {
          text: title,
          textStyle: {
            fontSize: 14,
            // fontFamily: 'PingFang-SC-Heavy'
          }
        },
        dataZoom: {
          show: true, // 展示拖拉框
          start: 70 // 首个起始位置的百分比
        },
        grid: {
          y2: 80
        },
        xAxis: [{
          type: 'time',
          splitNumber: 10 // 分割段数，不指定时根据min、max算法调整
        }],
        yAxis: [{
          type: 'value',
          name : unit,
          scale: true, // 根据当前的值，自适应坐标轴
          // min: title === '温度历史曲线图'?10:0,
          // max: title === '温度历史曲线图'?40:100
          // boundaryGap: true
          boundaryGap: [1,1]
        }],
        legend: {
          data: names === null?[]:names
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            var date = new Date(params.value[0])
            var data = me.$moment(date).format('YYYY-MM-DD HH:mm:ss')
            return data + '<br/>' + params.value[1]
          }
        },
        // series.data里的return数组可以随便传，第一个参数为横轴，第二个参数为纵轴，第三个参数可以随便传，
        // 用于其他地方使用.比如demo 就把该参数给了 symbolSize ，用于计算 tooltip 的圈圈大小
        series : [] // 这个必须要声明
      }
      if(datas !== null){
        for (var i = 0; i < datas.length; i++) {
          option.series.push({
            name: names[i],
            type: 'line', // 折线图
            showAllSymbol: true,
            symbolSize: function (value) {
              return 1
            },
            data: datas[i]
          })
        }
      }
      echartLine.setOption(option);
      return echartLine
    }
  }
}
</script>

<style lang="scss">

</style>
