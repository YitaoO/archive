<template>
<el-dialog id="transfer-dialog" title="请选择要加入的设备" :visible.sync="dialog.show" width="70%" :before-close="handleClose">
  <el-container class="border">
    <el-aside width="200px">
      <Tree :type="3"></Tree>
    </el-aside>
    <el-main>
      <el-transfer v-model="deviceListObj.choiceDevice" :titles="[ '可选设备', '选中设备']" :data="deviceListObj.deviceList"></el-transfer>
    </el-main>
  </el-container>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialog.show = false">取 消</el-button>
    <el-button type="primary" @click="bindSubmit()">确 定</el-button>
  </span>

</el-dialog>
</template>

<script>
// 组件 - 树
import Tree from "../Common/tree.vue";
export default {
  components: {
    Tree
  },
  props: {
    dialog: {
      type: Object
    }
  },
  data() {
    return {
      deviceListObj: {
        deviceList: [],
        choiceDevice: []
      },
      saveAllDevice: [],
      newDeviceList: [] //提交的设备列表
    };
  },
  created() {
    let that = this;
    this.$bus.$off("getFirstArea");
    // 监听树组件
    this.$bus.$on("getFirstArea", (areaObj, areaName) => {
      that.getDeviceMap(areaObj);
    });
  },
  methods: {
    // 获取当前区域下设备
    getDeviceMap(areaObj) {
      let that = this;

      that.$customAxios
        .get("device/selectByMap", {
          params: {
            userId: this.$cookies.getJSON("userInfo").UserID,
            areaId: areaObj.areaId
          }
        })
        .then(resq => {
          that.deviceListObj.deviceList = [];
          resq.data.forEach(function(item, key) {
            // 使用的数组
            that.deviceListObj.deviceList.push({
              key: item.devId,
              label: item.devName
            });
            //暂时缓存的数组
            that.saveAllDevice.push(item);
          });
          //去重
          that.saveAllDevice = that.$utils.arrDistinct(
            that.saveAllDevice,
            "devId"
          );
        })
        .catch(error => {});
    },
    bindSubmit() {
      let that = this;
      let choiceList = that.deviceListObj.choiceDevice;
      if (choiceList.length == 0) {
        that.$ele.Notification({
          title: "消息",
          message: "请选择设备!",
          type: "info"
        });
        return;
      } else {
        that.newDeviceList = [];

        choiceList.forEach(function(devId) {
          that.saveAllDevice.forEach(function(oldItem) {
            if (oldItem.devId == devId) {
              that.newDeviceList.push(oldItem);
            }
          });
        });
        that.$bus.$emit("getDeviceList", that.newDeviceList);
        that.dialog.show = false;
        // that.clearTransfer()
      }
    },
    clearTransfer() {
      let that = this;
      that.deviceListObj = {
        deviceList: [],
        choiceDevice: []
      };
      that.saveAllDevic = [];
      that.newDeviceList = [];
      that.dialog.show = false;
    },

    // 关闭弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
<style lang="scss">
#transfer-dialog {
  // width: 50%;
}
#editInsp-wrap {
  .tree-search {
    display: none !important;
  }
}
</style>
