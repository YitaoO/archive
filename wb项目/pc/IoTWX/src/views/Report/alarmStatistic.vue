<template>
  <div class="alarmStatisticDiv" style="height:100%">
    <search :flag="2"></search>
    <el-row style="height: calc(100% - 81px);overflow-y:auto;overflow-x:hidden;">
      <div class="alramHistoryPic" style="margin-bottom:10px;"></div>
      <div class="alarmStatistic" style="padding:12px;">
        <p>历史告警统计表</p>
        <el-table :data="list" style="width: 100%">
        <el-table-column type="index" label="序号" min-width="80"></el-table-column>
        <el-table-column prop="typeName" label="事件名称" min-width="180"></el-table-column>
        <el-table-column prop="sum" label="事件次数" min-width="80"></el-table-column>
        <el-table-column prop="sum3" label="严重告警" min-width="80"></el-table-column>
        <el-table-column prop="sum2" label="一般告警" min-width="80"></el-table-column>
        <el-table-column prop="sum1" label="提示告警" min-width="80"></el-table-column>
      </el-table>
      </div>
    </el-row>
  </div>
</template>

<script>
import search from '@/views/Report/search'
export default {
  components: { search },
  name: "alarmStatistic",
  data() {
    return {
      list: []
    }
  },
  destroyed(){
    this.$bus.$off('alarmStatistic');
  },
  mounted() {
    var param = {
      areaIds: '',
      userId: this.$cookies.getJSON('userInfo').UserID,
      type: 2, 
      beginDate: this.$moment().subtract(7, 'days').format('YYYY-MM-DD'),
      endDate: this.$moment(new Date()).format('YYYY-MM-DD'),
      itype: 1
    }
    this.getBar(param)
    this.getList(param);
    this.$bus.$on('alarmStatistic', (params) => {
      this.getBar(params);
      this.getList(params);
    })
  },
  methods: {
    getList(params){
      this.$customAxios.get('typeWarn/statistical',{params}).then(resq => {
        this.list = resq;
        resolve(resq)
      }).catch(error => {});
    },
    getBar(params){
      var loading = this.$utils.loading(document.getElementsByClassName('alarmStatisticDiv')[0]);
      const alramHistoryPic = this.$echarts.init(document.querySelector('.alramHistoryPic'));
      alramHistoryPic.clear();
      this.$customAxios.get('typeWarn/statisticalChars', {params}).then(resq => {
        var option = {
          title : {
            text: '历史告警统计图',
            textStyle: {
              fontSize: 14,
              // fontFamily: 'PingFang-SC-Heavy'
            }
          },
          tooltip : {
            trigger: 'axis'
          },
          calculable : true,
          xAxis : [{
            type : 'category',
            data : resq.title
          }],
          yAxis : [{
            type : 'value',
            name: '单位(次)'
            // interval: 1, // 纵轴的步长
            // splitNumber: 10
          }],
          series : [{
            name:'次数',
            type:'bar',
            data: resq.times,
            barWidth: 30
          }]
        };
        alramHistoryPic.setOption(option);
        loading.close()
        window.onresize = alramHistoryPic.resize;
        resolve(resq)
      }).catch(error => {loading.close();});
    }
  }
}
</script>

<style lang="scss">
.alarmStatistic {
  background-color: #ffffff;
  border: 1px solid rgb(220, 223, 225);
  p {
    font-size: 14px;
    font-weight: bold;
    color: #333333;
  }
}
</style>
