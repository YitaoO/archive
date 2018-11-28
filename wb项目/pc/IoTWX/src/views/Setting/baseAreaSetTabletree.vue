<template>
<div style="height:100%">
  <el-table ref="tabletree" class="tabletree" :data="data" :row-style="showTr" highlight-current-row fit height="100%">
    <el-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text" min-width="200">
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
    <el-table-column label="操作" align="center" min-width="150">
      <template slot-scope="scope">
        <el-button type="text" @click="handleUpdate(scope.row, false)" class="handleButton">查看</el-button>
        <span v-if="!!btnPromise">
          <el-button type="text" @click="handleUpdate(scope.row, true)" class="handleButton">编辑</el-button>
          <el-dropdown @command="handleCommands(scope.row, $event)">
            <el-button type="primary">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="delete">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {baseAreaSetTabletree} from '@/components/Tools/dataTranslate';
export default {
  name: 'tree-grid',
  props: {
    // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
    treeStructure: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    // 这是相应的字段展示
    columns: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 这是数据源
    dataSource: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 是否默认展开所有树
    defaultExpandAll: {
      type: Boolean,
      default: function() {
        return true
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
        let data = baseAreaSetTabletree(this.dataSource, null, null, this.defaultExpandAll)
        return data
      }
      return this.dataSource
    }
  },
  data() {
    return {
      searchList: [],
      searchNum: 0,
      searchAreaname: '',
      searchUserNames: '',
      searchLocation: '',
    }
  },
  created() {
    this.$bus.$on('searchArea', searchCondition => { // 监听搜索按钮
      var areaName = searchCondition.areaName;
      var userNames = searchCondition.userNames;
      var location = searchCondition.location;
      if (!this.$utils.isNull(areaName) || !this.$utils.isNull(userNames) || !this.$utils.isNull(location)) { // 搜索框有值
        // 如果前后的值不一样，所有的搜索状态重置，并重新查询搜索中的值
        if (areaName !== this.searchAreaname || userNames !== this.searchUserNames || location !== this.searchLocation) {
          this.searchAreaname = this.$utils.isNull(areaName) ? '' : areaName.trim();
          this.searchUserNames = this.$utils.isNull(userNames) ? '' : userNames.trim();
          this.searchLocation = this.$utils.isNull(location) ? '' : location.trim();
          this.searchList = [];
          this.searchNum = 0;
          this.recursionSearch(this.dataSource);
        }
        var searchLength = this.searchList.length;
        if (searchLength > 0) {
          this.$nextTick(() => {
            this.$refs.tabletree.setCurrentRow(this.searchList[this.searchNum])
            this.searchNum++; // 必须写在nextTick里，不然setCurrentRow还没执行，searchNum就++了
            if (this.searchNum >= searchLength) {
              this.searchNum = 0; // 点击搜索的次数比list多时，自动重置为0
            }
          })
        } else { // 查询的list为空，让光标消失
          this.$nextTick(() => {
            this.$refs.tabletree.setCurrentRow({});
          })
        }
      } else { // 没有传值过来的时候，让光标消失
        this.$nextTick(() => {
          this.$refs.tabletree.setCurrentRow({});
          this.searchAreaname = '';
          this.searchUserNames = '';
          this.searchLocation = '';
          this.searchList = [];
          this.searchNum = 0;
        })
      }
    });
  },
  methods: {
    handleCommands(row, command){
      if(command === "delete"){
        this.$confirm('确定删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$customAxios.post('area/delete', {
            areaId: row.areaId
          }).then(result => {
            if (result === 1) {
              this.$bus.$emit('saveArea');
            }
          }).catch(error => {});
        }).catch(() => {});
      }
    },
    // 搜索的时候，递归出被搜索出来的node数据
    recursionSearch(data1) {
      if (data1.length > 0) {
        for (var i = 0; i < data1.length; i++) {
          if (this.$utils.isNull(this.searchAreaname)) {
            if (this.$utils.isNull(this.searchUserNames)) {
              if (this.$utils.isNull(this.searchLocation)) {
                this.$refs.tabletree.setCurrentRow({});
              } else {
                if (!this.$utils.isNull(this.searchLocation) && !this.$utils.isNull(data1[i].location) && data1[i].location.indexOf(this.searchLocation) !== -1) {
                  this.searchList.push(data1[i]);
                }
              }
            } else {
              if (this.$utils.isNull(this.searchLocation)) {
                if (!this.$utils.isNull(this.searchUserNames) && !this.$utils.isNull(data1[i].userNames) && data1[i].userNames.indexOf(this.searchUserNames) !== -1) {
                  this.searchList.push(data1[i]);
                }
              } else {
                if (
                  (!this.$utils.isNull(this.searchUserNames) && !this.$utils.isNull(data1[i].userNames) && data1[i].userNames.indexOf(this.searchUserNames) !== -1) &&
                  (!this.$utils.isNull(this.searchLocation) && !this.$utils.isNull(data1[i].location) && data1[i].location.indexOf(this.searchLocation) !== -1)
                ) {
                  this.searchList.push(data1[i]);
                }
              }
            }
          } else {
            if (this.$utils.isNull(this.searchUserNames)) {
              if (this.$utils.isNull(this.searchLocation)) {
                if (!this.$utils.isNull(this.searchAreaname) && !this.$utils.isNull(data1[i].areaName) && data1[i].areaName.indexOf(this.searchAreaname) !== -1) {
                  this.searchList.push(data1[i]);
                }
              } else {
                if (
                  (!this.$utils.isNull(this.searchAreaname) && !this.$utils.isNull(data1[i].areaName) && data1[i].areaName.indexOf(this.searchAreaname) !== -1) &&
                  (!this.$utils.isNull(this.searchLocation) && !this.$utils.isNull(data1[i].location) && data1[i].location.indexOf(this.searchLocation) !== -1)
                ) {
                  this.searchList.push(data1[i]);
                }
              }
            } else {
              if (this.$utils.isNull(this.searchLocation)) {
                if (
                  (!this.$utils.isNull(this.searchAreaname) && !this.$utils.isNull(data1[i].areaName) && data1[i].areaName.indexOf(this.searchAreaname) !== -1) &&
                  (!this.$utils.isNull(this.searchUserNames) && !this.$utils.isNull(data1[i].userNames) && data1[i].userNames.indexOf(this.searchUserNames) !== -1)
                ) {
                  this.searchList.push(data1[i]);
                }
              } else {
                if (
                  (!this.$utils.isNull(this.searchAreaname) && !this.$utils.isNull(data1[i].areaName) && data1[i].areaName.indexOf(this.searchAreaname) !== -1) &&
                  (!this.$utils.isNull(this.searchUserNames) && !this.$utils.isNull(data1[i].userNames) && data1[i].userNames.indexOf(this.searchUserNames) !== -1) &&
                  (!this.$utils.isNull(this.searchLocation) && !this.$utils.isNull(data1[i].location) && data1[i].location.indexOf(this.searchLocation) !== -1)
                ) {
                  this.searchList.push(data1[i]);
                }
              }
            }
          }
          var data2 = data1[i].areaList
          this.recursionSearch(data2);
        }
      }
    },
    handleUpdate(row, isUpdate) {
      this.$router.push({
        name: 'BaseAreaSetForm',
        query: {
          isAdd: false,
          isReadonly: isUpdate?false:true,
          areaId: row.areaId
        }
      });
    },
    // 显示行
    showTr(obj) {
      var row = obj.row; // 这个方法已经跟之前的不一样，obj包括row和index，分开写row和index，读不到的！！！！！！！
      let show = row._parent ? (row._parent._expanded && row._parent._show) : true;
      row._show = show
      return show ? '' : 'display:none;'
    },
    // 展开下级
    toggle(trIndex) {
      let record = this.data[trIndex]
      record._expanded = !record._expanded
    },
    // 显示层级关系的空格和图标
    spaceIconShow(index) {
      if (this.treeStructure && index === 0) {
        return true
      }
      return false
    },
    // 点击展开和关闭的时候，图标的切换
    toggleIconShow(index, record) {
      if (this.treeStructure && index === 0 && record.areaList && record.areaList.length > 0) {
        return true
      }
      return false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
