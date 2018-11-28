<template>
  <div>
    <el-row style="margin-bottom: 10px;">
      <el-col :span="24" class="tempcol2">
        <el-select v-model="params.type" class="tempSelect" @change="changeDate">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="search">
          <el-select v-model="params.areaIds" @change="changeArea" v-if="flag===1?false:true" style="margin-right: 25px;" filterable clearable>
            <el-option v-for="item in areaList" :key="item.areaId" :label="item.areaName" :value="item.areaId">
              <span :style="'display: block;color:#333333;padding-bottom:3px;margin-left:'+(item.type-1)*20+'px;'">{{ item.areaName }}</span>
            </el-option>
          </el-select>
          <el-date-picker v-model="params.beginDate" :disabled="disabledBdate" @change="changeBdate" :picker-options="BdateScore" placeholder="选择开始日期"></el-date-picker> - 
          <el-date-picker v-model="params.endDate" :disabled="disabledEdate" @change="changeEdate" :picker-options="EdateScore" placeholder="选择结束日期"></el-date-picker>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import baseDeviceSetmixins from '@/views/Setting/baseDeviceSetmixins'
export default {
  mixins: [baseDeviceSetmixins],
  name: "search",
  data() {
    return {
      BdateScore: {
        disabledDate: time => {
          if (this.params.endDate)
            return time.getTime() > new Date(this.params.endDate).getTime();
          else return false;
        }
      },
      EdateScore: {
        disabledDate: time => { // 好像跟之前的版本略有不同，这里要把日期-1处理，不然就不能选跟bdate相同的日期
          if (this.params.beginDate)
            return time.getTime() < new Date(new Date(this.params.beginDate)-24*60*60*1000).getTime();
          else return false;
        }
      },
      options: [
        { value: 0, label: '自定义' }, 
        { value: 1, label: '今天' }, 
        { value: 2, label: '最近7天' }, 
        { value: 3, label: '最近一个月'}
      ],
      params: {
        areaIds: '',
        userId: this.$cookies.getJSON('userInfo').UserID, //  areaIds 、userId 一起过滤；areaIds 过滤；userId 查看所有；
        type: 2,
        beginDate: this.$moment().subtract(7, 'days').format('YYYY-MM-DD'),
        endDate: this.$moment(new Date()).format('YYYY-MM-DD'),
        itype: 1, // 1 温度 2 湿度
      },
      disabledBdate: true,
      disabledEdate: true
    }
  },
  mounted(){
    this.getAreaList();
  },
  methods: {
    changeArea(){
      this.$bus.$emit('alarmReport', this.params);
      this.$bus.$emit('alarmStatistic', this.params);
    },
    changeDate(value){
      if(value === 0){ // 自定义
        this.params.beginDate = null;
        this.params.endDate = null;
        this.disabledBdate = false;
        this.disabledEdate = false;
      }else {
        if(value === 1){ // 今天
          this.params.beginDate = this.$moment(new Date()).format('YYYY-MM-DD');
          this.params.endDate = this.$moment(new Date()).format('YYYY-MM-DD');
        }else if(value === 2){ // 7天
          this.params.beginDate = this.$moment().subtract(7, 'days').format('YYYY-MM-DD');
          this.params.endDate = this.$moment(new Date()).format('YYYY-MM-DD');
        }else{ // 30天
          this.params.beginDate = this.$moment().subtract(30, 'days').format('YYYY-MM-DD');
          this.params.endDate = this.$moment(new Date()).format('YYYY-MM-DD');
        }
        this.disabledBdate = true;
        this.disabledEdate = true;
        this.$bus.$emit('alarmReport', this.params);
        this.$bus.$emit('temperatureReport', this.params);
        this.$bus.$emit('alarmStatistic', this.params);
      }
    },
    changeBdate(){
      if(!this.$utils.isNull(this.params.beginDate)){
        this.params.beginDate = this.$moment(this.params.beginDate).format('YYYY-MM-DD');
      }
      this.$bus.$emit('alarmReport', this.params);
      this.$bus.$emit('temperatureReport', this.params);
      this.$bus.$emit('alarmStatistic', this.params);
    },
    changeEdate(){
      if(!this.$utils.isNull(this.params.endDate)){
        this.params.endDate = this.$moment(this.params.endDate).format('YYYY-MM-DD');
      }
      this.$bus.$emit('alarmReport', this.params);
      this.$bus.$emit('temperatureReport', this.params);
      this.$bus.$emit('alarmStatistic', this.params);
    }
  },
  props: {
    flag: {
      type: Number
    },
  },
}
</script>

<style lang="scss">

</style>
