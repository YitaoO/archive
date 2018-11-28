<template>
  <div class="first">
    <search :flag="3"></search>
    <el-row style="height:calc(100% - 81px);">
      <el-col class="history" style="height:calc(100% - 61px);">
        <el-table :data="list" height="100%">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="areaName" label="所在区域" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="devId" label="设备ID" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="devName" label="设备名称" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="content" label="事件名称" min-width="110" show-overflow-tooltip></el-table-column>
          <el-table-column prop="warnLevel" label="事件等级" min-width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag :type="scope.row.warnLevel  | statusFilter">{{scope.row.warnLevel }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="warnDt" label="开始时间" min-width="150" align="center"></el-table-column>
          <el-table-column prop="endDate" label="结束时间" min-width="150" align="center"></el-table-column>
          <el-table-column prop="chaDate" label="历时" min-width="102" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.chaDate | timeFilter}}</template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col>
        <pagination :child-option="pageOption"></pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import search from '@/views/Report/search'
import pagination from '@/components/Pagination/pagination'
export default {
  components: { search, pagination },
  name: "alarmReport",
  filters: {
    statusFilter(status) {
      const statusMap = {
        '提示': 'success',
        '一般': 'gray',
        '严重': 'danger'
      }
      return statusMap[status]
    },
    timeFilter(chaDate) {
      var time = parseInt(chaDate);
      var day = parseInt(time/1440);
      var hour = parseInt((time - day * 1440)/60);
      var minute = (time - day * 1440 - hour * 60)
      if(day===0){
        if(hour===0){
          if(minute===0){
            return '';
          }else{
            return minute + '分'
          }
        }else{
          return hour + '时' + minute + '分'
        }
      }else{
        return day + '天' + hour + '时' + minute + '分'
      }
    }
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      pageOption: {
        page: 1,
        limit: 10,
        total: 0
      },
      params: {}
    }
  },
  destroyed(){
    this.$bus.$off('alarmReport');
    this.$bus.$off('paginationChange');
  },
  mounted(){
    this.params = {
      areaIds: '',
      userId: this.$cookies.getJSON('userInfo').UserID, 
      type: 2,
      beginDate: this.$moment().subtract(7, 'days').format('YYYY-MM-DD'),
      endDate: this.$moment(new Date()).format('YYYY-MM-DD')
    }
    this.getList();
    this.$bus.$on('alarmReport', (params) => {
      this.params = params
      this.pageOption.page = 1
      this.getList();
    })
    // 监听分页组件
    this.$bus.$on('paginationChange', page => {
      this.pageOption.page = page
      this.getList()
    })
  },
  methods: {
    getList(){
      var loading = this.$utils.loading(document.getElementsByClassName('first')[0]);
      this.params.page = this.pageOption.page
      this.params.limit = this.pageOption.limit
      this.$customAxios.get('warnmsg/selectWarnMsgByMap', {
        params: this.params
      }).then(resq => {
        this.list = resq.data
        this.pageOption.total = resq.total
        loading.close()
        resolve(resq)
      }).catch(error => {loading.close();});
    },
  }
}
</script>

<style lang="scss">

</style>
