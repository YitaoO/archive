<template>
  <div>
    <el-dialog class="baseAlarmSetForm" title="告警设置" :visible.sync="dialog.show" @open="getDictionary" 
      :before-close='callOf' :close-on-click-modal="false">
      <el-form :model="temp" :rules="rules" ref="baseAlarmSetForm" label-position="right" label-width="86px">
        <el-form-item label="告警等级" prop="typeName">
          <el-radio-group v-model="temp.typeName" @change="changeType" :disabled="isReadonly">
            <el-radio v-for="item in levelList" :label="item.typeName" :key="item.typeId"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="通知角色" prop="types">
          <el-select v-model="temp.types" class="elselection" @change="selectPerson" multiple :disabled="isReadonly">
            <el-option v-for="item in roleList" :key="item.roleId" :label="item.name" :value="item.roleId" :disabled="item.type===0">
              <span class="selectOption" :style="'display: block;color:#333333;padding-bottom:3px;margin-left:'+(item.depth*20)+'px;'">
                <i class="icon-left icon icon-setting-group" v-if="item.type===0"></i>
                <i class="icon-left icon icon-setting-person" v-else></i>
                {{ item.name }}
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="提醒频率">{{ interval }}</el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="save" type="primary" v-if="!isReadonly">保存</el-button>
        <el-button @click="callOf">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import baseDeviceSetmixins from '@/views/Setting/baseDeviceSetmixins'
export default {
  mixins: [baseDeviceSetmixins],
  data() {
    return {
      rules: {
        types: [{ type: 'array', required: true, message: '请选择通知角色', trigger: 'change' }],
        typeName: [{ required: true, message: '请选择告警等级', trigger: 'change'}]
      },
      interval: ''
    };
  },
  methods: {
    getDictionary(){
      this.getRoleList();
      this.getLevelList();
      if(!this.$utils.isNull(this.temp.interval)){
        if(this.temp.interval === 0) this.interval = '一次';
        else this.interval = '每隔'+ this.temp.interval +'分钟';
      }
    },
    changeType(label){
      const obj = this.levelList.find(item => item.typeName === label)
      this.temp.warnLevel = null;
      if(obj) {
        this.temp.warnLevel = obj.typeId;
        if(obj.interval === 0) this.interval = '一次';
        else this.interval = '每隔'+ obj.interval +'分钟';
      }
    },
    selectPerson(selects){
      if(selects.length>0){
        let name = '', id = '';
        for(var i=0; i<selects.length; i++){
          const obj = this.roleList.find(item => item.roleId === selects[i])
          name += obj.name + ','
        }
        for(var i=0; i<selects.length; i++){
          id += selects[i] + ','
        }
        this.temp.name = name.substring(0, name.length-1)
        this.temp.roleIds = id.substring(0, id.length-1)
      }else{
        this.temp.roleIds = ''
        this.temp.name = ''
      }
    },
    save() {
       this.$refs.baseAlarmSetForm.validate((valid) => {
        if (valid) {
          // const loading = this.$utils.formLoading(document.getElementsByClassName('.deptForm')[0],this);
          var temp2 = Object.assign({}, this.temp)
          let url = 'warnSet/add';
          if (!this.isAdd) url = 'warnSet/update';
          this.$customAxios.post(url, temp2).then(resq => {
            this.callOf();
            this.$parent.getList();
          }).catch(error => {
          });
        }
      });
    },
    callOf() {
      this.dialog.show=false;
      this.$refs.baseAlarmSetForm.resetFields();
      this.interval = '';
    },
  },
  props: {
    dialog: {
      type: Object
    },
    temp: {
      type: Object
    },
    isAdd: {
      type: Boolean
    },
    isReadonly: {
      type: Boolean,
      default: false
    }
  },
};
</script>
<style lang="scss">
</style>