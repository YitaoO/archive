<template>
<div style="height:100%">
  <el-table ref="devicetabletree" class="tabletree" :data="data" :row-style="showTr" highlight-current-row fit height="100%">
    <el-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text" :min-width="column.height">
      <template slot-scope="scope">
        <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space" :key="levelIndex"></span>
        <el-button v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)" type="text" class="treebutton">
          <i v-if="!scope.row._expanded" class="el-icon-caret-right" aria-hidden="true"></i>
          <i v-if="scope.row._expanded" class="el-icon-caret-bottom" aria-hidden="true"></i>
        </el-button>
        <span v-else-if="index===0" class="ms-tree-space"></span>
        {{scope.row[column.dataIndex]}}
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" min-width="190">
      <template slot-scope="scope">
        <el-button type="text" @click="handleUpdate(scope.row, false)" class="handleButton">查看</el-button>
        <span v-if="!!btnPromise">
          <el-button type="text" @click="handleUpdate(scope.row, true)" class="handleButton">编辑</el-button>
          <el-dropdown @command="handleCommands(scope.row, $event)">
            <el-button type="primary">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="delete">删除</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.newStatus!=='报废'" command="controlDevice">报废</el-dropdown-item>
              <el-dropdown-item v-else command="restart">启用</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.pollStatus!=='stoped'" command="pauseDevice">暂停设备读取</el-dropdown-item>
              <el-dropdown-item v-else command="startDevice">恢复设备读取</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { baseDeviceSetTabletree } from "@/components/Tools/dataTranslate";
