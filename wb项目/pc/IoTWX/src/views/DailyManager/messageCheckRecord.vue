<!-- 路由-巡检记录 -->
<template>
<el-form v-loading="wrapLoading" disabled class="primary-color-bg-white font-size-14 primary-color-02" label-width="100px" style="height:auto;">
  <el-row class="wordO-wrap over-height border ">
    <el-col class="wordO-add over-height">
      <p class="title boder-bottom padding">巡检记录</p>
      <div class="item-wrap">

        <div class="workO-item">
          <div class="grid-list">
            <div class="grid-list-item" style="width:300px;">
              <el-form-item class="item-left" label="设备名称">
                <el-input class="input" v-model="checkRecord.devTypeName"></el-input>
              </el-form-item>
            </div>
            <div class="grid-list-item" style="width:400px;" v-if="checkRecord.location !=null">
              <el-form-item class="" label="所在位置">
                <el-input class="input" v-model="checkRecord.location"></el-input>
              </el-form-item>
            </div>
            <div class="grid-list-item"></div>
          </div>
          <div class="grid-list">
            <div class="grid-list-item" style="width:300px;" v-if="checkRecord.title !=null">
              <el-form-item class="item-left" label="对应巡检计划">
                <el-input class="input" v-model="checkRecord.title"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="grid-list-item" style="width:300px;" v-if="checkRecord.addUserName !=null">
            <el-form-item class="" label="巡检人">
              <el-input class="input" v-model="checkRecord.addUserName"></el-input>
            </el-form-item>
          </div>
          <div class="grid-list-item"></div>

        </div>
        <div class="workO-item">
          <div class="grid-list">
            <div class="grid-list-item" style="width:300px;" v-if="checkRecord.typeName !=null">
              <el-form-item class="item-left" label="工单类型">
                <el-input class="input" v-model="checkRecord.typeName"></el-input>
              </el-form-item>
            </div>
            <div class="grid-list-item" style="width:300px;" v-if="checkRecord.userName !=null">
              <el-form-item class="" label="指派给">
                <el-input class="input" v-model="checkRecord.userName"></el-input>
              </el-form-item>
            </div>
            <div class="grid-list-item"></div>
          </div>
          <div class="grid-list">
            <el-form-item label="描述" class="item-desp" prop="description">
              <el-input type="textarea" v-model="checkRecord.description" style="width:400px;" rows="5" placeholder="请输入描述内容..."></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="workO-item">
          <el-form-item label="上传图片" class="item-upload">
            <el-upload :action="uploadImageUrl" :data="{}" :file-list="imageList" list-type="picture-card">
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </div>

      </div>
    </el-col>
  </el-row>

</el-form>
</template>

<script>
export default {
  name: "MessageCheckRecord",
  components: {

  },
  data() {
    return {
      kid: '',
      wrapLoading: true,
      dialogshow: {
        show: false
      },
      baseUrl: '',
      uploadImageUrl: '',
      checkRecord: {},
      imageList: []
    }
  },
  created() {
    let that = this
    that.kid = that.$route.params.kid
    that.optionUrl()
    that.getCheckRecordById()

  },
  methods: {
    // 配置URL
    optionUrl() {
      let that = this
      if (process.env.NODE_ENV !== 'development') { // 这里开发环境因为要跨域，所以开发环境不用这个配置,后期看下可以优化吗
        let url = window.location.href
        let index = (url.indexOf('login') > 0) ? url.indexOf('login') : url.indexOf('index')
        that.baseUrl = `${url.slice(0, index)}equipment/`
      } else {
        that.baseUrl = 'http://192.168.1.15:9023//portal-equipment/equipment/'
      }
    },
    /**
     * 获取巡检详情
     */
    getCheckRecordById() {
      let that = this
      this.$customAxios.get('checkRecord/getById', {
        params: {
          kid: that.kid
        }
      }).then(resq => {
        that.checkRecord = resq

        if (that.checkRecord.imageList != null) {
          that.checkRecord.imageList.forEach(function(item) {
            that.imageList.push({
              url: `${that.baseUrl}wpFileImage/f?p=${item.svrPathMIamge}`
            })

          })

        }

        document.getElementsByClassName('el-upload--picture-card')[0].style.display = 'none'
        document.getElementsByClassName('el-upload__tip')[0].style.display = 'none'


        that.wrapLoading = false
      }).catch(error => {});
    }
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
                min-width: 200px;
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
        // border-left: 1px solid #dcdfe1;
    }

}
</style>
