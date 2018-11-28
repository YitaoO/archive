<!-- 路由-新增维修 -->
<template>
<el-form v-loading="wrapLoading" :disabled="type ==2?true:false" class="primary-color-bg-white font-size-14 primary-color-02" ref="messageRepairEditForm" :model="temp" :rules="rules" label-width="100px" style="height:auto;">
  <el-row class="wordO-wrap over-height border ">
    <el-col :span="24" class="wordO-add over-height">
      <p class="title boder-bottom padding">维修信息</p>
      <div class="item-wrap">
        <div class="workO-item">
          <div class="grid-list">
            <div class="grid-list-item" style="width:300px;">
              <el-form-item class="item-left" label="标题" prop="title">
                <el-input class="input" v-model="temp.title"></el-input>
              </el-form-item>
            </div>
            <div class="grid-list-item">
              <el-form-item label="选择工单" prop="woKid">
                <el-select v-model="temp.woKid" class="elselection input" filterable clearable @change="handleWoId">
                  <el-option v-for="item in workOrderList" :key="item.kid" :label="item.title" :value="item.kid">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="workO-item">
          <div class="grid-list">
            <div class="grid-list-item" style="width:300px;">
              <el-form-item label="所属区域">
                <el-input class="input" v-model="areaName" readonly></el-input>
              </el-form-item>
            </div>
            <div class="grid-list-item" style="width:300px;">
              <el-form-item label="设备名称" prop="devId">
                <el-input class="input" v-model="devName" readonly></el-input>
              </el-form-item>
            </div>
            <!-- <div class="grid-list-item" style="width:300px;">
              <el-form-item label="所在位置" class="">
                <el-input v-model="location" readonly/></el-form-item>
            </div> -->
            <div class="grid-list-item"></div>
          </div>
          <div class="grid-list">
            <div class="grid-list-item" style="width:300px;">
              <el-form-item label="费用(元)" prop="cost">
                <el-input class="input" type="number" v-model="temp.cost"></el-input>
              </el-form-item>
            </div>
            <div class="grid-list-item">
              <el-form-item label="维修日期" prop="bdate">
                <el-date-picker v-model="temp.times" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleData">
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="维修情况" class="item-desp" prop="description">
            <el-input type="textarea" v-model="temp.description" style="width:400px;" rows="5" placeholder="请输入内容..."></el-input>
          </el-form-item>
        </div>
        <div class="workO-item">
          <el-form-item :label="(type != 2)?'上传图片':''" class="item-upload" :class="(type ==2)?'over-picture':''">
            <el-upload :action="uploadImageUrl" :data="{recordId:kid}" :file-list="imageList" :on-preview="handlePictureCardPreview" list-type="picture-card">
              <i class="el-icon-plus" v-if="type != 2"></i>
              <div slot="tip" class="el-upload__tip" v-if="type != 2">图片大小不超过5M</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </div>
        <div class="item save-wrap" v-if="type != 2">
          <el-button type="primary" plain @click="handleAdd(0)">保存</el-button>

          <el-button plain @click="handleBack()">取消</el-button>
        </div>

      </div>
    </el-col>
    <el-dialog :visible.sync="openPhoneShow">
      <img width="100%" :src="openPhoneUrl" alt="">
    </el-dialog>
  </el-row>

</el-form>
</template>