export default {
  name: "tree-grid",
  props: {
    // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
    treeStructure: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    // 这是相应的字段展示
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 这是数据源
    dataSource: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 是否默认展开所有树
    defaultExpandAll: {
      type: Boolean,
      default: function() {
        return true;
      }
    },
    btnPromise: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 格式化数据源
    data: function() {
      if (this.treeStructure) {
        let data = baseDeviceSetTabletree(
          this.dataSource,
          null,
          null,
          this.defaultExpandAll
        );
        return data;
      }
      return this.dataSource;
    }
  },
  data() {
    return {
      searchList: [],
      searchNum: 0,
      searchDevName: "", // 手输
      searchDevId: "", // 手输
      searchDevCode: "", // 手输
      searchStatus: "", // 选择
      searchDevType: "", // 选择
      searchAreaName: "" // 手输
    };
  },
  created() {
    this.$bus.$on("searchDevice", searchCondition => {
      // 监听搜索按钮

      var isNullDevName = this.$utils.isNull(searchCondition.devName);
      var isNullDevId = this.$utils.isNull(searchCondition.devId);
      var isNullDevCode = this.$utils.isNull(searchCondition.devCode);
      var isNullStatus = this.$utils.isNull(searchCondition.status);
      var isNullDevType = this.$utils.isNull(searchCondition.devType);
      var isNullAreaName = this.$utils.isNull(searchCondition.areaName);
      if (
        !isNullDevName ||
        !isNullDevId ||
        !isNullDevCode ||
        !isNullStatus ||
        !isNullDevType ||
        !isNullAreaName
      ) {
        // 搜索框有值
        // 如果前后的值不一样，所有的搜索状态重置，并重新查询搜索中的值
        if (
          searchCondition.devName !== this.searchDevName ||
          searchCondition.devId !== this.searchDevId ||
          searchCondition.devCode !== this.searchDevCode ||
          searchCondition.status !== this.searchStatus ||
          searchCondition.devType !== this.searchDevType ||
          searchCondition.areaName !== this.searchAreaName
        ) {
          this.searchDevName = searchCondition.devName;
          this.searchDevId = searchCondition.devId;
          this.searchDevCode = searchCondition.devCode;
          this.searchStatus = searchCondition.status;
          this.searchDevType = searchCondition.devType;
          this.searchAreaName = searchCondition.areaName;
          this.searchList = [];
          this.searchNum = 0;
          this.recursionSearch(this.dataSource);
        }
        var searchLength = this.searchList.length;
        if (searchLength > 0) {
          this.$nextTick(() => {
            this.$refs.devicetabletree.setCurrentRow(
              this.searchList[this.searchNum]
            );
            this.searchNum++; // 必须写在nextTick里，不然setCurrentRow还没执行，searchNum就++了
            if (this.searchNum >= searchLength) {
              this.searchNum = 0; // 点击搜索的次数比list多时，自动重置为0
            }
          });
        } else {
          // 查询的list为空，让光标消失
          this.$nextTick(() => {
            this.$refs.devicetabletree.setCurrentRow({});
          });
        }
      } else {
        // 没有传值过来的时候，让光标消失
        this.$nextTick(() => {
          this.$refs.devicetabletree.setCurrentRow({});
          this.searchDevName = "";
          this.searchDevId = "";
          this.searchDevCode = "";
          this.searchStatus = "";
          this.searchDevType = "";
          this.searchAreaName = "";
          this.searchList = [];
          this.searchNum = 0;
        });
      }
    });
  },
  methods: {
    handleCommands(row, command) {
      if (command === "delete") {
        this.handleDelete(row);
      } else if (command === "controlDevice") { // 报废
        this.handleControlDevice(row.devId);
      } else if (command === "restart") { // 启用
        this.handleRestart(row);
      } else if (command === "pauseDevice") { // 暂停
        this.handlePause(row);
      } else if (command === "startDevice") { // 恢复
        this.handleStart(row);
      }
    },
    handleDelete(row) {
      this.$confirm("确定删除该记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$customAxios
            .post("device/delete", {
              devId: row.devId,
              isDel: 1,
              delUserId: this.$cookies.getJSON("userInfo").UserID,
              delUserName: this.$cookies.getJSON("userInfo").name
            })
            .then(result => {
              if (result === 1) {
                this.$bus.$emit("saveDevice");
              }
            })
            .catch(error => {});
        })
        .catch(() => {});
    },
    handleControlDevice(devId) {//报废
      this.$customAxios.post("device/updateDevice", {
        devId: devId,
        status: 6
      }).then(resq => {
        this.$ele.Notification.success({
          title: "成功",
          message: `设置成功！`
        });
        this.$bus.$emit("saveDevice");
      });
    },
    handleRestart(item) {//启用
      this.$customAxios.get("device/updateAndSendMessage", {
        params: {
          devId: item.devId,
          addr: item.addr,
          gateWay: item.gateWayPush,
          devStatus: 3,
          devModel: item.devModel,
          mqttid: item.mqttid
        }
      }).then(resq => {
        this.$ele.Notification.success({
          title: "成功",
          message: `设备已离线，1分钟后若还没启用，请重试。`
        });
        this.$bus.$emit("saveDevice");
      });
    },
    handlePause(item) {
      this.$customAxios.get(`deviceSettingTing/stopDevice?devid=${item.devId}`)
      .then(resq => {
        this.$ele.Notification.success({
          title: "成功",
          message: `设备[${item.devName}]已暂停`
        });
        this.$bus.$emit("saveDevice");
      });
    },
    handleStart(item) {
      this.$customAxios.get(`deviceSettingTing/resumeJob?devid=${item.devId}`)
      .then(resq => {
        this.$ele.Notification.success({
          title: "成功",
          message: `设备[${item.devName}]已恢复读取`
        });
        this.$bus.$emit("saveDevice");
      });
    },
    // 搜索的时候，递归出被搜索出来的node数据
    recursionSearch(dataSource) {
      if (dataSource.length > 0) {
        for (var i = 0; i < dataSource.length; i++) {
          if (
            !this.$utils.isNull(this.searchDevName) &&
            !this.$utils.isNull(dataSource[i].devName) &&
            dataSource[i].devName.indexOf(this.searchDevName.trim()) !== -1
          ) {
            this.searchList.push(dataSource[i]);
          } else if (
            !this.$utils.isNull(this.searchDevId) &&
            !this.$utils.isNull(dataSource[i].devId) &&
            dataSource[i].devId.indexOf(this.searchDevId.trim()) !== -1
          ) {
            this.searchList.push(dataSource[i]);
          } else if (
            !this.$utils.isNull(this.searchDevCode) &&
            !this.$utils.isNull(dataSource[i].devCode) &&
            dataSource[i].devCode.indexOf(this.searchDevCode.trim()) !== -1
          ) {
            this.searchList.push(dataSource[i]);
          } else if (
            !this.$utils.isNull(this.searchStatus) &&
            !this.$utils.isNull(dataSource[i].newStatus) &&
            dataSource[i].newStatus.indexOf(this.searchStatus.trim()) !== -1
          ) {
            this.searchList.push(dataSource[i]);
          } else if (
            !this.$utils.isNull(this.searchDevType) &&
            !this.$utils.isNull(dataSource[i].devTypeName) &&
            dataSource[i].devTypeName.indexOf(this.searchDevType.trim()) !== -1
          ) {
            this.searchList.push(dataSource[i]);
          } else if (
            !this.$utils.isNull(this.searchAreaName) &&
            !this.$utils.isNull(dataSource[i].areaName) &&
            dataSource[i].areaName.indexOf(this.searchAreaName.trim()) !== -1
          ) {
            this.searchList.push(dataSource[i]);
          }
          if (dataSource[i].devices && dataSource[i].devices.length > 0) {
            var data2 = dataSource[i].devices;
            this.recursionSearch(data2);
          }
        }
      }
    },
    handleUpdate(row, isUpdate) {
      this.$router.push({
        name: "BaseDeviceSetForm",
        query: {
          isAdd: false,
          isReadonly: isUpdate ? false : true,
          devId: row.devId
        }
      });
    },
    // 显示行
    showTr(obj) {
      var row = obj.row; // 这个方法已经跟之前的不一样，obj包括row和index，分开写row和index，读不到的！！！！！！！
      let show = row._parent
        ? row._parent._expanded && row._parent._show
        : true;
      row._show = show;
      return show ? "" : "display:none;";
    },
    // 展开下级
    toggle(trIndex) {
      let record = this.data[trIndex];
      record._expanded = !record._expanded;
    },
    // 显示层级关系的空格和图标
    spaceIconShow(index) {
      if (this.treeStructure && index === 0) {
        return true;
      }
      return false;
    },
    // 点击展开和关闭的时候，图标的切换
    toggleIconShow(index, record) {
      if (
        this.treeStructure &&
        index === 0 &&
        record.devices &&
        record.devices.length > 0
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