<script>
export default {
  name: "MessageInsEdit",
  components: {

  },
  data() {
    var validateCost = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入费用'))
      }
      if (Number(value) < 0) {
        return callback(new Error('请输入大于零的费用'))
      }
      callback()
    };
    return {
      kid: '',
      name: '',
      areaName: '',
      devName: '',
      location: '',
      areaList: [],
      deviceList: [],
      workOrderList: [],
      wrapLoading: true,
      rules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'change'
        }],
        woKid: [{
          required: true,
          message: '请选择工单',
          trigger: 'change'
        }],
        cost: [{
          validator: validateCost,
          trigger: 'blur'
        }],
        times: [{
          required: true,
          message: '请选择维修日期',
          trigger: 'change'
        }],
        description: [{
          required: true,
          message: '请输入维修信息',
          trigger: 'change'
        }]
      },
      temp: {}, //提交参数
      dialogshow: {
        show: false
      },
      kid: '',
      isNew: false, //是否新增
      imageList: [],
      uploadImageUrl: '',
      openPhoneShow: false,
      openPhoneUrl: '',
      baseUrl: ''
    }
  },
  created() {
    let that = this

    that.type = that.$route.params.type
    if (that.type == 0) { //发布
      that.isNew = true
      that.kid = that.$utils.getNum()
      that.temp = {
        addUserName: that.$cookies.getJSON('userInfo').name,
        addUserId: that.$cookies.getJSON('userInfo').UserID,
        kid: that.kid,
        status: 0,
      }
      that.getworkOrderList()
    } else { //修改或者查看
      that.kid = that.$route.params.kid
      that.getworkOrderList()
      that.getRepairOrderByKid()
    }
    that.optionUrl()


  },
  methods: {
    // 配置URL
    optionUrl() {
      let that = this
      if (process.env.NODE_ENV !== 'development') { // 这里开发环境因为要跨域，所以开发环境不用这个配置,后期看下可以优化吗
        let url = window.location.href
        let index = (url.indexOf('login') > 0) ? url.indexOf('login') : url.indexOf('index')
        that.baseUrl = `${url.slice(0, index)}equipment/`
        that.uploadImageUrl = `${that.baseUrl}wpFileImage/upload`
      } else {
        that.uploadImageUrl = 'wpFileImage/upload'
        that.baseUrl = 'http://192.168.1.15:9023//portal-equipment/equipment/'
      }
    },
    /**
     * 工单列表
     */
    getworkOrderList() {
      this.$customAxios.get('workOrder/selectByMap', {
        params: {
          userId: this.$cookies.getJSON('userInfo').UserID,
          woId: 0
        }
      }).then(resq => {
        this.workOrderList = resq.data;
        this.wrapLoading = false
      }).catch(error => {});
    },

    /**
     * 获取工单信息
     */
    getRepairOrderByKid() {
      let that = this
      that.$customAxios.get('repairOrder/getById', {
        params: {
          kid: that.kid
        }
      }).then(resq => {
        that.temp = {
          kid: resq.kid,
          title: resq.title,
          devId: resq.devId,
          userId: resq.userId,
          status: resq.status,
          cost: resq.cost,
          description: resq.description,
          woKid: resq.woKid,
          times: [resq.bdate, resq.edate]
        }

        if (!that.$utils.isNull(resq.imageList)) {
          resq.imageList.forEach(function(item) {
            that.imageList.push({
              url: `${that.baseUrl}wpFileImage/f?p=${item.svrPathMIamge}`
            })
          })
        }

        that.renderWorkOrder(that.temp.woKid)

        that.wrapLoading = false

      }).catch(error => {});
    },
    renderWorkOrder(kid) { //处理选中工单数据
      let that = this
      that.workOrderList.forEach(function(item) {
        if (item.kid == kid) {
          console.log(item);
          that.areaName = item.areaName
          that.devName = item.devName
          that.location = item.location
        }
      })
    },
    handleData(data) { //时间改变
      if (data != null) {
        this.temp.bdate = data[0]
        this.temp.edate = data[1]
      }
    },
    handleWoId(kid) { //工单信息修改
      if (kid != null) {
        this.renderWorkOrder(kid)
      }
    },
    handlePictureCardPreview(file) {
      this.openPhoneUrl = file.url;
      this.openPhoneShow = true;
    },
    /**
     * [handleAdd 添加修改计划]
     * @param  {[type]} hashPublish [0:不发布;1发布]
     * @param  {[type]} type        [0:保存;1结案]
     * @return {[type]}             [description]
     */
    handleAdd(type) {
      let that = this
      let url = (!!that.isNew) ? 'repairOrder/add' : 'repairOrder/update'
      let params = that.temp

      this.$refs.messageRepairEditForm.validate((valid) => {
        if (valid) {
          that.wrapLoading = true
          this.$customAxios.post(url, params).then(resq => {
            that.wrapLoading = false
            that.$ele.Notification({
              title: "成功",
              message: `发布成功！`,
              type: 'success'
            })
            that.$router.go(-1)
          }).catch(error => {
            that.wrapLoading = false
          });
        }
      });

    },
    handleBack() { //返回
      this.$router.go(-1)
    },
  }
}
</script>

<style lang="scss"scoped>
.wordO-wrap {
    .item-wrap {

        padding: 0 10px;

        .workO-item {
            padding-top: 25px;
            border-bottom: 1px dashed #dcdfe1;

            .input {
                width: 200px;
            }
            .item-line {
                padding-bottom: 10px;
                .line-item {
                    width: 150px;
                }
            }
            // padding
        }
        .item-desp {
            textarea {}
        }
    }
    .save-wrap {
        padding: 20px;
    }
    .wordO-save {
        border-left: 1px solid #dcdfe1;
    }

}
.el-radio + .el-radio {
    margin-left: 20px !important;
}
</style>
